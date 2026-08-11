"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp } from "./tokens";

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

/**
 * Card that lifts slightly on hover. Pointer-only: touch devices get the
 * reveal without a stuck hover state.
 */
export function HoverLift({ children, className, as = "div" }: HoverLiftProps) {
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
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {children}
    </MotionTag>
  );
}
