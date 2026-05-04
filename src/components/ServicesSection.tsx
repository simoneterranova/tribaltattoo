import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Clock, Globe } from "lucide-react";
import shopConfig from "@/config/shopConfig";
import { cn } from "@/lib/utils";

const allServices = shopConfig.services;

type ServiceCategory = "tattoo" | "piercing";

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("tattoo");

  // Filter services by category
  const services = allServices.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 md:py-40 relative" ref={ref}>
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: "linear-gradient(hsl(var(--grid-pattern) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--grid-pattern) / 0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <ScrollReveal direction="up" duration={0.7}>
            <span className="font-body text-xs tracking-[0.4em] text-accent uppercase">
              {shopConfig.sections.services.label}
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              {shopConfig.sections.services.heading[0]}
              <br />
              {shopConfig.sections.services.heading[1]}<span className="text-primary">.</span>
              {/* Hidden SEO text with location keywords */}
              <span className="sr-only"> - {shopConfig.activity} a {shopConfig.city.split(",")[0].trim()}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} duration={0.7}>
            <div className="pb-1 border-2 border-accent/30 p-4 bg-card/50 backdrop-blur-sm">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
                {shopConfig.city}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent/60" />
                <span className="font-heading text-5xl text-accent leading-none">{services.length}</span>
                <div className="font-body text-xs text-muted-foreground leading-tight">
                  <p>{shopConfig.sections.services.counterLabel[0]}</p>
                  <p>{shopConfig.sections.services.counterLabel[1]}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Category Tabs - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex gap-0 border-b-2 border-accent/20 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => {
                setActiveCategory("tattoo");
                setActive(null);
              }}
              className={cn(
                "relative font-heading pb-3 md:pb-4 px-4 md:px-8 transition-all duration-300 whitespace-nowrap",
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                activeCategory === "tattoo" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Tatuaggi
              {activeCategory === "tattoo" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveCategory("piercing");
                setActive(null);
              }}
              className={cn(
                "relative font-heading pb-3 md:pb-4 px-4 md:px-8 transition-all duration-300 whitespace-nowrap",
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                activeCategory === "piercing" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Piercings
              {activeCategory === "piercing" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Services List - Animated on category change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="border-t-2 border-accent/20"
          >
            {services.map((service, i) => {
              const on = active === i;
              const isWildTattoo = service.id === "wild-tattoo";
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                  className={cn(
                    "relative overflow-hidden cursor-pointer",
                    isWildTattoo 
                      ? "border-b-[3px] border-primary/60 bg-gradient-to-r from-primary/[0.03] to-transparent" 
                      : "border-b-2 border-accent/20"
                  )}
                  onHoverStart={() => setActive(i)}
                  onHoverEnd={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                  style={isWildTattoo ? {
                    boxShadow: on 
                      ? "0 0 30px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)"
                      : "0 0 15px hsl(var(--primary) / 0.15)"
                  } : undefined}
                >
                  {/* Left-to-right sweep fill effect */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 origin-left pointer-events-none",
                      isWildTattoo 
                        ? "bg-primary/10 border-l-[4px] border-primary" 
                        : "bg-accent/5 border-l-2 border-accent/40"
                    )}
                    animate={{ scaleX: on ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  />

                  {/* Wild Tattoo special glow overlay */}
                  {isWildTattoo && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/[0.08] via-transparent to-primary/[0.08] pointer-events-none"
                      animate={{ 
                        opacity: on ? [0.3, 0.5, 0.3] : [0.1, 0.2, 0.1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  )}

                  {/* Ghost index watermark */}
                  <motion.span
                    className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2 font-heading select-none pointer-events-none leading-none pr-2",
                      isWildTattoo ? "text-primary/20" : "text-accent/10"
                    )}
                    style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
                    animate={{ opacity: on ? 0.15 : 0.05 }}
                    transition={{ duration: 0.35 }}
                  >
                    {service.index}
                  </motion.span>

                  {/* Row content */}
                  <div className="relative z-10 py-5 md:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                      {/* Name + badge */}
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className={cn(
                          "font-body text-xs tabular-nums shrink-0 w-6",
                          isWildTattoo ? "text-primary font-semibold" : "text-muted-foreground"
                        )}>
                          {service.index}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            {/* Wild Tattoo Globe Icon */}
                            {isWildTattoo && (
                              <motion.div
                                animate={{ 
                                  rotate: on ? 360 : 0,
                                  scale: on ? 1.1 : 1
                                }}
                                transition={{ 
                                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                  scale: { duration: 0.3 }
                                }}
                              >
                                <Globe className="h-6 w-6 md:h-8 md:w-8 text-primary" strokeWidth={1.5} />
                              </motion.div>
                            )}
                            <motion.h3
                              className="font-heading leading-none"
                              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
                              animate={{ 
                                color: isWildTattoo 
                                  ? "hsl(var(--primary))" 
                                  : on 
                                    ? "hsl(var(--primary))" 
                                    : "hsl(var(--foreground))" 
                              }}
                              transition={{ duration: 0.25 }}
                            >
                              {service.name}
                            </motion.h3>
                            {service.badge && (
                              <motion.span
                                className={cn(
                                  "font-body text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border-2 shrink-0",
                                  isWildTattoo 
                                    ? "border-primary text-primary bg-primary/20 font-semibold" 
                                    : "border-accent/30 text-accent bg-accent/10"
                                )}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: isWildTattoo && on ? 1.05 : 1
                                }}
                                transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                              >
                                {service.badge}
                              </motion.span>
                            )}
                          </div>
                          {/* Underline draws on hover */}
                          <motion.div
                            className={cn(
                              "h-[2px] mt-1.5",
                              isWildTattoo ? "bg-primary" : "bg-accent"
                            )}
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
                          className={cn(
                            "inline-flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase",
                            isWildTattoo ? "text-primary/70" : ""
                          )}
                          animate={{
                            color: isWildTattoo 
                              ? "hsl(var(--primary) / 0.7)"
                              : on 
                                ? "hsl(var(--foreground) / 0.6)" 
                                : "hsl(var(--muted-foreground))",
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          {isWildTattoo ? (
                            <Globe className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {service.duration}
                        </motion.span>
                        <motion.span
                          className={cn(
                            "font-heading",
                            isWildTattoo && "text-primary"
                          )}
                          style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                          animate={{
                            color: isWildTattoo 
                              ? "hsl(var(--primary))"
                              : on 
                                ? "hsl(var(--primary))" 
                                : "hsl(var(--foreground))",
                            scale: on ? 1.05 : 1,
                            textShadow: on || isWildTattoo 
                              ? "0 0 20px hsl(var(--primary) / 0.6)" 
                              : "none",
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          {service.price}
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
                          <p className={cn(
                            "font-body text-sm leading-relaxed max-w-md pt-3 pb-1 pl-10",
                            isWildTattoo ? "text-foreground/80" : "text-muted-foreground"
                          )}>
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-body text-[11px] tracking-[0.15em] text-muted-foreground/60 uppercase mt-6 text-right"
        >
          {shopConfig.sections.services.footnote}
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesSection;
