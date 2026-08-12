"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, popIn, springUp, staggerParent, VIEWPORT } from "./tokens";

type Tag = "div" | "ul" | "ol" | "section";
type ItemTag = "div" | "li" | "article" | "figure";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Gap between children, in seconds. */
  stagger?: number;
  delayChildren?: number;
}

/** Parent that releases its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delayChildren = 0,
}: StaggerProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
  /** "rise" eases up, "pop" scales in, "spring" overshoots and settles. */
  effect?: "rise" | "pop" | "spring";
  variants?: Variants;
}

export function StaggerItem({
  children,
  className,
  as = "div",
  effect = "rise",
  variants,
}: StaggerItemProps) {
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
      variants={variants ?? (effect === "pop" ? popIn : effect === "spring" ? springUp : fadeUp)}
    >
      {children}
    </MotionTag>
  );
}
