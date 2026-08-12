"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../gsap";
import { duration as durations, trigger as triggers } from "../config";
import { presets, type PresetName } from "../presets";
import { useReducedMotion } from "../useReducedMotion";

type Tag = "div" | "li" | "section" | "article" | "figure" | "p" | "span";

export interface MotionProps {
  children: ReactNode;
  /** Which movement, by name. See src/motion/presets.ts for the vocabulary. */
  preset?: PresetName;
  className?: string;
  as?: Tag;
  /** Position in a sequence — adds a small delay. Capped so lists never crawl. */
  index?: number;
  /** Scroll position that starts the animation. */
  start?: keyof typeof triggers;
  /** Override the preset duration when a specific moment needs it. */
  duration?: keyof typeof durations;
  delay?: number;
}

/**
 * The declarative entry point. One component, one preset name:
 *
 *   <Motion preset="rise">…</Motion>
 *   <Motion preset="enterLeft" index={1}>…</Motion>
 *
 * Runs once per element and settles — nothing here loops.
 */
export function Motion({
  children,
  preset = "rise",
  className,
  as: Tag = "div",
  index = 0,
  start = "default",
  duration,
  delay = 0,
}: MotionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const { from, to } = presets[preset];

      gsap.fromTo(el, from, {
        ...to,
        ...(duration ? { duration: durations[duration] } : null),
        delay: delay + Math.min(index, 4) * 0.06,
        scrollTrigger: { trigger: el, start: triggers[start], once: true },
      });
    },
    { scope: ref, dependencies: [reduced, preset, index, start, duration, delay] },
  );

  return (
    <Tag ref={ref as never} className={className} data-motion={preset}>
      {children}
    </Tag>
  );
}
