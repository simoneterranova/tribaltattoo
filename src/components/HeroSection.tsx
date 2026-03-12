import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import BookingDialog from "./BookingDialog";
import { useAuth } from "@/contexts/AuthContext";
import shopConfig from "@/config/shopConfig";

const HeroSection = () => {
  const { isBarber } = useAuth();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${shopConfig.hero.backgroundImage})`, y }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" 
        style={{ opacity }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            {shopConfig.city} — Est. {shopConfig.established}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] tracking-tight text-foreground"
          aria-label={`${shopConfig.hero.headline.join(" ")} at ${shopConfig.name} Barbershop in ${shopConfig.city}`}
        >
          {shopConfig.hero.headline[0]}
          <br />
          {shopConfig.hero.headline[1]}<span className="text-primary">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <p className="max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
            {shopConfig.hero.subheadline}
          </p>
          {isBarber ? (
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Dashboard <LayoutDashboard className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <BookingDialog>
              <Button variant="hero" size="lg">
                {shopConfig.hero.bookingCta} <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </BookingDialog>
          )}
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
              {shopConfig.hero.marqueeItems.join(" • ")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
