import { useState, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  useAllBookings,
  useUpdateBookingStatus,
  useBlockedSlots,
  useCreateBlockedSlot,
  useDeleteBlockedSlot,
  useBarberCreateBooking,
  type BookingWithCustomer,
} from "@/hooks/useBarber";
import { useShopSettings, useUpdateShopSettings } from "@/hooks/useShopSettings";
import { useBarberNotifications } from "@/hooks/useBarberNotifications";
import { NotificationBell } from "@/components/NotificationBell";
import { getServiceById, generateTimeSlots, services, SLOT_DURATION } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  Lock,
  Phone,
  Plus,
  Scissors,
  User,
  UserPlus,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Settings,
  Coffee,
} from "lucide-react";
import {
  format,
  parseISO,
  isBefore,
  startOfDay,
  addDays,
  startOfWeek,
  isToday,
} from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---- Status config ----

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-muted-foreground bg-muted/50 border-border",
  },
  completed: {
    label: "Completed",
    color: "text-primary bg-primary/10 border-primary/30",
  },
};

// ---- Helper: time string to minutes for sorting ----
function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getDisplayName(booking: BookingWithCustomer): string {
  return booking.guest_name || booking.customer?.full_name || "Unknown";
}

function isWalkIn(booking: BookingWithCustomer): boolean {
  return !!booking.guest_name;
}

function isPastBooking(booking: BookingWithCustomer): boolean {
  const bookingDate = parseISO(booking.date);
  const [hours, minutes] = booking.time.split(":").map(Number);
  bookingDate.setHours(hours, minutes);
  return isBefore(bookingDate, new Date());
}

// ---- Main Dashboard Component ----

const Dashboard = () => {
  const { user, profile, loading: authLoading, isBarber, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: allBookings, isLoading: bookingsLoading } = useAllBookings();
  const updateStatus = useUpdateBookingStatus();
  const { notifications, unreadCount, markAllRead, clearNotification, clearAll } =
    useBarberNotifications();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  // Shop settings
  const { data: shopSettings } = useShopSettings();
  const updateSettings = useUpdateShopSettings();
  const closedDays = shopSettings?.closed_days ?? [0];
  const isClosedDay = (date: Date) => closedDays.includes(date.getDay());

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<{
    closed_days: number[];
    open_time: string;
    close_time: string;
    sat_close_time: string;
    break_start: string;
    break_end: string;
  } | null>(null);

  const openSettingsDialog = () => {
    setSettingsForm({
      closed_days: shopSettings?.closed_days ?? [0],
      open_time: shopSettings?.open_time ?? "09:00",
      close_time: shopSettings?.close_time ?? "20:00",
      sat_close_time: shopSettings?.sat_close_time ?? "18:00",
      break_start: shopSettings?.break_start ?? "",
      break_end: shopSettings?.break_end ?? "",
    });
    setSettingsDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    if (!settingsForm) return;
    await updateSettings.mutateAsync({
      closed_days: settingsForm.closed_days,
      open_time: settingsForm.open_time,
      close_time: settingsForm.close_time,
      sat_close_time: settingsForm.sat_close_time,
      break_start: settingsForm.break_start || null,
      break_end: settingsForm.break_end || null,
    });
    setSettingsDialogOpen(false);
  };

  const toggleClosedDay = (day: number) => {
    if (!settingsForm) return;
    const days = settingsForm.closed_days.includes(day)
      ? settingsForm.closed_days.filter((d) => d !== day)
      : [...settingsForm.closed_days, day];
    setSettingsForm({ ...settingsForm, closed_days: days });
  };

  // All blocked slots — fetched once, filtered in-memory per date
  const { data: allBlockedSlots = [] } = useBlockedSlots();
  const createBlock = useCreateBlockedSlot();
  const deleteBlock = useDeleteBlockedSlot();

  // Block slot form state
  const [blockDate, setBlockDate] = useState<Date>(new Date());
  const [blockTime, setBlockTime] = useState<string | null>(null);
  const [blockReason, setBlockReason] = useState("");

  // Booking detail dialog
  const [detailBooking, setDetailBooking] = useState<BookingWithCustomer | null>(null);
  const [bookingDetailOpen, setBookingDetailOpen] = useState(false);

  // Manual booking dialog state
  const [manualBookingOpen, setManualBookingOpen] = useState(false);
  const [manualDate, setManualDate] = useState<Date>(new Date());
  const [manualService, setManualService] = useState<string | null>(null);
  const [manualTime, setManualTime] = useState<string | null>(null);
  const [manualGuestName, setManualGuestName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualNotes, setManualNotes] = useState("");
  const barberCreateBooking = useBarberCreateBooking();

  const manualFormattedDate = format(manualDate, "yyyy-MM-dd");

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isBarber) return <Navigate to="/" replace />;

  const loading = bookingsLoading;

  // ---- Derived data ----

  // Week grid: start of week (Monday-based) and all 7 days
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Booking lookup map keyed by "date|time" for O(1) cell rendering
  const bookingMap = useMemo(() => {
    const map = new Map<string, BookingWithCustomer>();
    if (!allBookings) return map;
    allBookings
      .filter((b) => b.status === "confirmed")
      .forEach((b) => map.set(`${b.date}|${b.time}`, b));
    return map;
  }, [allBookings]);

  // Blocked slots lookup map keyed by "date|time"
  const blockedMap = useMemo(() => {
    const map = new Map<string, (typeof allBlockedSlots)[0]>();
    allBlockedSlots.forEach((s) => map.set(`${s.date}|${s.time}`, s));
    return map;
  }, [allBlockedSlots]);

  // All unique time slots shown in the week grid (union of weekday + saturday ranges)
  const gridSlots = useMemo(() => {
    const refWeekday = weekDays.find((d) => !closedDays.includes(d.getDay())) ?? weekDays[0];
    const refSat = weekDays.find((d) => d.getDay() === 6 && !closedDays.includes(6));
    const opts = shopSettings
      ? {
          openTime: shopSettings.open_time,
          closeTime: shopSettings.close_time,
          satCloseTime: shopSettings.sat_close_time,
          breakStart: shopSettings.break_start,
          breakEnd: shopSettings.break_end,
        }
      : undefined;
    const wdSlots = generateTimeSlots(refWeekday, opts);
    const satSlots = refSat ? generateTimeSlots(refSat, opts) : [];
    return [...new Set([...wdSlots, ...satSlots])].sort(
      (a, b) => timeToMinutes(a) - timeToMinutes(b)
    );
  }, [weekDays, closedDays, shopSettings]);

  // Upcoming bookings (all dates, confirmed, not past)
  const upcomingAll = useMemo(() => {
    if (!allBookings) return [];
    return allBookings
      .filter((b) => b.status === "confirmed" && !isPastBooking(b))
      .sort(
        (a, b) =>
          a.date.localeCompare(b.date) || timeToMinutes(a.time) - timeToMinutes(b.time)
      );
  }, [allBookings]);

  // Stats
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayBookingsCount =
    allBookings?.filter((b) => b.date === todayStr && b.status === "confirmed").length ?? 0;
  const todayRevenue =
    allBookings
      ?.filter((b) => b.date === todayStr && b.status === "confirmed")
      .reduce((sum, b) => sum + Number(b.service_price), 0) ?? 0;
  const weekUpcoming = upcomingAll.filter((b) => {
    const d = parseISO(b.date);
    return isBefore(d, addDays(new Date(), 7));
  }).length;

  // Block dialog: available slots for blockDate
  const blockFormattedDate = format(blockDate, "yyyy-MM-dd");
  const slotsForBlockDate = generateTimeSlots(
    blockDate,
    shopSettings
      ? {
          openTime: shopSettings.open_time,
          closeTime: shopSettings.close_time,
          satCloseTime: shopSettings.sat_close_time,
          breakStart: shopSettings.break_start,
          breakEnd: shopSettings.break_end,
        }
      : undefined
  );
  const bookedTimesForBlockDate = useMemo(
    () =>
      new Set(
        allBookings
          ?.filter((b) => b.date === blockFormattedDate && b.status === "confirmed")
          .map((b) => b.time) ?? []
      ),
    [allBookings, blockFormattedDate]
  );
  const blockedTimesForBlockDate = useMemo(
    () =>
      new Set(allBlockedSlots.filter((s) => s.date === blockFormattedDate).map((s) => s.time)),
    [allBlockedSlots, blockFormattedDate]
  );
  const availableSlotsForBlock = slotsForBlockDate.filter(
    (t) =>
      !bookedTimesForBlockDate.has(t) &&
      !blockedTimesForBlockDate.has(t) &&
      !isSlotPast(blockDate, t)
  );

  const handleBlock = async () => {
    if (!blockTime) return;
    await createBlock.mutateAsync({
      date: blockFormattedDate,
      time: blockTime,
      reason: blockReason || undefined,
    });
    setBlockTime(null);
    setBlockReason("");
    setBlockDialogOpen(false);
  };

  const handleManualBooking = async () => {
    if (!manualService || !manualTime || !manualGuestName.trim() || !manualPhone.trim()) return;
    const service = getServiceById(manualService);
    if (!service) return;
    await barberCreateBooking.mutateAsync({
      guest_name: manualGuestName.trim(),
      guest_phone: manualPhone.trim(),
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      date: manualFormattedDate,
      time: manualTime,
      notes: manualNotes.trim() || undefined,
    });
    setManualGuestName("");
    setManualPhone("");
    setManualService(null);
    setManualTime(null);
    setManualNotes("");
    setManualBookingOpen(false);
  };

  const openManualBookingDialog = (date?: Date, prefillTime?: string | null) => {
    setManualDate(date ?? new Date());
    setManualService(null);
    setManualTime(prefillTime ?? null);
    setManualGuestName("");
    setManualPhone("");
    setManualNotes("");
    setManualBookingOpen(true);
  };

  // Manual booking: available slots
  const manualDateSlots = generateTimeSlots(
    manualDate,
    shopSettings
      ? {
          openTime: shopSettings.open_time,
          closeTime: shopSettings.close_time,
          satCloseTime: shopSettings.sat_close_time,
          breakStart: shopSettings.break_start,
          breakEnd: shopSettings.break_end,
        }
      : undefined
  );
  const manualDateBookedTimes = useMemo(() => {
    if (!allBookings) return new Set<string>();
    return new Set(
      allBookings
        .filter((b) => b.date === manualFormattedDate && b.status === "confirmed")
        .map((b) => b.time)
    );
  }, [allBookings, manualFormattedDate]);
  const manualDateBlockedTimes = useMemo(
    () =>
      new Set(allBlockedSlots.filter((s) => s.date === manualFormattedDate).map((s) => s.time)),
    [allBlockedSlots, manualFormattedDate]
  );
  const manualIsToday = manualFormattedDate === format(new Date(), "yyyy-MM-dd");
  const manualAvailableSlots = manualDateSlots.filter((t) => {
    if (manualDateBookedTimes.has(t) || manualDateBlockedTimes.has(t)) return false;
    if (manualIsToday) {
      const now = new Date();
      const [h, m] = t.split(":").map(Number);
      if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) return false;
    }
    return true;
  });

  // Week navigation
  const prevWeek = () => setSelectedDate((d) => addDays(d, -7));
  const nextWeek = () => setSelectedDate((d) => addDays(d, 7));

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-body text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{profile?.full_name || user.email}</span>
            <span className="ml-1 text-[10px] tracking-wider uppercase px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/30">
              Barber
            </span>
          </div>
          <NotificationBell
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAllRead={markAllRead}
            onClear={clearNotification}
            onClearAll={clearAll}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => { await signOut(); navigate("/"); }}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-6xl">
        {/* Header + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8"
        >
          <div>
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              Barber Dashboard
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl text-foreground mt-2 leading-none">
              Dashboard<span className="text-primary">.</span>
            </h1>
          </div>

          <div className="flex items-end gap-6 sm:gap-8 pb-1 sm:pb-2">
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Today's Bookings</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">{todayBookingsCount}</p>
            </div>
            <div className="w-px self-stretch bg-border/60" />
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Today's Revenue</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">${todayRevenue}</p>
            </div>
            <div className="w-px self-stretch bg-border/60" />
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">This Week</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">{weekUpcoming}</p>
            </div>
          </div>
        </motion.div>

        {/* Main layout: week grid full width */}
        <div className="mt-8 sm:mt-12">
          {/* Week grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Week navigation header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="shrink-0">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                  {format(weekStart, "MMMM yyyy")}
                  <span className="text-primary">.</span>
                </h2>
                <p className="font-body text-xs sm:text-sm text-muted-foreground">
                  {format(weekStart, "MMM d")} – {format(addDays(weekStart, 6), "MMM d, yyyy")}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-wider uppercase"
                  onClick={() => openManualBookingDialog()}
                >
                  <UserPlus className="h-3.5 w-3.5 mr-2" />
                  Add Booking
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-wider uppercase"
                  onClick={() => {
                    setBlockDate(selectedDate);
                    setBlockTime(null);
                    setBlockReason("");
                    setBlockDialogOpen(true);
                  }}
                >
                  <Lock className="h-3.5 w-3.5 mr-2" />
                  Block Time Slot
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-wider uppercase"
                  onClick={openSettingsDialog}
                >
                  <Settings className="h-3.5 w-3.5 mr-2" />
                  Shop Settings
                </Button>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={prevWeek} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                  className="text-xs font-body px-3 h-8"
                >
                  Today
                </Button>
                <Button variant="ghost" size="sm" onClick={nextWeek} className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="border border-border overflow-hidden">
                {/* Day header row */}
                <div
                  className="grid border-b border-border bg-muted/20"
                  style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}
                >
                  <div className="border-r border-border/50 py-3" />
                  {weekDays.map((day) => {
                    const todayDay = isToday(day);
                    const closed = closedDays.includes(day.getDay());
                    return (
                      <div
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "py-2 px-1 text-center border-r border-border/50 last:border-r-0 cursor-pointer hover:bg-muted/30 transition-colors select-none",
                          todayDay && "bg-primary/5",
                          closed && "opacity-40"
                        )}
                      >
                        <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">
                          {format(day, "EEE")}
                        </p>
                        <p
                          className={cn(
                            "font-heading text-xl leading-tight mt-0.5",
                            todayDay ? "text-primary" : "text-foreground"
                          )}
                        >
                          {format(day, "d")}
                        </p>
                        {closed && (
                          <p className="font-body text-[8px] text-destructive/60 uppercase tracking-wider">
                            Closed
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Scrollable time rows */}
                <div className="overflow-y-auto overflow-x-hidden" style={{ maxHeight: "540px" }}>
                  {gridSlots.map((time) => {
                    return (
                      <div
                        key={time}
                        className="grid border-b border-border/40 last:border-b-0"
                        style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}
                      >
                        {/* Time label */}
                        <div className="flex items-center justify-end pr-2 border-r border-border/50 shrink-0 select-none font-body text-[11px] text-muted-foreground">
                          {time}
                        </div>

                        {/* Day cells */}
                        {weekDays.map((day) => {
                          const dateStr = format(day, "yyyy-MM-dd");
                          const cellKey = `${dateStr}|${time}`;
                          const booking = bookingMap.get(cellKey);
                          const blocked = blockedMap.get(cellKey);
                          const closed = closedDays.includes(day.getDay());
                          const withinHours = isSlotWithinHours(day, time, shopSettings ?? null);
                          const slotPast = isSlotPast(day, time);
                          const todayDay = isToday(day);

                          return (
                            <div
                              key={dateStr}
                              className={cn(
                                "relative h-14 border-r border-border/30 last:border-r-0 group",
                                closed || !withinHours ? "bg-muted/15" : todayDay ? "bg-primary/[0.02]" : ""
                              )}
                            >
                              {booking ? (
                                <button
                                  onClick={() => {
                                    setDetailBooking(booking);
                                    setBookingDetailOpen(true);
                                  }}
                                  className={cn(
                                    "absolute inset-[2px] flex flex-col justify-center px-1.5 text-left overflow-hidden transition-opacity",
                                    isWalkIn(booking)
                                      ? "bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25"
                                      : "bg-primary/20 border border-primary/40 hover:bg-primary/30"
                                  )}
                                >
                                  <p className="font-body text-[11px] font-medium text-foreground truncate leading-tight">
                                    {getDisplayName(booking)}
                                  </p>
                                  <p className="font-body text-[9px] text-muted-foreground truncate leading-tight mt-0.5">
                                    {booking.service_name}
                                  </p>
                                </button>
                              ) : blocked ? (
                                <div className="absolute inset-[2px] flex items-center gap-1.5 px-1.5 bg-muted/40 border border-border/60 group/block overflow-hidden">
                                  <Lock className="h-2.5 w-2.5 text-muted-foreground/60 shrink-0" />
                                  <span className="font-body text-[9px] text-muted-foreground/70 truncate flex-1">
                                    {blocked.reason || "Blocked"}
                                  </span>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <button className="opacity-0 group-hover/block:opacity-100 transition-opacity shrink-0 text-muted-foreground hover:text-destructive">
                                        <XCircle className="h-3 w-3" />
                                      </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="border-border bg-card rounded-none">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="font-heading text-2xl">
                                          Unblock Slot?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                                          Make{" "}
                                          <span className="text-foreground font-medium">
                                            {format(parseISO(dateStr), "MMM d")} at {blocked.time}
                                          </span>{" "}
                                          available again?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-none font-body">
                                          Keep Blocked
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteBlock.mutate(blocked.id)}
                                          className="rounded-none font-body"
                                        >
                                          Unblock
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              ) : !closed && withinHours && !slotPast ? (
                                <button
                                  onClick={() => openManualBookingDialog(day, time)}
                                  className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary/5 transition-all"
                                  title={`Add booking — ${format(day, "EEE MMM d")} at ${time}`}
                                >
                                  <Plus className="h-3.5 w-3.5 text-primary/50" />
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming across all dates */}
            {upcomingAll.length > 0 && (
              <div className="mt-10 sm:mt-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                  <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                    All Upcoming<span className="text-primary">.</span>
                  </h2>
                  {/* Mobile-only action buttons (hidden on sm+ where they appear in the week nav bar) */}
                  <div className="flex sm:hidden flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none text-xs tracking-wider uppercase"
                      onClick={() => openManualBookingDialog()}
                    >
                      <UserPlus className="h-3.5 w-3.5 mr-2" />
                      Add Booking
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none text-xs tracking-wider uppercase"
                      onClick={() => {
                        setBlockDate(selectedDate);
                        setBlockTime(null);
                        setBlockReason("");
                        setBlockDialogOpen(true);
                      }}
                    >
                      <Lock className="h-3.5 w-3.5 mr-2" />
                      Block Time Slot
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none text-xs tracking-wider uppercase"
                      onClick={openSettingsDialog}
                    >
                      <Settings className="h-3.5 w-3.5 mr-2" />
                      Shop Settings
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {upcomingAll.slice(0, 20).map((booking, i) => {
                    const config = statusConfig[booking.status as keyof typeof statusConfig];
                    const service = getServiceById(booking.service_id);
                    return (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="border border-border p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="text-center w-12 sm:w-14 shrink-0">
                            <p className="font-heading text-xl sm:text-2xl text-foreground leading-none">
                              {format(parseISO(booking.date), "dd")}
                            </p>
                            <p className="font-body text-[10px] text-muted-foreground uppercase">
                              {format(parseISO(booking.date), "MMM")}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-body text-sm font-medium text-foreground truncate">
                                {getDisplayName(booking)}
                              </span>
                              {isWalkIn(booking) && (
                                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-body uppercase tracking-wider border text-amber-400 bg-amber-400/10 border-amber-400/30">
                                  Walk-in
                                </span>
                              )}
                              <span
                                className={cn(
                                  "inline-flex items-center px-2 py-0.5 text-[10px] font-body uppercase tracking-wider border",
                                  config.color
                                )}
                              >
                                {config.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 mt-0.5 flex-wrap">
                              <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                                <Scissors className="h-3 w-3" />
                                {booking.service_name}
                              </span>
                              <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {booking.time} · {service?.duration ?? "—"}
                              </span>
                              <span className="font-body text-xs text-muted-foreground">
                                ${booking.service_price}
                              </span>
                              {(isWalkIn(booking) ? booking.guest_phone : booking.customer?.phone) && (
                                <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {isWalkIn(booking) ? booking.guest_phone : booking.customer?.phone}
                                </span>
                              )}
                            </div>
                            {booking.notes && (
                              <p className="font-body text-xs text-muted-foreground/80 italic mt-1.5">
                                "{booking.notes}"
                              </p>
                            )}
                          </div>
                        </div>
                        {booking.status === "confirmed" && (
                          <div className="flex items-center gap-2 shrink-0 ml-12 sm:ml-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-none text-xs h-8"
                              onClick={() =>
                                updateStatus.mutate({ bookingId: booking.id, status: "completed" })
                              }
                              disabled={updateStatus.isPending}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 sm:mr-1.5" />
                              <span className="hidden sm:inline">Complete</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-none text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <XCircle className="h-3.5 w-3.5 sm:mr-1.5" />
                                  <span className="hidden sm:inline">Cancel</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="border-border bg-card rounded-none">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-heading text-2xl">
                                    Cancel Booking?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                                    Cancel{" "}
                                    <span className="text-foreground font-medium">
                                      {getDisplayName(booking)}
                                    </span>
                                    's {booking.service_name} on{" "}
                                    {format(parseISO(booking.date), "MMM d")} at {booking.time}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="rounded-none font-body">Keep It</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      updateStatus.mutate({ bookingId: booking.id, status: "cancelled" })
                                    }
                                    className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                                  >
                                    Yes, Cancel
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={bookingDetailOpen} onOpenChange={setBookingDetailOpen}>
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-md rounded-none">
          {detailBooking && (() => {
            const service = getServiceById(detailBooking.service_id);
            const config = statusConfig[detailBooking.status as keyof typeof statusConfig];
            return (
              <>
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="font-heading text-3xl text-foreground">
                    Booking<span className="text-primary">.</span>
                  </DialogTitle>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {format(parseISO(detailBooking.date), "EEEE, MMMM d, yyyy")} at {detailBooking.time}
                  </p>
                </DialogHeader>
                <div className="p-6 space-y-4">
                  {/* Customer */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-body text-sm font-medium text-foreground">
                          {getDisplayName(detailBooking)}
                        </p>
                        {isWalkIn(detailBooking) && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-body uppercase tracking-wider border text-amber-400 bg-amber-400/10 border-amber-400/30">
                            Walk-in
                          </span>
                        )}
                        <span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] font-body uppercase tracking-wider border", config.color)}>
                          {config.label}
                        </span>
                      </div>
                      {(isWalkIn(detailBooking) ? detailBooking.guest_phone : detailBooking.customer?.phone) && (
                        <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" />
                          {isWalkIn(detailBooking) ? detailBooking.guest_phone : detailBooking.customer?.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border p-3">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Service</p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5 leading-tight">{detailBooking.service_name}</p>
                    </div>
                    <div className="border border-border p-3">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Duration</p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5">{service?.duration ?? "—"}</p>
                    </div>
                    <div className="border border-border p-3">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Price</p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5">${detailBooking.service_price}</p>
                    </div>
                  </div>

                  {detailBooking.notes && (
                    <p className="font-body text-xs text-muted-foreground/80 italic border border-border/50 p-3">
                      "{detailBooking.notes}"
                    </p>
                  )}

                  {detailBooking.status === "confirmed" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-none text-xs"
                        onClick={() => {
                          updateStatus.mutate({ bookingId: detailBooking.id, status: "completed" });
                          setBookingDetailOpen(false);
                        }}
                        disabled={updateStatus.isPending}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                        Mark Complete
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex-1 rounded-none text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-border bg-card rounded-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-heading text-2xl">Cancel Booking?</AlertDialogTitle>
                            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                              Cancel{" "}
                              <span className="text-foreground font-medium">{getDisplayName(detailBooking)}</span>
                              's {detailBooking.service_name} on{" "}
                              {format(parseISO(detailBooking.date), "MMM d")} at {detailBooking.time}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-none font-body">Keep It</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                updateStatus.mutate({ bookingId: detailBooking.id, status: "cancelled" });
                                setBookingDetailOpen(false);
                              }}
                              className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                            >
                              Yes, Cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Block Slot Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-md rounded-none">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-heading text-3xl text-foreground">
              Block Slot<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Prevent bookings on a specific time slot.
            </p>
          </DialogHeader>

          <div className="p-6 space-y-4">
            {/* Date selector */}
            <div>
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Date
              </Label>
              <div className="flex items-center justify-between mt-2 border border-border p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    const prev = addDays(blockDate, -1);
                    if (!isBefore(startOfDay(prev), startOfDay(new Date())) && !closedDays.includes(prev.getDay())) {
                      setBlockDate(prev);
                      setBlockTime(null);
                    }
                  }}
                  disabled={isBefore(startOfDay(addDays(blockDate, -1)), startOfDay(new Date()))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-body text-sm font-medium text-foreground">
                  {format(blockDate, "EEE, MMM d yyyy")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    let next = addDays(blockDate, 1);
                    while (closedDays.includes(next.getDay())) next = addDays(next, 1);
                    setBlockDate(next);
                    setBlockTime(null);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isClosedDay(blockDate) ? (
              <p className="font-body text-sm text-muted-foreground text-center py-4">
                Shop is closed on {format(blockDate, "EEEE")}s.
              </p>
            ) : availableSlotsForBlock.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground text-center py-4">
                No available slots to block on this date.
              </p>
            ) : (
              <>
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Select Time
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2 max-h-[200px] overflow-y-auto">
                    {availableSlotsForBlock.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBlockTime(time)}
                        className={cn(
                          "py-2 px-3 border font-body text-sm transition-all text-center",
                          blockTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary/50"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Reason (optional)
                  </Label>
                  <Input
                    placeholder="e.g. Lunch break, Personal errand..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="bg-muted border-border rounded-none h-10 font-body"
                    maxLength={100}
                  />
                </div>

                {blockTime && (
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full rounded-none"
                    onClick={handleBlock}
                    disabled={createBlock.isPending}
                  >
                    {createBlock.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Block {blockTime}
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Shop Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-lg rounded-none max-h-[90dvh]">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-heading text-3xl text-foreground">
              Shop Settings<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Configure your shop hours, closing days, and breaks.
            </p>
          </DialogHeader>

          {settingsForm && (
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Closed Days */}
              <div>
                <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  Closed Days
                </Label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                    <button
                      key={day}
                      onClick={() => toggleClosedDay(i)}
                      className={cn(
                        "py-2 px-2 border font-body text-xs transition-all text-center",
                        settingsForm.closed_days.includes(i)
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border text-foreground hover:border-primary/50"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              <div>
                <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  Opening Hours
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">Open</span>
                    <Input
                      type="time"
                      value={settingsForm.open_time}
                      onChange={(e) => setSettingsForm({ ...settingsForm, open_time: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">Close (weekdays)</span>
                    <Input
                      type="time"
                      value={settingsForm.close_time}
                      onChange={(e) => setSettingsForm({ ...settingsForm, close_time: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="font-body text-xs text-muted-foreground">Close (Saturday)</span>
                  <Input
                    type="time"
                    value={settingsForm.sat_close_time}
                    onChange={(e) => setSettingsForm({ ...settingsForm, sat_close_time: e.target.value })}
                    className="bg-muted border-border rounded-none h-10 font-body max-w-[200px]"
                  />
                </div>
              </div>

              {/* Break Time */}
              <div>
                <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                  <Coffee className="h-3.5 w-3.5" />
                  Daily Break (optional)
                </Label>
                <p className="font-body text-xs text-muted-foreground mt-1 mb-2">
                  Automatically blocks these time slots every day (e.g. lunch).
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">Break start</span>
                    <Input
                      type="time"
                      value={settingsForm.break_start}
                      onChange={(e) => setSettingsForm({ ...settingsForm, break_start: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                      placeholder="13:00"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">Break end</span>
                    <Input
                      type="time"
                      value={settingsForm.break_end}
                      onChange={(e) => setSettingsForm({ ...settingsForm, break_end: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                      placeholder="14:00"
                    />
                  </div>
                </div>
                {settingsForm.break_start && settingsForm.break_end && (
                  <button
                    onClick={() => setSettingsForm({ ...settingsForm, break_start: "", break_end: "" })}
                    className="font-body text-xs text-destructive hover:text-destructive/80 mt-2 transition-colors"
                  >
                    Remove break
                  </button>
                )}
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full rounded-none"
                onClick={handleSaveSettings}
                disabled={updateSettings.isPending}
              >
                {updateSettings.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>Save Settings</>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manual Booking Dialog */}
      <Dialog open={manualBookingOpen} onOpenChange={setManualBookingOpen}>
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-md rounded-none max-h-[90dvh] flex flex-col">
          <DialogHeader className="p-6 pb-0 shrink-0">
            <DialogTitle className="font-heading text-3xl text-foreground">
              Add Booking<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Create a booking for a walk-in or phone client.
            </p>
          </DialogHeader>

          <div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
            {/* Customer name */}
            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Customer Name
              </Label>
              <Input
                placeholder="Full name"
                value={manualGuestName}
                onChange={(e) => setManualGuestName(e.target.value)}
                className="bg-muted border-border rounded-none h-10 font-body"
                maxLength={100}
              />
            </div>

            {/* Phone number */}
            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Phone Number
              </Label>
              <Input
                placeholder="+1 234 567 8900"
                value={manualPhone}
                onChange={(e) => setManualPhone(e.target.value)}
                className="bg-muted border-border rounded-none h-10 font-body"
                maxLength={20}
                type="tel"
              />
            </div>

            {/* Service selection */}
            <div>
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Service
              </Label>
              <div className="grid grid-cols-1 gap-1.5 mt-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setManualService(s.id)}
                    className={cn(
                      "py-2 px-3 border font-body text-sm transition-all text-left flex items-center justify-between",
                      manualService === s.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/50"
                    )}
                  >
                    <span>{s.name}</span>
                    <span className="text-xs opacity-75">${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date — compact row with arrows */}
            <div>
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Date
              </Label>
              <div className="flex items-center justify-between mt-2 border border-border p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    const prev = addDays(manualDate, -1);
                    if (!isBefore(startOfDay(prev), startOfDay(new Date())) && !closedDays.includes(prev.getDay())) {
                      setManualDate(prev);
                      setManualTime(null);
                    }
                  }}
                  disabled={isBefore(startOfDay(addDays(manualDate, -1)), startOfDay(new Date()))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-body text-sm font-medium text-foreground">
                  {format(manualDate, "EEE, MMM d yyyy")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    let next = addDays(manualDate, 1);
                    // Skip closed days forward
                    while (closedDays.includes(next.getDay())) next = addDays(next, 1);
                    setManualDate(next);
                    setManualTime(null);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Time slot picker */}
            <div>
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Time
              </Label>
              {isClosedDay(manualDate) ? (
                <p className="font-body text-sm text-muted-foreground text-center py-4">
                  Shop is closed on {format(manualDate, "EEEE")}s.
                </p>
              ) : manualAvailableSlots.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground text-center py-4">
                  No available slots on this date.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 mt-2 max-h-[180px] overflow-y-auto">
                  {manualAvailableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setManualTime(time)}
                      className={cn(
                        "py-2 px-3 border font-body text-sm transition-all text-center",
                        manualTime === time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                Notes (optional)
              </Label>
              <Input
                placeholder="Any extra notes..."
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
                className="bg-muted border-border rounded-none h-10 font-body"
                maxLength={200}
              />
            </div>
          </div>

          {/* Sticky submit */}
          {manualGuestName.trim() && manualPhone.trim() && manualService && manualTime && (
            <div className="p-6 pt-0 shrink-0">
              <Button
                variant="hero"
                size="lg"
                className="w-full rounded-none"
                onClick={handleManualBooking}
                disabled={barberCreateBooking.isPending}
              >
                {barberCreateBooking.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Book {manualTime} — {getServiceById(manualService)?.name}
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ---- Grid helpers ----

function isSlotWithinHours(
  date: Date,
  time: string,
  settings: {
    open_time: string;
    close_time: string;
    sat_close_time: string;
    break_start: string | null;
    break_end: string | null;
  } | null
): boolean {
  const openTime = settings?.open_time ?? "09:00";
  const isSat = date.getDay() === 6;
  const closeTime = isSat
    ? (settings?.sat_close_time ?? "18:00")
    : (settings?.close_time ?? "20:00");
  const breakStart = settings?.break_start ?? null;
  const breakEnd = settings?.break_end ?? null;

  const [th, tm] = time.split(":").map(Number);
  const slotMin = th * 60 + tm;
  const [oh, om] = openTime.split(":").map(Number);
  const openMin = oh * 60 + om;
  const [ch, cm] = closeTime.split(":").map(Number);
  const lastSlotMin = ch * 60 + cm - SLOT_DURATION;

  if (slotMin < openMin || slotMin > lastSlotMin) return false;

  if (breakStart && breakEnd) {
    const [bsh, bsm] = breakStart.split(":").map(Number);
    const [beh, bem] = breakEnd.split(":").map(Number);
    if (slotMin >= bsh * 60 + bsm && slotMin < beh * 60 + bem) return false;
  }

  return true;
}

function isSlotPast(date: Date, time: string): boolean {
  const d = new Date(date);
  const [h, m] = time.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return isBefore(d, new Date());
}

export default Dashboard;
