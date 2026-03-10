import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import shopConfig from "@/config/shopConfig";

const images = shopConfig.gallery;

const GalleryImage = ({
  img,
  index,
}: {
  img: { src: string; alt: string; label: string };
  index: number;
}) => {
  const containerVariants = {
    initial: {},
    hover: {
      y: -12,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const}
    }
  };

  const imageVariants = {
    initial: {},
    hover: {
      scale: 1.08,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    initial: { backgroundColor: "rgba(212, 175, 55, 0)" },
    hover: { 
      backgroundColor: "rgba(212, 175, 55, 0.08)",
      transition: { duration: 0.4 }
    }
  };

  const labelVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[3/4] max-h-[65vh] overflow-hidden relative rounded-sm cursor-pointer"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        className="h-full w-full object-cover grayscale"
        loading={index === 0 ? "eager" : "lazy"}
        variants={imageVariants}
        style={{ 
          filter: "grayscale(100%)",
        }}
        whileHover={{ 
          filter: "grayscale(0%)",
          transition: { duration: 0.6 }
        }}
      />

      {/* Hover overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={overlayVariants}
      />

      {/* Image label */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"
      >
        <motion.span 
          className="font-body text-xs tracking-[0.3em] text-primary uppercase inline-block"
          variants={labelVariants}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <motion.p 
          className="font-heading text-lg text-foreground mt-1"
          variants={labelVariants}
        >
          {img.label}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const MobileGalleryCard = ({
  img,
  index,
}: {
  img: { src: string; alt: string; label: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(index === 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[80vw] aspect-[3/4] snap-center overflow-hidden relative rounded-sm"
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.93 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <span className="font-body text-xs tracking-[0.3em] text-primary uppercase inline-block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="font-heading text-lg text-foreground mt-1">{img.label}</p>
      </motion.div>
    </motion.div>
  );
};

const MobileGallery = () => {
  return (
    <section id="gallery" className="border-t border-border py-20 px-6">
      {/* Header */}
      <ScrollReveal direction="up" duration={0.7}>
        <div className="mb-8">
          <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
            Our Work
          </span>
          <h2 className="font-heading text-6xl text-foreground mt-2 leading-none">
            Gallery<span className="text-primary">.</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Swipeable snap carousel */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, i) => (
          <MobileGalleryCard key={i} img={img} index={i} />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mt-4 text-center">
        Swipe →
      </p>
    </section>
  );
};

const DesktopGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-83%"]);
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <div
      id="gallery"
      ref={sectionRef}
      style={{ height: `${images.length * 150}vh` }}
      className="relative border-t border-border"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start pt-28">
        {/* Header */}
        <div className="container mx-auto px-6 mb-6" ref={headerRef}>
          <ScrollReveal direction="up" duration={0.7}>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-body text-xs tracking-[0.4em] text-primary uppercase">
                  Our Work
                </span>
                <h2 className="font-heading text-6xl md:text-8xl text-foreground mt-2 leading-none">
                  Gallery<span className="text-primary">.</span>
                </h2>
              </div>
              <span className="font-body text-xs text-muted-foreground tracking-widest uppercase">
                Scroll ↓
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex gap-4 pl-6">
          {images.map((img, i) => (
            <GalleryImage key={i} img={img} index={i} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="container mx-auto px-6 mt-8">
          <div className="h-[1px] bg-border relative">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGallery /> : <DesktopGallery />;
};

export default GallerySection;
