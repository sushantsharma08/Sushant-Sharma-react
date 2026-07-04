import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /** Pixels of vertical drift across the section's time in view. Higher = more movement. */
  speed?: number;
  className?: string;
}

/**
 * Wraps a section so it drifts vertically and fades in/out as it moves
 * through the viewport — a continuous, scroll-linked effect, unlike
 * ScrollReveal which only plays once on first entry.
 *
 * Usage: <Parallax speed={50}><YourSection /></Parallax>
 */
const Parallax = ({ children, speed = 50, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={`parallax-section ${className ?? ""}`} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
