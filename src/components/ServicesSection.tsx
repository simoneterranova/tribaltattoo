import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Clock } from "lucide-react";
import shopConfig from "@/config/shopConfig";
// ArrowUpRight used in header CTA only

const services = shopConfig.services;

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-40" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <ScrollReveal direction="up" duration={0.7}>
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              Services
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              What We
              <br />
              Offer<span className="text-primary">.</span>
              {/* Hidden SEO text with location keywords */}
              <span className="sr-only"> — Barbershop Services in {shopConfig.city}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} duration={0.7}>
            <div className="pb-1">
              <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                {shopConfig.city}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary/60" />
                <span className="font-heading text-5xl text-foreground leading-none">{services.length}</span>
                <div className="font-body text-xs text-muted-foreground leading-tight">
                  <p>Signature</p>
                  <p>Services</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Rows */}
        <div className="border-t border-border">
          {services.map((service, i) => {
            const on = active === i;
            return (
              <motion.div
                key={service.name}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative border-b border-border overflow-hidden cursor-pointer"
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Left-to-right sweep fill */}
                <motion.div
                  className="absolute inset-0 bg-muted/40 origin-left pointer-events-none"
                  animate={{ scaleX: on ? 1 : 0 }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                />

                {/* Ghost index watermark */}
                <motion.span
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-heading select-none pointer-events-none leading-none pr-2"
                  style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
                  animate={{ opacity: on ? 0.07 : 0.025 }}
                  transition={{ duration: 0.35 }}
                >
                  {service.index}
                </motion.span>

                {/* Row content */}
                <div className="relative z-10 py-5 md:py-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    {/* Name + badge */}
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-body text-xs text-muted-foreground tabular-nums shrink-0 w-6">
                        {service.index}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <motion.h3
                            className="font-heading leading-none"
                            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
                            animate={{ color: on ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
                            transition={{ duration: 0.25 }}
                          >
                            {service.name}
                          </motion.h3>
                          {service.badge && (
                            <motion.span
                              className="font-body text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-primary/30 text-primary bg-primary/5 shrink-0"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                            >
                              {service.badge}
                            </motion.span>
                          )}
                        </div>
                        {/* Underline draws on hover */}
                        <motion.div
                          className="h-px bg-primary mt-1.5"
                          animate={{ scaleX: on ? 1 : 0 }}
                          initial={{ scaleX: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          style={{ width: "100%", transformOrigin: "left" }}
                        />
                      </div>
                    </div>

                    {/* Duration + price */}
                    <div className="flex items-center gap-5 pl-10 sm:pl-0 shrink-0">
                      <motion.span
                        className="inline-flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase"
                        animate={{
                          color: on ? "hsl(var(--foreground) / 0.6)" : "hsl(var(--muted-foreground))",
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </motion.span>
                      <motion.span
                        className="font-heading"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                        animate={{
                          color: on ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                          scale: on ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        € {service.price}
                      </motion.span>
                    </div>
                  </div>

                  {/* Expandable: description */}
                  <AnimatePresence>
                    {on && (
                      <motion.div
                        key="expand"
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md pt-3 pb-1 pl-10">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-body text-[11px] tracking-[0.15em] text-muted-foreground/60 uppercase mt-6 text-right"
        >
          All services include consultation · Prices may vary based on length &amp; complexity
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesSection;
