"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Reading-progress bar pinned under the navbar. Decorative, so it is hidden
 * from assistive tech — the same information is in the scrollbar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <motion.span
      aria-hidden
      className="bg-teal absolute inset-x-0 bottom-0 h-[2px] origin-left"
      style={{ scaleX: width }}
    />
  );
}
