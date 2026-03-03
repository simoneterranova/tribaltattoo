import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import BookingDialog from "./BookingDialog";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            Brooklyn, NY — Est. 2018
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] tracking-tight text-foreground"
        >
          Precision
          <br />
          Cuts<span className="text-primary">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <p className="max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
            Where craftsmanship meets confidence. Premium grooming
            for the modern man who demands nothing less.
          </p>
          <BookingDialog>
            <Button variant="hero" size="lg">
              Book Your Seat <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </BookingDialog>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/60 backdrop-blur-sm overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-heading text-sm tracking-[0.3em] text-muted-foreground/40 uppercase"
            >
              Haircuts • Fades • Beard Grooming • Hot Towel Shave • Styling
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
