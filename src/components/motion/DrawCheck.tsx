"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { EASE_OUT, VIEWPORT } from "./tokens";

interface DrawCheckProps {
  className?: string;
  /** Position in the list, for a cascading draw. */
  index?: number;
}

/**
 * The tick marks draw themselves stroke-first instead of fading in.
 * Same geometry as the static icon, so nothing shifts.
 */
export function DrawCheck({ className, index = 0 }: DrawCheckProps) {
  const reduced = usePrefersReducedMotion();

  const path = "M3 8.4l3.2 3.2L13 4.8";

  if (reduced) {
    return (
      <svg aria-hidden viewBox="0 0 16 16" fill="none" className={cn("size-[15px]", className)}>
        <path d={path} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={cn("size-[15px]", className)}>
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{
          pathLength: { duration: 0.4, ease: EASE_OUT, delay: 0.1 + Math.min(index, 5) * 0.07 },
          opacity: { duration: 0.12, delay: 0.1 + Math.min(index, 5) * 0.07 },
        }}
      />
    </svg>
  );
}
