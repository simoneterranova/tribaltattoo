import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Michael T.",
    text: "Best barbershop in the city, hands down. Marcus always nails my fade and the atmosphere is unmatched.",
  },
  {
    name: "David L.",
    text: "The Deluxe Experience is worth every penny. I walked out feeling like a new man. Already booked my next visit.",
  },
  {
    name: "Chris P.",
    text: "Clean shop, skilled barbers, and they actually listen to what you want. Two years and counting.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 md:py-40 border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            Reviews
          </span>
          <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
            Reviews<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid gap-px md:grid-cols-3 bg-border">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-background p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-6 w-6 text-primary/30 mb-6" />
                <p className="font-body text-base leading-relaxed text-secondary-foreground">
                  {t.text}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-heading text-lg text-foreground">
                  {t.name}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
