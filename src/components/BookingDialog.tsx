import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  ArrowLeft,
  CalendarPlus,
  Clock,
  Scissors,
  ChevronRight,
  Loader2,
  CheckCircle2,
  User,
  Mail,
} from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreateBooking, useBookedSlots } from "@/hooks/useBookings";
import { useShopSettings } from "@/hooks/useShopSettings";
import { services, generateTimeSlots } from "@/lib/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface BookingDialogProps {
  /** Trigger element. Omit when using controlled mode (open/onOpenChange). */
  children?: ReactNode;
  /** Controlled open state. When provided, the dialog becomes fully controlled. */
  open?: boolean;
  /** Controlled onOpenChange. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void;
}

type Step = "auth" | "service" | "datetime" | "confirm" | "success";

// Auth form schemas
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
const registerSchema = z.object({
  fullName: z.string().min(2, "At least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const BookingDialog = ({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange }: BookingDialogProps) => {
  const { user, signIn, signUp } = useAuth();
  const { t, dateLocale } = useLanguage();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState<Step>(user ? "service" : "auth");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen! : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled) {
      controlledOnOpenChange?.(val);
    } else {
      setInternalOpen(val);
    }
  };

  // Auth state inside dialog
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmEmail, setConfirmEmail] = useState(false);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", email: "", password: "", confirmPassword: "" },
  });

  const service = services.find((s) => s.id === selectedService);

  const { data: shopSettings } = useShopSettings();
  const closedDays = shopSettings?.closed_days ?? [0];

  const timeSlots = generateTimeSlots(selectedDate, shopSettings ? {
    openTime: shopSettings.open_time,
    closeTime: shopSettings.close_time,
    satCloseTime: shopSettings.sat_close_time,
    breakStart: shopSettings.break_start,
    breakEnd: shopSettings.break_end,
  } : undefined);

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const { data: bookedSlots = [] } = useBookedSlots(formattedDate);

  // Filter out past time slots when the selected date is today
  const now = new Date();
  const isToday = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  // Only filter out past slots — booked slots are shown as taken
  const visibleSlots = timeSlots.filter((slot) => {
    if (isToday) {
      const [h, m] = slot.split(":").map(Number);
      if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) return false;
    }
    return true;
  });
  const availableSlots = visibleSlots.filter((slot) => !bookedSlots.includes(slot));

  const reset = () => {
    setStep(user ? "service" : "auth");
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setNotes("");
    setAuthError(null);
    setConfirmEmail(false);
    setAuthMode("login");
    loginForm.reset();
    registerForm.reset();
    createBooking.reset();
  };

  const handleOpenChange = (val: boolean) => {
    if (!val && step === "success") {
      setOpen(false);
      reset();
      return;
    }
    if (val) {
      // Always set the right starting step when opening
      setStep(user ? "service" : "auth");
    }
    setOpen(val);
    if (!val) reset();
  };

  const handleLogin = async (values: LoginValues) => {
    setAuthError(null);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setAuthError(error);
    } else {
      setStep("service");
    }
  };

  const handleRegister = async (values: RegisterValues) => {
    setAuthError(null);
    const { error } = await signUp(
      values.email,
      values.password,
      values.fullName,
      values.phone || undefined
    );
    if (error) {
      setAuthError(error);
    } else {
      setConfirmEmail(true);
    }
  };

  const switchAuthMode = (m: "login" | "register") => {
    setAuthMode(m);
    setAuthError(null);
    setConfirmEmail(false);
    loginForm.reset();
    registerForm.reset();
  };

  const handleConfirmBooking = async () => {
    if (!user || !service || !selectedDate || !selectedTime) return;

    await createBooking.mutateAsync({
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      notes: notes || null,
    });

    setStep("success");
  };

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  // Which steps to show in the sidebar indicator
  const sidebarSteps = user || step !== "auth"
    ? (["service", "datetime", "confirm"] as const)
    : (["auth", "service", "datetime", "confirm"] as const);

  const stepLabels: Record<string, string> = {
    auth: t.bookingDialog.signInTitle,
    service: t.bookingDialog.stepService,
    datetime: t.bookingDialog.stepDatetime,
    confirm: t.bookingDialog.stepConfirm,
  };

  const inputClass = "bg-muted border-border rounded-none h-12 font-body";
  const labelClass = "font-body text-xs tracking-widest uppercase text-muted-foreground";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-2xl lg:max-w-3xl rounded-none max-h-[90dvh]">
        <div className="flex flex-col lg:flex-row min-h-[520px] max-h-[90dvh]">
          {/* Sidebar summary */}
          <div className="bg-muted/50 border-b lg:border-b-0 lg:border-r border-border p-6 lg:w-56 shrink-0">
            <h3 className="font-heading text-3xl text-foreground leading-none">
              {t.bookingDialog.sidebarTitle.split('\n')[0]}<br />{t.bookingDialog.sidebarTitle.split('\n')[1]}<span className="text-primary">.</span>
            </h3>
            <div className="mt-6 space-y-3">
              {service && (
                <div className="flex items-start gap-2">
                  <Scissors className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.bookingDialog.sidebarService}</p>
                    <p className="font-body text-sm text-foreground">{service.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{service.duration} · €{service.price}</p>
                  </div>
                </div>
              )}
              {selectedDate && (
                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.bookingDialog.sidebarDatetime}</p>
                    <p className="font-body text-sm text-foreground">{format(selectedDate, "EEE, MMM d", { locale: dateLocale })}</p>
                    {selectedTime && (
                      <p className="font-body text-xs text-muted-foreground">{selectedTime}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step indicators */}
            <div className="mt-8 flex lg:flex-col gap-2">
              {sidebarSteps.map((s, i) => {
                const currentIdx = sidebarSteps.indexOf(
                  (step === "success" ? "confirm" : step) as typeof sidebarSteps[number]
                );
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center font-body text-xs border transition-colors",
                        (step === s || (step === "success" && s === "confirm"))
                          ? "bg-primary text-primary-foreground border-primary"
                          : currentIdx > i
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border"
                      )}
                    >
                      {i + 1}
                    </div>
                    <span className="hidden lg:inline font-body text-xs text-muted-foreground">
                      {stepLabels[s]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-6 overflow-y-auto min-h-0">
            <AnimatePresence mode="wait">
              {/* Step 0: Auth (only if not logged in) */}
              {step === "auth" && (
                <motion.div key="auth" {...stepVariants} transition={{ duration: 0.2 }}>
                  {confirmEmail ? (
                    <div className="flex flex-col items-center justify-center text-center min-h-[380px]">
                      <Mail className="h-12 w-12 text-primary mb-4" />
                      <h3 className="font-heading text-3xl text-foreground">
                        {t.bookingDialog.checkEmail}<span className="text-primary">.</span>
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mt-3 max-w-sm">
                        {t.bookingDialog.checkEmailDesc}
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-none mt-6"
                        onClick={() => switchAuthMode("login")}
                      >
                        {t.bookingDialog.backToSignIn}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <p className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-2">
                          {authMode === "login" ? t.bookingDialog.signInTitle : t.bookingDialog.registerTitle}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          {authMode === "login"
                            ? t.bookingDialog.signInDesc
                            : t.bookingDialog.registerDesc}
                        </p>
                      </div>

                      {authError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-4 p-3 border border-destructive/50 bg-destructive/10"
                        >
                          <p className="font-body text-xs text-destructive">{authError}</p>
                        </motion.div>
                      )}

                      <AnimatePresence mode="wait">
                        {authMode === "login" ? (
                          <motion.form
                            key="login-form"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 15 }}
                            transition={{ duration: 0.15 }}
                            onSubmit={loginForm.handleSubmit(handleLogin)}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <Label className={labelClass}>Email</Label>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className={inputClass}
                                {...loginForm.register("email")}
                              />
                              {loginForm.formState.errors.email && (
                                <p className="text-destructive text-xs font-body">{loginForm.formState.errors.email.message}</p>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              <Label className={labelClass}>{t.bookingDialog.password}</Label>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className={inputClass}
                                {...loginForm.register("password")}
                              />
                              {loginForm.formState.errors.password && (
                                <p className="text-destructive text-xs font-body">{loginForm.formState.errors.password.message}</p>
                              )}
                            </div>
                            <Button
                              type="submit"
                              variant="hero"
                              size="lg"
                              className="w-full rounded-none"
                              disabled={loginForm.formState.isSubmitting}
                            >
                              {loginForm.formState.isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <>{t.bookingDialog.signInContinue} <ChevronRight className="ml-2 h-4 w-4" /></>
                              )}
                            </Button>
                          </motion.form>
                        ) : (
                          <motion.form
                            key="register-form"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.15 }}
                            onSubmit={registerForm.handleSubmit(handleRegister)}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <Label className={labelClass}>{t.bookingDialog.fullName}</Label>
                                <Input
                                  placeholder={t.bookingDialog.namePlaceholder}
                                  className={inputClass}
                                  {...registerForm.register("fullName")}
                                />
                                {registerForm.formState.errors.fullName && (
                                  <p className="text-destructive text-xs font-body">{registerForm.formState.errors.fullName.message}</p>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                <Label className={labelClass}>{t.bookingDialog.phonePlaceholder}</Label>
                                <Input
                                  placeholder="+1 (555) 000-0000"
                                  className={inputClass}
                                  {...registerForm.register("phone")}
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <Label className={labelClass}>{t.bookingDialog.email}</Label>
                              <Input
                                type="email"
                                placeholder={t.bookingDialog.emailPlaceholder}
                                className={inputClass}
                                {...registerForm.register("email")}
                              />
                              {registerForm.formState.errors.email && (
                                <p className="text-destructive text-xs font-body">{registerForm.formState.errors.email.message}</p>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <Label className={labelClass}>{t.bookingDialog.password}</Label>
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className={inputClass}
                                  {...registerForm.register("password")}
                                />
                                {registerForm.formState.errors.password && (
                                  <p className="text-destructive text-xs font-body">{registerForm.formState.errors.password.message}</p>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                <Label className={labelClass}>{t.bookingDialog.confirmPassword}</Label>
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className={inputClass}
                                  {...registerForm.register("confirmPassword")}
                                />
                                {registerForm.formState.errors.confirmPassword && (
                                  <p className="text-destructive text-xs font-body">{registerForm.formState.errors.confirmPassword.message}</p>
                                )}
                              </div>
                            </div>
                            <Button
                              type="submit"
                              variant="hero"
                              size="lg"
                              className="w-full rounded-none"
                              disabled={registerForm.formState.isSubmitting}
                            >
                              {registerForm.formState.isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <>{t.bookingDialog.createAccount} <ChevronRight className="ml-2 h-4 w-4" /></>
                              )}
                            </Button>
                          </motion.form>
                        )}
                      </AnimatePresence>

                      <div className="mt-5 text-center">
                        <p className="font-body text-xs text-muted-foreground">
                          {authMode === "login" ? t.bookingDialog.noAccount + " " : t.bookingDialog.haveAccount + " "}
                          <button
                            type="button"
                            onClick={() => switchAuthMode(authMode === "login" ? "register" : "login")}
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            {authMode === "login" ? t.bookingDialog.signUp : t.bookingDialog.signIn}
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Step 1: Service Selection */}
              {step === "service" && (
                <motion.div key="service" {...stepVariants} transition={{ duration: 0.2 }}>
                  <p className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">{t.bookingDialog.selectService}</p>
                  <div className="space-y-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s.id);
                          setStep("datetime");
                        }}
                        className={cn(
                          "w-full flex items-center justify-between p-4 border transition-all group text-left",
                          selectedService === s.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 bg-transparent"
                        )}
                      >
                        <div>
                          <p className="font-body text-sm text-foreground font-medium">{s.name}</p>
                          <p className="font-body text-xs text-muted-foreground mt-0.5">{s.duration}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-2xl text-foreground">€{s.price}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === "datetime" && (
                <motion.div key="datetime" {...stepVariants} transition={{ duration: 0.2 }} className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setStep("service")} className="text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">{t.bookingDialog.pickDateTime}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 overflow-y-auto">
                    <div className="shrink-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        disabled={(date) =>
                          closedDays.includes(date.getDay()) || isBefore(startOfDay(date), startOfDay(new Date()))
                        }
                        locale={dateLocale}
                        className="p-3 pointer-events-auto border border-border"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {selectedDate ? (
                        <>
                          <p className="font-body text-sm text-foreground mb-3 font-medium">
                            {format(selectedDate, "EEEE, MMMM d", { locale: dateLocale })}
                          </p>
                          {visibleSlots.length === 0 ? (
                            <p className="font-body text-sm text-muted-foreground">
                              {t.bookingDialog.noSlotsDate}
                            </p>
                          ) : availableSlots.length === 0 ? (
                            <p className="font-body text-sm text-muted-foreground">
                              {t.bookingDialog.allSlotsTaken}
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 md:grid-cols-2 gap-2 max-h-[160px] md:max-h-[280px] overflow-y-auto pr-1">
                              {visibleSlots.map((time) => {
                                const isTaken = bookedSlots.includes(time);
                                return (
                                  <button
                                    key={time}
                                    onClick={() => !isTaken && setSelectedTime(time)}
                                    disabled={isTaken}
                                    className={cn(
                                      "py-2.5 px-3 border font-body text-sm transition-all text-center",
                                      isTaken
                                        ? "border-destructive/30 bg-destructive/5 text-destructive/60 cursor-not-allowed line-through"
                                        : selectedTime === time
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
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="font-body text-sm text-muted-foreground">{t.bookingDialog.selectDatePrompt}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedTime && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 shrink-0">
                      <Button
                        variant="hero"
                        size="lg"
                        className="w-full rounded-none"
                        onClick={() => setStep("confirm")}
                      >
                        {t.bookingDialog.continue} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Review & Confirm */}
              {step === "confirm" && (
                <motion.div key="confirm" {...stepVariants} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep("datetime")} className="text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">{t.bookingDialog.reviewConfirm}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-body text-sm font-medium text-foreground">{service?.name}</p>
                          <p className="font-body text-xs text-muted-foreground mt-0.5">{service?.duration}</p>
                        </div>
                        <span className="font-heading text-3xl text-foreground">€{service?.price}</span>
                      </div>
                    </div>
                    <div className="border border-border p-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.bookingDialog.date}</p>
                          <p className="font-body text-sm text-foreground">
                            {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy", { locale: dateLocale })}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{t.bookingDialog.time}</p>
                          <p className="font-body text-sm text-foreground">{selectedTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      {t.bookingDialog.notesOptional}
                    </Label>
                    <Textarea
                      placeholder={t.bookingDialog.notesPlaceholder}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-muted border-border rounded-none font-body resize-none min-h-[80px]"
                      maxLength={500}
                    />
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full rounded-none"
                    onClick={handleConfirmBooking}
                    disabled={createBooking.isPending}
                  >
                    {createBooking.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        {t.bookingDialog.confirmBtn}{" "}
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                >
                  <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                  <h3 className="font-heading text-4xl text-foreground">
                    {t.bookingDialog.successTitle}<span className="text-primary">.</span>
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-3 max-w-sm">
                    {t.bookingDialog.successDesc(
                      service?.name ?? '',
                      selectedDate ? format(selectedDate, "EEEE, MMMM d", { locale: dateLocale }) : '',
                      selectedTime ?? ''
                    )}
                  </p>
                  {createBooking.data && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-none mt-6 text-xs">
                          <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
                          {t.bookingDialog.addToCalendar}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="rounded-none border-border">
                        <DropdownMenuItem asChild>
                          <a
                            href={buildGoogleCalendarUrl(createBooking.data)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer font-body text-xs"
                          >
                            {t.bookingDialog.googleCalendar}
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer font-body text-xs"
                          onClick={() => downloadIcsFile(createBooking.data!)}
                        >
                          {t.bookingDialog.appleCalendar}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="hero"
                      className="rounded-none"
                      onClick={() => {
                        handleOpenChange(false);
                        navigate("/my-bookings");
                      }}
                    >
                      {t.bookingDialog.viewMyBookings} <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-none"
                      onClick={() => handleOpenChange(false)}
                    >
                      {t.bookingDialog.done}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
