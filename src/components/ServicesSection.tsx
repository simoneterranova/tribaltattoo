import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { name: "Signature Haircut", price: "45", description: "Consultation, wash, precision cut and style." },
  { name: "Beard Trim & Shape", price: "30", description: "Expert sculpting to define your look." },
  { name: "Hot Towel Shave", price: "40", description: "Straight-razor shave with warm lather." },
  { name: "Cut + Beard Combo", price: "65", description: "Our signature cut with full beard grooming." },
  { name: "The Deluxe", price: "95", description: "Cut, shave, facial, and scalp massage." },
  { name: "Kids Cut", price: "25", description: "Patient cuts for gentlemen under 12." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-40" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              Services
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              What We<br />Offer<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-muted-foreground leading-relaxed">
            Every service includes a consultation and our signature attention to detail.
          </p>
        </div>

        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border cursor-default hover:bg-muted/30 transition-colors px-2 -mx-2"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-body text-xs text-muted-foreground tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
              </div>
              <div className="flex items-center gap-8 mt-2 sm:mt-0 pl-10 sm:pl-0">
                <span className="font-body text-xs text-muted-foreground max-w-[200px] hidden md:block">
                  {service.description}
                </span>
                <span className="font-heading text-3xl text-foreground">
                  ${service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
