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

const GalleryImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.92, rotateZ: index % 2 === 0 ? -2 : 2 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateZ: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="overflow-hidden group relative"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />
      </div>
      {/* Reveal overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.77, 0, 0.18, 1] }}
        className="absolute inset-0 bg-primary origin-bottom"
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
};

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Horizontal scroll driven by vertical scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-40%"]);

  return (
    <section id="gallery" className="py-24 md:py-40 border-t border-border overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 mb-16" ref={headerRef}>
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

      {/* Scroll-driven horizontal gallery */}
      <motion.div style={{ x }} className="flex gap-4 px-6 pb-4">
        {images.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] md:w-[380px]">
            <GalleryImage src={img.src} alt={img.alt} index={i} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default GallerySection;
