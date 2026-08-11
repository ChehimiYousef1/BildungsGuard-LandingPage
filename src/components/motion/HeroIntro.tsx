"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE, staggerParent } from "./tokens";

/**
 * Hero entrance. Runs on load rather than on scroll, and deliberately excludes
 * the <h1>: that is the LCP element, and fading it in would push the largest
 * paint later for every visitor.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerParent(0.09, 0.15)} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

interface HeroItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "p";
}

export function HeroItem({ children, className, as = "div" }: HeroItemProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** The dashboard preview drifts in from the right, once, on load. */
export function HeroAside({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
