import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import CardStack from "./CardStack";
import shopConfig from "@/config/shopConfig";

// Import design images from assets
import design1 from "@/assets/tattoo-10.webp";
import design2 from "@/assets/tattoo-11.webp";
import design3 from "@/assets/tattoo-12.webp";
import design4 from "@/assets/tattoo-7.webp";
import design5 from "@/assets/tattoo-8.webp";
import design6 from "@/assets/tattoo-9.webp";
import design7 from "@/assets/tattoo-1.webp";
import design8 from "@/assets/tattoo-2.webp";

// Card stack images
const designImages = [design1, design2, design3, design4, design5, design6, design7, design8];

const DisegniSection = () => {
  const { label, heading } = shopConfig.sections.disegni;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldRenderCards, setShouldRenderCards] = useState(false);

  // Intersection observer to trigger animation when section becomes visible
  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldRenderCards) {
            setShouldRenderCards(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: "0px 0px -50px 0px", // Small offset to trigger slightly before section is fully visible
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [shouldRenderCards]);

  return (
    <section
      ref={sectionRef}
      id="disegni"
      className="py-24 md:py-40 border-t-2 border-accent/20 relative overflow-hidden"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--grid-pattern) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--grid-pattern) / 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 mb-16 md:mb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <ScrollReveal direction="up" duration={0.7}>
            <span className="font-body text-xs tracking-[0.4em] text-accent uppercase">
              {label}
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              {Array.isArray(heading) ? (
                <>
                  {heading[0]}
                  <br />
                  {heading[1]}
                  <span className="text-primary">.</span>
                </>
              ) : (
                <>
                  {heading}
                  <span className="text-primary">.</span>
                </>
              )}
              {/* Hidden SEO text */}
              <span className="sr-only"> - Disegni tribali originali a {shopConfig.city.split(",")[0].trim()}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} duration={0.7}>
            <div className="pb-1 border-2 border-accent/30 p-4 bg-card/50 backdrop-blur-sm">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-2">
                {shopConfig.city}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent/60" />
                <span className="font-heading text-5xl text-accent leading-none">{designImages.length}</span>
                <div className="font-body text-xs text-muted-foreground leading-tight">
                  <p>Disegni</p>
                  <p>Unici</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Interactive Card Stack */}
      <div className="relative z-10 w-full">
        {shouldRenderCards && (
          <CardStack
            cardList={designImages}
            autoSwipe={true}
            autoSwipeInterval={3000}
            horizontalDrag={true}
            verticalDrag={false}
          />
        )}
      </div>
    </section>
  );
};

export default DisegniSection;
