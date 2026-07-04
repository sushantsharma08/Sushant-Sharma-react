import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  scale: { scale: 0.85 },
  fade: {},
};

/**
 * Wraps any content and fades/slides it in the first time it scrolls
 * into view. Usage:
 *   <ScrollReveal direction="up" delay={0.1}><YourSection /></ScrollReveal>
 */
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
  className,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
      scale: offset.scale ?? 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
