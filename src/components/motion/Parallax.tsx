"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the element's time on screen. Keep it small. */
  distance?: number;
}

/**
 * Depth on scroll: the element drifts slightly slower than the page.
 * Distance is deliberately small — enough to read as depth, never enough to
 * break the alignment of the Figma layout.
 */
export function Parallax({ children, className, distance = 36 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 120, damping: 24, restDelta: 0.5 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
