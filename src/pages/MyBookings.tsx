import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useBookings,
  useCancelBooking,
  useRescheduleBooking,
  useDeleteBooking,
  useBookedSlots,
} from "@/hooks/useBookings";
import { getServiceById, generateTimeSlots } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  Clock,
  Loader2,
  LogOut,
  Scissors,
  User,
  XCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { format, parseISO, isBefore, startOfDay, isSunday } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import type { Booking } from "@/types/supabase";
import BookingDialog from "@/components/BookingDialog";


function isPastBooking(booking: Booking): boolean {
  const bookingDate = parseISO(booking.date);
  const [hours, minutes] = booking.time.split(":").map(Number);
  bookingDate.setHours(hours, minutes);
  return isBefore(bookingDate, new Date());
}

const MyBookings = () => {
  const { user, profile, loading: authLoading, signOut, isBarber } = useAuth();
  const { lang, setLang, t, dateLocale } = useLanguage();
  const navigate = useNavigate();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const cancelBooking = useCancelBooking();
  const rescheduleBooking = useRescheduleBooking();
  const deleteBooking = useDeleteBooking();

  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
  const [rescheduleTime, setRescheduleTime] = useState<string | null>(null);

  // Fetch booked slots for the selected reschedule date
  const formattedRescheduleDate = rescheduleDate
    ? format(rescheduleDate, "yyyy-MM-dd")
    : null;
  const { data: bookedSlots = [] } = useBookedSlots(formattedRescheduleDate);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (isBarber) return <Navigate to="/dashboard" replace />;

  const statusConfig = {
    confirmed: { label: t.common.confirmed, color: "text-green-400 bg-green-400/10 border-green-400/30" },
    cancelled: { label: t.common.cancelled, color: "text-muted-foreground bg-muted/50 border-border" },
    completed: { label: t.common.completed, color: "text-primary bg-primary/10 border-primary/30" },
  };

  const loading = bookingsLoading;

  // Split into upcoming and past
  const upcoming =
    bookings
      ?.filter((b) => b.status === "confirmed" && !isPastBooking(b))
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)) ?? [];

  const past =
    bookings
      ?.filter((b) => b.status !== "confirmed" || isPastBooking(b))
      .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)) ?? [];

  const handleReschedule = async () => {
    if (!rescheduleTarget || !rescheduleDate || !rescheduleTime) return;
    await rescheduleBooking.mutateAsync({
      bookingId: rescheduleTarget.id,
      date: format(rescheduleDate, "yyyy-MM-dd"),
      time: rescheduleTime,
    });
    setRescheduleTarget(null);
    setRescheduleDate(undefined);
    setRescheduleTime(null);
  };

  const timeSlots = generateTimeSlots(rescheduleDate);
  const rescheduleNow = new Date();
  const isRescheduleToday = rescheduleDate && format(rescheduleDate, "yyyy-MM-dd") === format(rescheduleNow, "yyyy-MM-dd");
  const availableSlots = timeSlots.filter((slot) => {
    if (bookedSlots.includes(slot)) return false;
    if (isRescheduleToday) {
      const [h, m] = slot.split(":").map(Number);
      if (h < rescheduleNow.getHours() || (h === rescheduleNow.getHours() && m <= rescheduleNow.getMinutes())) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.common.backToHome}
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-body text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{profile?.full_name || user.email}</span>
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

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            {t.myBookings.sectionLabel}
          </span>
          <h1 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
            {t.myBookings.title}<span className="text-primary">.</span>
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-3 max-w-md">
            {t.myBookings.subtitle}
          </p>
        </motion.div>

        {/* New booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <BookingDialog>
            <Button variant="hero" size="lg" className="rounded-none">
              {t.myBookings.newBooking} <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </BookingDialog>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Upcoming */}
            <div className="mt-16">
              <h2 className="font-heading text-3xl text-foreground mb-6">
                {t.myBookings.upcoming}<span className="text-primary">.</span>
              </h2>

              {upcoming.length === 0 ? (
                <div className="border border-dashed border-border p-8 text-center">
                  <CalendarDays className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-body text-sm text-muted-foreground">
                    {t.myBookings.noUpcoming}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {upcoming.map((booking, i) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        index={i}
                        onCancel={() => cancelBooking.mutate(booking.id)}
                        onReschedule={() => {
                          setRescheduleTarget(booking);
                          setRescheduleDate(undefined);
                          setRescheduleTime(null);
                        }}
                        isCancelling={cancelBooking.isPending}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Past */}
            {past.length > 0 && (
              <div className="mt-16">
                <h2 className="font-heading text-3xl text-foreground mb-6">
                  {t.myBookings.history}<span className="text-primary">.</span>
                </h2>
                <div className="space-y-3">
                  {past.map((booking, i) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      index={i}
                      isPast
                      onDelete={() => deleteBooking.mutate(booking.id)}
                      isDeleting={deleteBooking.isPending}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Reschedule dialog */}
      <Dialog
        open={!!rescheduleTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRescheduleTarget(null);
            setRescheduleDate(undefined);
            setRescheduleTime(null);
          }
        }}
      >
        <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-xl rounded-none">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-heading text-3xl text-foreground">
              {t.myBookings.rescheduleTitle}<span className="text-primary">.</span>
            </DialogTitle>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {t.myBookings.rescheduleDesc(
                rescheduleTarget?.service_name ?? ""
              )}
            </p>
          </DialogHeader>

          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <Calendar
                mode="single"
                selected={rescheduleDate}
                onSelect={(date) => {
                  setRescheduleDate(date);
                  setRescheduleTime(null);
                }}
                disabled={(date) =>
                  isSunday(date) ||
                  isBefore(startOfDay(date), startOfDay(new Date()))
                }
                locale={dateLocale}
                className="p-3 pointer-events-auto border border-border"
              />
            </div>
            <div className="flex-1 min-w-0">
              {rescheduleDate ? (
                <>
                  <p className="font-body text-sm text-foreground mb-3 font-medium">
                    {format(rescheduleDate, "EEEE, MMMM d", { locale: dateLocale })}
                  </p>
                  {availableSlots.length === 0 ? (
                    <p className="font-body text-sm text-muted-foreground">
                      {t.myBookings.noSlotsDate}
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1">
                      {availableSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setRescheduleTime(time)}
                          className={cn(
                            "py-2.5 px-3 border font-body text-sm transition-all text-center",
                            rescheduleTime === time
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-foreground hover:border-primary/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="font-body text-sm text-muted-foreground">
                    {t.myBookings.selectDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          {rescheduleTime && (
            <div className="px-6 pb-6">
              <Button
                variant="hero"
                size="lg"
                className="w-full rounded-none"
                onClick={handleReschedule}
                disabled={rescheduleBooking.isPending}
              >
                {rescheduleBooking.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {t.myBookings.confirmReschedule}{" "}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
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

// ---- BookingCard sub-component ----

// ---- BookingCard sub-component ----

interface BookingCardProps {
  booking: Booking;
  index: number;
  isPast?: boolean;
  onCancel?: () => void;
  onReschedule?: () => void;
  onDelete?: () => void;
  isCancelling?: boolean;
  isDeleting?: boolean;
}

function BookingCard({
  booking,
  index,
  isPast = false,
  onCancel,
  onReschedule,
  onDelete,
  isCancelling,
  isDeleting,
}: BookingCardProps) {
  const { t, dateLocale } = useLanguage();
  const statusConfig = {
    confirmed: { label: t.common.confirmed, color: "text-green-400 bg-green-400/10 border-green-400/30" },
    cancelled: { label: t.common.cancelled, color: "text-muted-foreground bg-muted/50 border-border" },
    completed: { label: t.common.completed, color: "text-primary bg-primary/10 border-primary/30" },
  };
  const service = getServiceById(booking.service_id);
  const config = statusConfig[booking.status as keyof typeof statusConfig];
  const bookingDate = parseISO(booking.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors",
        isPast ? "opacity-60" : "hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Date block */}
        <div className="text-center shrink-0 w-14">
          <p className="font-heading text-3xl text-foreground leading-none">
            {format(bookingDate, "dd")}
          </p>
          <p className="font-body text-xs text-muted-foreground uppercase">
            {format(bookingDate, "MMM", { locale: dateLocale })}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-body text-sm font-medium text-foreground">
              {booking.service_name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 text-[10px] font-body uppercase tracking-wider border",
                config.color
              )}
            >
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {booking.time}
            </span>
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
              <Scissors className="h-3 w-3" />
              {service?.duration ?? "—"}
            </span>
            <span className="font-body text-xs text-muted-foreground">
              €{booking.service_price}
            </span>
          </div>
        </div>
      </div>
              
      {/* Actions */}
      {!isPast && booking.status === "confirmed" && (
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-none text-xs sm:flex-none">
                <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
                {t.myBookings.addToCalendar}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-border">
              <DropdownMenuItem asChild>
                <a
                  href={buildGoogleCalendarUrl(booking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer font-body text-xs"
                >
                  {t.myBookings.googleCalendar}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer font-body text-xs"
                onClick={() => downloadIcsFile(booking)}
              >
                {t.myBookings.appleCalendar}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button
            variant="outline"
            size="sm"
            className="rounded-none text-xs flex-1 sm:flex-none"
            onClick={onReschedule}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Reschedule
          </Button> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <XCircle className="h-3.5 w-3.5 mr-1.5" />
                {t.myBookings.cancel}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border bg-card rounded-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading text-2xl">
                  {t.myBookings.cancelBookingTitle}
                </AlertDialogTitle>
                <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                  {t.myBookings.cancelBookingDesc(
                    booking.service_name,
                    format(bookingDate, "EEEE, MMMM d", { locale: dateLocale }),
                    booking.time
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-none font-body">
                  {t.myBookings.keepIt}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onCancel}
                  disabled={isCancelling}
                  className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                >
                  {isCancelling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    t.myBookings.yesCancel
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Delete button for past/cancelled/completed bookings */}
      {isPast && onDelete && (
        <div className="flex items-center shrink-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                {t.myBookings.remove}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border bg-card rounded-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading text-2xl">
                  {t.myBookings.removeFromHistoryTitle}
                </AlertDialogTitle>
                <AlertDialogDescription className="font-body text-sm text-muted-foreground">
                  {t.myBookings.removeFromHistoryDesc(
                    booking.service_name,
                    format(bookingDate, "MMMM d", { locale: dateLocale })
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-none font-body">
                  {t.myBookings.keepIt}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    t.myBookings.yesRemove
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </motion.div>
  );
}

export default MyBookings;
