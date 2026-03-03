import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Barbershop interior", label: "Interior" },
  { src: gallery2, alt: "Fresh fade haircut", label: "Fades" },
  { src: gallery3, alt: "Barber tools", label: "Tools" },
  { src: gallery4, alt: "Hot towel shave", label: "Shaves" },
  { src: gallery5, alt: "Beard grooming", label: "Grooming" },
  { src: gallery6, alt: "Shop exterior", label: "Exterior" },
];

const GalleryImage = ({
  img,
  index,
  scrollYProgress,
}: {
  img: { src: string; alt: string; label: string };
  index: number;
  scrollYProgress: any;
}) => {
  // All images reveal quickly with a tiny stagger
  const delay = index * 0.02;
  const start = 0.01 + delay;
  const mid = start + 0.06;

  const scale = useTransform(scrollYProgress, [start, mid, 1], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [start, mid, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [start, mid, 1], [30, 0, 0]);
  const rotate = useTransform(scrollYProgress, [start, mid, 1], [1.5, 0, 0]);
  const clipTop = useTransform(scrollYProgress, [start, mid], [100, 0]);

  return (
    <motion.div
      style={{ scale, opacity, y, rotate }}
      className="flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[3/4] overflow-hidden group relative"
    >
      {/* Clip-path reveal mask */}
      <motion.div
        style={{
          clipPath: useTransform(clipTop, (v) => `inset(${v}% 0 0 0)`),
        }}
        className="h-full w-full"
      >
        <img
          src={img.src}
          alt={img.alt}
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

      {/* Image label */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent"
      >
        <span className="font-body text-xs tracking-[0.3em] text-primary uppercase">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="font-heading text-lg text-foreground mt-1">{img.label}</p>
      </motion.div>
    </motion.div>
  );
};

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translation driven by scroll
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-83%"]);

  // Header animation driven by scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${images.length * 100}vh` }}
      className="relative border-t border-border"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="container mx-auto px-6 mb-8" ref={headerRef}>
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
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
        <motion.div style={{ x }} className="flex gap-4 pl-6">
          {images.map((img, i) => (
            <GalleryImage
              key={i}
              img={img}
              index={i}
              scrollYProgress={scrollYProgress}
            />
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

export default GallerySection;
