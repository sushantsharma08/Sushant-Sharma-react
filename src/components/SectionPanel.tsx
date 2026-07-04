import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type SectionVariant =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact";

interface SectionPanelProps {
  id: string;
  variant: SectionVariant;
  heading?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const planeVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 18,
    y: 80,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.45, 0.64, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section panel — smooth scroll-in: plane rises into view,
 * heading pops, then content fades up.
 */
export default function SectionPanel({
  id,
  variant,
  heading,
  lead,
  children,
  className = "",
  contentClassName = "",
}: SectionPanelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`section-plane section-plane--${variant} ${className}`.trim()}
      style={{
        transformPerspective: 1400,
        transformOrigin: "50% 100%",
      }}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "-40px 0px" }}
      variants={planeVariants}
    >
      {heading && (
        <motion.header className="section-plane__header" variants={headingVariants}>
          <h2 className="section-plane__heading">{heading}</h2>
          {lead && <p className="section-plane__lead">{lead}</p>}
        </motion.header>
      )}

      <motion.div
        className={`section-plane__content ${contentClassName}`.trim()}
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
