import { ReactNode, useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = "",
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial: Variant = {
    opacity: 0,
    ...directionOffset[direction],
  };

  const animate: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
