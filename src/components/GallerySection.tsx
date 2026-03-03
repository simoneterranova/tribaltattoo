import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 md:py-40 border-t border-border" ref={ref}>
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
              Our Work
            </span>
            <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
              Gallery<span className="text-primary">.</span>
            </h2>
          </div>
          <span className="hidden md:block font-body text-xs text-muted-foreground tracking-widest uppercase">
            Scroll →
          </span>
        </div>
      </div>

      {/* Horizontal scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        ref={ref}
        className="flex gap-3 overflow-x-auto hide-scrollbar px-6 pb-4 cursor-grab active:cursor-grabbing"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[300px] md:w-[400px] aspect-[3/4] overflow-hidden group"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default GallerySection;
