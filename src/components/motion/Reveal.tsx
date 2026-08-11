"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE, VIEWPORT } from "./tokens";

type Tag = "div" | "li" | "section" | "article" | "figure";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  index?: number;
  /** Direction the element travels from. */
  from?: "bottom" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

/**
 * Baseline entrance: fade plus a short travel, once per element.
 * Every component in this folder skips animation entirely under
 * prefers-reduced-motion — never a shortened version.
 */
export function Reveal({
  children,
  className,
  as = "div",
  index = 0,
  from = "bottom",
  distance = 16,
  duration = DURATION.base,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const offset =
    from === "bottom"
      ? { y: distance }
      : from === "left"
        ? { x: -distance }
        : from === "right"
          ? { x: distance }
          : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: EASE, delay: Math.min(index, 3) * 0.08 },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}
