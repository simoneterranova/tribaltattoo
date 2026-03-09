import { useState, useMemo, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
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
  ArrowUpRight,
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";


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
  const { lang, setLang, t, dateLocale } = useLanguage();
  const navigate = useNavigate();
  const { data: allBookings, isLoading: bookingsLoading } = useAllBookings();
  const updateStatus = useUpdateBookingStatus();
  const { notifications, unreadCount, markAllRead, clearNotification, clearAll } =
    useBarberNotifications();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [activeStatIdx, setActiveStatIdx] = useState(0);

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
  const [manualStep, setManualStep] = useState<"client" | "service" | "datetime" | "confirm" | "success">("client");
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

  const statusConfig = {
    confirmed: { label: t.common.confirmed, color: "text-green-400 bg-green-400/10 border-green-400/30" },
    cancelled: { label: t.common.cancelled, color: "text-muted-foreground bg-muted/50 border-border" },
    completed: { label: t.common.completed, color: "text-primary bg-primary/10 border-primary/30" },
  };

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

  // Mobile stat carousel: auto-cycle every 2.5s
  const statCards = useMemo(() => [
    { label: t.dashboard.todayBookings, value: String(todayBookingsCount) },
    { label: t.dashboard.todayRevenue, value: `$${todayRevenue}` },
    { label: t.dashboard.weekBookings, value: String(weekUpcoming) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [todayBookingsCount, todayRevenue, weekUpcoming, lang]);

  useEffect(() => {
    const timer = setInterval(() => setActiveStatIdx((i) => (i + 1) % 3), 2500);
    return () => clearInterval(timer);
  }, []);

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
    setManualStep("success");
  };

  const openManualBookingDialog = (date?: Date, prefillTime?: string | null) => {
    setManualDate(date ?? new Date());
    setManualService(null);
    setManualTime(prefillTime ?? null);
    setManualGuestName("");
    setManualPhone("");
    setManualNotes("");
    setManualStep("client");
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
  const manualVisibleSlots = manualDateSlots.filter((t) => {
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

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t.common.backToHome}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-body text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{profile?.full_name || user.email}</span>
            <span className="ml-1 text-[10px] tracking-wider uppercase px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/30">
              {t.dashboard.badge}
            </span>
          </div>
          <div className="flex items-center border border-border text-xs font-body">
            <button
              onClick={() => setLang('it')}
              className={cn("px-2 py-1 transition-colors", lang === 'it' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              IT
            </button>
            <button
              onClick={() => setLang('en')}
              className={cn("px-2 py-1 transition-colors", lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              EN
            </button>
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
            {t.common.signOut}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-6xl">
        {/* Header + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4 sm:gap-8"
        >
          <div>
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              {t.dashboard.sectionLabel}
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl text-foreground mt-2 leading-none">
              {t.dashboard.title}<span className="text-primary">.</span>
            </h1>
          </div>

          {/* Desktop: all 3 stats side by side */}
          <div className="hidden sm:flex items-end gap-6 sm:gap-8 pb-1 sm:pb-2">
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{t.dashboard.todayBookings}</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">{todayBookingsCount}</p>
            </div>
            <div className="w-px self-stretch bg-border/60" />
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{t.dashboard.todayRevenue}</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">${todayRevenue}</p>
            </div>
            <div className="w-px self-stretch bg-border/60" />
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{t.dashboard.weekBookings}</p>
              <p className="font-heading text-3xl sm:text-5xl text-foreground mt-0.5">{weekUpcoming}</p>
            </div>
          </div>

          {/* Mobile: single animated stat card cycling through all 3 */}
          <div className="flex sm:hidden items-end pb-1">
            <div className="relative" style={{ minWidth: 130 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStatIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    {statCards[activeStatIdx].label}
                  </p>
                  <p className="font-heading text-3xl text-foreground mt-0.5">
                    {statCards[activeStatIdx].value}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Dot indicators */}
              <div className="flex gap-1.5 mt-2">
                {statCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStatIdx(i)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === activeStatIdx ? "w-4 bg-primary" : "w-1.5 bg-border"
                    )}
                  />
                ))}
              </div>
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
            <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="shrink-0">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                  {format(weekStart, "MMMM yyyy", { locale: dateLocale })}
                  <span className="text-primary">.</span>
                </h2>
                <p className="font-body text-xs sm:text-sm text-muted-foreground">
                  {format(weekStart, "MMM d", { locale: dateLocale })} – {format(addDays(weekStart, 6), "MMM d, yyyy", { locale: dateLocale })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 order-last w-full sm:order-none sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-wider uppercase"
                  onClick={() => openManualBookingDialog()}
                >
                  <UserPlus className="h-3.5 w-3.5 mr-2" />
                  {t.dashboard.addBooking}
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
                  {t.dashboard.blockTimeSlot}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-wider uppercase"
                  onClick={openSettingsDialog}
                >
                  <Settings className="h-3.5 w-3.5 mr-2" />
                  {t.dashboard.shopSettings}
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
                  {t.dashboard.today}
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
                  style={{ gridTemplateColumns: "44px repeat(7, 1fr)" }}
                >
                  <div className="border-r border-border/50 py-2" />
                  {weekDays.map((day) => {
                    const todayDay = isToday(day);
                    const closed = closedDays.includes(day.getDay());
                    return (
                      <div
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "py-1 px-1 text-center border-r border-border/50 last:border-r-0 cursor-pointer hover:bg-muted/30 transition-colors select-none",
                          todayDay && "bg-primary/5",
                          closed && "opacity-40"
                        )}
                      >
                        <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground">
                          {format(day, "EEE", { locale: dateLocale })}
                        </p>
                        <p
                          className={cn(
                            "font-heading text-base leading-tight",
                            todayDay ? "text-primary" : "text-foreground"
                          )}
                        >
                          {format(day, "d")}
                        </p>
                        {closed && (
                          <p className="font-body text-[7px] text-destructive/60 uppercase tracking-wider">
                            {t.dashboard.closed}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Time rows */}
                <div>
                  {gridSlots.map((time) => {
                    return (
                      <div
                        key={time}
                        className="grid border-b border-border/40 last:border-b-0"
                        style={{ gridTemplateColumns: "44px repeat(7, 1fr)" }}
                      >
                        {/* Time label */}
                        <div className="flex items-center justify-end pr-1.5 border-r border-border/50 shrink-0 select-none font-body text-[9px] text-muted-foreground">
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
                                "relative h-8 border-r border-border/30 last:border-r-0 group",
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
                                    "absolute inset-[1px] flex flex-col justify-center px-1 text-left overflow-hidden transition-opacity",
                                    isWalkIn(booking)
                                      ? "bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25"
                                      : "bg-primary/20 border border-primary/40 hover:bg-primary/30"
                                  )}
                                >
                                  <p className="font-body text-[10px] font-medium text-foreground truncate leading-none">
                                    {getDisplayName(booking)}
                                  </p>
                                  <p className="font-body text-[8px] text-muted-foreground truncate leading-none mt-0.5">
                                    {booking.service_name}
                                  </p>
                                </button>
                              ) : blocked ? (
                                <div className="absolute inset-[1px] flex items-center gap-1 px-1 bg-muted/40 border border-border/60 group/block overflow-hidden">
                                  <Lock className="h-2 w-2 text-muted-foreground/60 shrink-0" />
                                  <span className="font-body text-[8px] text-muted-foreground/70 truncate flex-1">
                                    {blocked.reason || t.dashboard.blocked}
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
                                          {t.dashboard.unblockSlotTitle}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                                          {t.dashboard.unblockSlotDesc(format(parseISO(dateStr), "MMM d", { locale: dateLocale }), blocked.time)}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-none font-body">
                                          {t.dashboard.keepBlocked}
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteBlock.mutate(blocked.id)}
                                          className="rounded-none font-body"
                                        >
                                          {t.dashboard.unblock}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              ) : !closed && withinHours && !slotPast ? (
                                <button
                                  onClick={() => openManualBookingDialog(day, time)}
                                  className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary/5 transition-all"
                                  title={`Add booking — ${format(day, "EEE MMM d", { locale: dateLocale })} at ${time}`}
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
                    {t.dashboard.allUpcoming}<span className="text-primary">.</span>
                  </h2>
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
                              {format(parseISO(booking.date), "MMM", { locale: dateLocale })}
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
                              <span className="hidden sm:inline">{t.dashboard.complete}</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-none text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <XCircle className="h-3.5 w-3.5 sm:mr-1.5" />
                                  <span className="hidden sm:inline">{t.dashboard.cancel}</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="border-border bg-card rounded-none">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-heading text-2xl">
                                    {t.dashboard.cancelBookingTitle}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                                    {t.dashboard.cancelBookingDesc(
                                      getDisplayName(booking),
                                      booking.service_name,
                                      format(parseISO(booking.date), "MMM d", { locale: dateLocale }),
                                      booking.time
                                    )}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="rounded-none font-body">{t.common.keepIt}</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      updateStatus.mutate({ bookingId: booking.id, status: "cancelled" })
                                    }
                                    className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                                  >
                                    {t.common.yesCancel}
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
                    {t.dashboard.bookingLabel}<span className="text-primary">.</span>
                  </DialogTitle>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {format(parseISO(detailBooking.date), "EEEE, MMMM d, yyyy", { locale: dateLocale })} at {detailBooking.time}
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
                            {t.dashboard.walkIn}
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
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{t.dashboard.serviceLabel}</p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5 leading-tight">{detailBooking.service_name}</p>
                    </div>
                    <div className="border border-border p-3">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{t.dashboard.durationLabel}</p>
                      <p className="font-body text-sm font-medium text-foreground mt-0.5">{service?.duration ?? "—"}</p>
                    </div>
                    <div className="border border-border p-3">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{t.dashboard.priceLabel}</p>
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
                        {t.dashboard.markComplete}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex-1 rounded-none text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            {t.dashboard.cancelBooking}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-border bg-card rounded-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-heading text-2xl">{t.dashboard.cancelBookingTitle}</AlertDialogTitle>
                            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                              {t.dashboard.cancelBookingDesc(
                                getDisplayName(detailBooking),
                                detailBooking.service_name,
                                format(parseISO(detailBooking.date), "MMM d", { locale: dateLocale }),
                                detailBooking.time
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-none font-body">{t.common.keepIt}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                updateStatus.mutate({ bookingId: detailBooking.id, status: "cancelled" });
                                setBookingDetailOpen(false);
                              }}
                              className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                            >
                              {t.common.yesCancel}
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
              {t.dashboard.blockSlotTitle}<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {t.dashboard.blockSlotDesc}
            </p>
          </DialogHeader>

          <div className="p-6 space-y-4">
            {/* Date selector */}
            <div>
              <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                {t.dashboard.date}
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
                  {format(blockDate, "EEE, MMM d yyyy", { locale: dateLocale })}
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
                {t.dashboard.shopClosedOn(format(blockDate, "EEEE", { locale: dateLocale }))}
              </p>
            ) : availableSlotsForBlock.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground text-center py-4">
                {t.dashboard.noSlotsToBlock}
              </p>
            ) : (
              <>
                <div>
                  <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    {t.dashboard.selectTime}
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
                    {t.dashboard.reasonOptional}
                  </Label>
                  <Input
                    placeholder={t.dashboard.reasonPlaceholder}
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
                        {t.dashboard.blockBtn(blockTime)}
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
              {t.dashboard.shopSettingsTitle}<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {t.dashboard.shopSettingsDesc}
            </p>
          </DialogHeader>

          {settingsForm && (
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Closed Days */}
              <div>
                <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  {t.dashboard.closedDays}
                </Label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2">
                  {t.dashboard.days.map((day, i) => (
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
                  {t.dashboard.openingHours}
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">{t.dashboard.open}</span>
                    <Input
                      type="time"
                      value={settingsForm.open_time}
                      onChange={(e) => setSettingsForm({ ...settingsForm, open_time: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">{t.dashboard.closeWeekdays}</span>
                    <Input
                      type="time"
                      value={settingsForm.close_time}
                      onChange={(e) => setSettingsForm({ ...settingsForm, close_time: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="font-body text-xs text-muted-foreground">{t.dashboard.closeSaturday}</span>
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
                  {t.dashboard.dailyBreak}
                </Label>
                <p className="font-body text-xs text-muted-foreground mt-1 mb-2">
                  {t.dashboard.breakDesc}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">{t.dashboard.breakStart}</span>
                    <Input
                      type="time"
                      value={settingsForm.break_start}
                      onChange={(e) => setSettingsForm({ ...settingsForm, break_start: e.target.value })}
                      className="bg-muted border-border rounded-none h-10 font-body"
                      placeholder="13:00"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-body text-xs text-muted-foreground">{t.dashboard.breakEnd}</span>
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
                    {t.dashboard.removeBreak}
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
                  <>{ t.dashboard.saveSettings}</>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manual Booking Dialog */}
      <Dialog
        open={manualBookingOpen}
        onOpenChange={(val) => {
          if (!val) {
            setManualGuestName("");
            setManualPhone("");
            setManualService(null);
            setManualTime(null);
            setManualNotes("");
            setManualStep("client");
          }
          setManualBookingOpen(val);
        }}
      >
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-2xl lg:max-w-3xl rounded-none max-h-[90dvh]">
          <div className="flex flex-col lg:flex-row min-h-[520px] max-h-[90dvh]">

            {/* Sidebar */}
            <div className="bg-muted/50 border-b lg:border-b-0 lg:border-r border-border p-6 lg:w-56 shrink-0">
              <h3 className="font-heading text-3xl text-foreground leading-none">
                {t.dashboard.addClientTitle.split('\n')[0]}<br />{t.dashboard.addClientTitle.split('\n')[1]}<span className="text-primary">.</span>
              </h3>

              {/* Live summary */}
              <div className="mt-6 space-y-3">
                {manualGuestName.trim() && (
                  <div className="flex items-start gap-2">
                    <User className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.dashboard.clientLabel}</p>
                      <p className="font-body text-sm text-foreground">{manualGuestName}</p>
                      {manualPhone && (
                        <p className="font-body text-xs text-muted-foreground">{manualPhone}</p>
                      )}
                    </div>
                  </div>
                )}
                {manualService && (
                  <div className="flex items-start gap-2">
                    <Scissors className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.dashboard.serviceStepLabel}</p>
                      <p className="font-body text-sm text-foreground">{getServiceById(manualService)?.name}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {getServiceById(manualService)?.duration} · ${getServiceById(manualService)?.price}
                      </p>
                    </div>
                  </div>
                )}
                {manualTime && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.dashboard.dateTimeLabel}</p>
                      <p className="font-body text-sm text-foreground">{format(manualDate, "EEE, MMM d", { locale: dateLocale })}</p>
                      <p className="font-body text-xs text-muted-foreground">{manualTime}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step indicators */}
              <div className="mt-8 flex lg:flex-col gap-2">
                {(["client", "service", "datetime", "confirm"] as const).map((s, i) => {
                  const allSteps = ["client", "service", "datetime", "confirm"];
                  const currentIdx = allSteps.indexOf(
                    manualStep === "success" ? "confirm" : manualStep
                  );
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center font-body text-xs border transition-colors",
                          manualStep === s || (manualStep === "success" && s === "confirm")
                            ? "bg-primary text-primary-foreground border-primary"
                            : currentIdx > i
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        {i + 1}
                      </div>
                      <span className="hidden lg:inline font-body text-xs text-muted-foreground">
                        {t.dashboard.stepLabels[s]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 p-6 overflow-y-auto min-h-0">
              <AnimatePresence mode="wait">

                {/* Step 1: Client Details */}
                {manualStep === "client" && (
                  <motion.div key="client" {...stepVariants} transition={{ duration: 0.2 }} className="space-y-4">
                    <p className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">{t.dashboard.clientDetails}</p>
                    <div className="space-y-1.5">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                        {t.dashboard.customerName}
                      </Label>
                      <Input
                        placeholder={t.dashboard.namePlaceholder}
                        value={manualGuestName}
                        onChange={(e) => setManualGuestName(e.target.value)}
                        className="bg-muted border-border rounded-none h-12 font-body"
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                        {t.dashboard.phoneNumber}
                      </Label>
                      <Input
                        placeholder={t.dashboard.phonePlaceholder}
                        value={manualPhone}
                        onChange={(e) => setManualPhone(e.target.value)}
                        className="bg-muted border-border rounded-none h-12 font-body"
                        maxLength={20}
                        type="tel"
                      />
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full rounded-none"
                      disabled={!manualGuestName.trim() || !manualPhone.trim()}
                      onClick={() => setManualStep("service")}
                    >
                      {t.dashboard.continue} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Service Selection */}
                {manualStep === "service" && (
                  <motion.div key="service" {...stepVariants} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setManualStep("client")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">{t.dashboard.selectService}</p>
                    </div>
                    <div className="space-y-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setManualService(s.id);
                            setManualStep("datetime");
                          }}
                          className={cn(
                            "w-full flex items-center justify-between p-4 border transition-all group text-left",
                            manualService === s.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 bg-transparent"
                          )}
                        >
                          <div>
                            <p className="font-body text-sm text-foreground font-medium">{s.name}</p>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">{s.duration}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-heading text-2xl text-foreground">${s.price}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date & Time */}
                {manualStep === "datetime" && (
                  <motion.div key="datetime" {...stepVariants} transition={{ duration: 0.2 }} className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setManualStep("service")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">{t.dashboard.pickDateTime}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 overflow-y-auto">
                      <div className="shrink-0">
                        <Calendar
                          mode="single"
                          selected={manualDate}
                          onSelect={(date) => {
                            if (date) {
                              setManualDate(date);
                              setManualTime(null);
                            }
                          }}
                          disabled={(date) =>
                            closedDays.includes(date.getDay()) ||
                            isBefore(startOfDay(date), startOfDay(new Date()))
                          }
                          locale={dateLocale}
                          className="p-3 pointer-events-auto border border-border"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-foreground mb-3 font-medium">
                          {format(manualDate, "EEEE, MMMM d", { locale: dateLocale })}
                        </p>
                        {isClosedDay(manualDate) ? (
                          <p className="font-body text-sm text-muted-foreground">
                            {t.dashboard.shopClosedOn(format(manualDate, "EEEE", { locale: dateLocale }))}
                          </p>
                        ) : manualVisibleSlots.length === 0 ? (
                          <p className="font-body text-sm text-muted-foreground">
                            {t.dashboard.noSlotsDate}
                          </p>
                        ) : manualAvailableSlots.length === 0 ? (
                          <p className="font-body text-sm text-muted-foreground">
                            {t.dashboard.allSlotsTaken}
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 md:grid-cols-2 gap-2 max-h-[160px] md:max-h-[280px] overflow-y-auto pr-1">
                            {manualVisibleSlots.map((time) => {
                              const isTaken =
                                manualDateBookedTimes.has(time) ||
                                manualDateBlockedTimes.has(time);
                              return (
                                <button
                                  key={time}
                                  onClick={() => !isTaken && setManualTime(time)}
                                  disabled={isTaken}
                                  className={cn(
                                    "py-2.5 px-3 border font-body text-sm transition-all text-center",
                                    isTaken
                                      ? "border-destructive/30 bg-destructive/5 text-destructive/60 cursor-not-allowed line-through"
                                      : manualTime === time
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border text-foreground hover:border-primary/50"
                                  )}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {manualTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-4 shrink-0"
                      >
                        <Button
                          variant="hero"
                          size="lg"
                          className="w-full rounded-none"
                          onClick={() => setManualStep("confirm")}
                        >
                          {t.dashboard.continue} <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Review & Confirm */}
                {manualStep === "confirm" && (
                  <motion.div key="confirm" {...stepVariants} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setManualStep("datetime")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">{t.dashboard.reviewConfirm}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="border border-border p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-muted flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">{manualGuestName}</p>
                            {manualPhone && (
                              <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Phone className="h-3 w-3" />
                                {manualPhone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border border-border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">
                              {getServiceById(manualService ?? "")?.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">
                              {getServiceById(manualService ?? "")?.duration}
                            </p>
                          </div>
                          <span className="font-heading text-3xl text-foreground">
                            ${getServiceById(manualService ?? "")?.price}
                          </span>
                        </div>
                      </div>
                      <div className="border border-border p-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                            <p className="font-body text-sm text-foreground">
                              {format(manualDate, "EEEE, MMMM d, yyyy")}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                            <p className="font-body text-sm text-foreground">{manualTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                        {t.dashboard.notesOptional}
                      </Label>
                      <Textarea
                        placeholder={t.dashboard.notesPlaceholder}
                        value={manualNotes}
                        onChange={(e) => setManualNotes(e.target.value)}
                        className="bg-muted border-border rounded-none font-body resize-none min-h-[80px]"
                        maxLength={500}
                      />
                    </div>

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
                          {t.dashboard.confirmBooking} <ArrowUpRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Step 5: Success */}
                {manualStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                  >
                    <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                    <h3 className="font-heading text-4xl text-foreground">
                      {t.dashboard.bookedTitle}<span className="text-primary">.</span>
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-3 max-w-sm">
                      {t.dashboard.bookedDesc(
                        manualGuestName,
                        getServiceById(manualService ?? "")?.name ?? "",
                        format(manualDate, "EEEE, MMMM d"),
                        manualTime ?? ""
                      )}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-none mt-6"
                      onClick={() => setManualBookingOpen(false)}
                    >
                      {t.dashboard.done}
                    </Button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
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
