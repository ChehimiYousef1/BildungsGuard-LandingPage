"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT, staggerParent, VIEWPORT } from "./tokens";

/**
 * Cards arrive slightly scattered and settle into the grid — loose paper
 * becoming one ordered record. Rotation is tiny so nothing looks broken
 * mid-flight on a slow device.
 */
export function Assemble({
  children,
  className,
  as = "ul",
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "div";
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

const settle = (tilt: number): Variants => ({
  hidden: { opacity: 0, y: 26, rotate: tilt, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
});

export function AssembleItem({
  children,
  className,
  as = "li",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
  index?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const tilt = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4][index % 6];
  const MotionTag = motion[as];

  return (
    <MotionTag data-reveal className={className} variants={settle(tilt)}>
      {children}
    </MotionTag>
  );
}
