import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ArrowUpRight, ArrowLeft, Clock, Scissors, User, ChevronRight } from "lucide-react";
import { format, isSunday, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BookingDialogProps {
  children: ReactNode;
}

const services = [
  { id: "haircut", name: "Signature Haircut", price: 45, duration: "45 min" },
  { id: "beard", name: "Beard Trim & Shape", price: 30, duration: "30 min" },
  { id: "shave", name: "Hot Towel Shave", price: 40, duration: "40 min" },
  { id: "combo", name: "Cut + Beard Combo", price: 65, duration: "60 min" },
  { id: "deluxe", name: "The Deluxe", price: 95, duration: "90 min" },
];

const generateTimeSlots = (date: Date | undefined) => {
  if (!date) return [];
  const isSat = date.getDay() === 6;
  const endHour = isSat ? 18 : 20;
  const slots: string[] = [];
  for (let h = 9; h < endHour; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < endHour - 1 || (!isSat && h < endHour)) {
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

type Step = "service" | "datetime" | "details";

const BookingDialog = ({ children }: BookingDialogProps) => {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const service = services.find((s) => s.id === selectedService);
  const timeSlots = generateTimeSlots(selectedDate);

  const reset = () => {
    setStep("service");
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) reset();
  };

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-card p-0 overflow-hidden sm:max-w-2xl lg:max-w-3xl rounded-none">
        {/* Sidebar summary */}
        <div className="flex flex-col lg:flex-row min-h-[520px]">
          <div className="bg-muted/50 border-b lg:border-b-0 lg:border-r border-border p-6 lg:w-56 shrink-0">
            <h3 className="font-heading text-3xl text-foreground leading-none">
              Book a<br />Seat<span className="text-primary">.</span>
            </h3>
            <div className="mt-6 space-y-3">
              {service && (
                <div className="flex items-start gap-2">
                  <Scissors className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Service</p>
                    <p className="font-body text-sm text-foreground">{service.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{service.duration} · ${service.price}</p>
                  </div>
                </div>
              )}
              {selectedDate && (
                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Date & Time</p>
                    <p className="font-body text-sm text-foreground">{format(selectedDate, "EEE, MMM d")}</p>
                    {selectedTime && (
                      <p className="font-body text-xs text-muted-foreground">{selectedTime}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step indicators */}
            <div className="mt-8 flex lg:flex-col gap-2">
              {(["service", "datetime", "details"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center font-body text-xs border transition-colors",
                      step === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : (["service", "datetime", "details"].indexOf(step) > i)
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted text-muted-foreground border-border"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className="hidden lg:inline font-body text-xs text-muted-foreground capitalize">{s === "datetime" ? "Date & Time" : s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === "service" && (
                <motion.div key="service" {...stepVariants} transition={{ duration: 0.2 }}>
                  <p className="font-body text-xs tracking-[0.3em] text-primary uppercase mb-4">Select Service</p>
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
                          <span className="font-heading text-2xl text-foreground">${s.price}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === "datetime" && (
                <motion.div key="datetime" {...stepVariants} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setStep("service")} className="text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">Pick Date & Time</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Calendar */}
                    <div className="shrink-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        disabled={(date) =>
                          isSunday(date) || isBefore(startOfDay(date), startOfDay(new Date()))
                        }
                        className="p-3 pointer-events-auto border border-border"
                      />
                    </div>

                    {/* Time slots */}
                    <div className="flex-1 min-w-0">
                      {selectedDate ? (
                        <>
                          <p className="font-body text-sm text-foreground mb-3 font-medium">
                            {format(selectedDate, "EEEE, MMMM d")}
                          </p>
                          <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  "py-2.5 px-3 border font-body text-sm transition-all text-center",
                                  selectedTime === time
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-foreground hover:border-primary/50"
                                )}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="font-body text-sm text-muted-foreground">Select a date to see available times</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedTime && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                      <Button
                        variant="hero"
                        size="lg"
                        className="w-full rounded-none"
                        onClick={() => setStep("details")}
                      >
                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Contact Details */}
              {step === "details" && (
                <motion.div key="details" {...stepVariants} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep("datetime")} className="text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <p className="font-body text-xs tracking-[0.3em] text-primary uppercase">Your Details</p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Full Name</Label>
                      <Input placeholder="John Doe" className="bg-muted border-border rounded-none h-12 font-body" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Phone</Label>
                      <Input placeholder="+1 (555) 000-0000" className="bg-muted border-border rounded-none h-12 font-body" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Email (optional)</Label>
                      <Input placeholder="john@example.com" className="bg-muted border-border rounded-none h-12 font-body" />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full rounded-none">
                      Confirm Booking <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
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
