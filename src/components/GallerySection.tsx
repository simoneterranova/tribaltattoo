import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Barbershop interior" },
  { src: gallery2, alt: "Fresh fade haircut" },
  { src: gallery3, alt: "Barber tools" },
  { src: gallery4, alt: "Hot towel shave" },
  { src: gallery5, alt: "Beard grooming" },
  { src: gallery6, alt: "Shop exterior" },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal translation
  // 6 images, we need to scroll (6-1) * imageWidth worth of distance
  // Using percentage of the flex container
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-83%"]);

  return (
    <>
      {/* This tall div creates the scroll distance needed for the parallax */}
      <div ref={sectionRef} style={{ height: `${images.length * 100}vh` }} className="relative border-t border-border">
        {/* Sticky container that stays in view while we scroll */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Header */}
          <div className="container mx-auto px-6 mb-8" ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-end justify-between"
            >
              <div>
                <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                  Our Work
                </span>
                <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
                  Gallery<span className="text-primary">.</span>
                </h2>
              </div>
              <span className="hidden md:block font-body text-xs text-muted-foreground tracking-widest uppercase">
                Scroll ↓
              </span>
            </motion.div>
          </div>

          {/* Horizontal track */}
          <motion.div
            style={{ x }}
            className="flex gap-4 pl-6"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[3/4] overflow-hidden group relative"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GallerySection;
