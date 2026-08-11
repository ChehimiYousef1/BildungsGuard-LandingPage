"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

interface DrawRuleProps {
  className?: string;
  delay?: number;
}

/** The accent rule above each pillar, drawn left to right. */
export function DrawRule({ className, delay = 0 }: DrawRuleProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <span aria-hidden className={cn("block h-[3px] rounded-sm", className)} />;
  }

  return (
    <motion.span
      aria-hidden
      className={cn("block h-[3px] origin-left rounded-sm", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE_OUT, delay }}
    />
  );
}
