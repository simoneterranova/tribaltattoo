import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import shopConfig from "@/config/shopConfig";

const testimonials = shopConfig.testimonials;

// Duplicate for seamless infinite loop
const doubled = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-40 border-t border-border overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <ScrollReveal direction="up" duration={0.7}>
          <div className="mb-16">
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              Reviews
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              Words<span className="text-primary">.</span>
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-width scrolling track — no container constraint */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex marquee-track w-max">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[380px] mx-3 shrink-0 border border-border bg-background p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-6 w-6 text-primary/30 mb-6" />
                <p className="font-body text-base leading-relaxed text-secondary-foreground">
                  {t.text}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-heading text-lg text-foreground">{t.name}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
