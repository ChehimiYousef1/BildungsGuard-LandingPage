"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** Stagger position inside a grid or list. Capped so long lists never crawl. */
  index?: number;
  className?: string;
  /** Element rendered — keeps list markup semantic (<li>, <article>, …). */
  as?: "div" | "li" | "section" | "article";
}

/**
 * Scroll-in reveal: 16px rise, 0.45s, once per element.
 *
 * Reduced motion is handled twice on purpose — this hook skips the animation
 * entirely, and a CSS rule in globals.css neutralises [data-reveal] in case the
 * markup is ever served before hydration.
 */
export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: Math.min(index, 3) * 0.08,
      }}
    >
      {children}
    </MotionTag>
  );
}
