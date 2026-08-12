"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../gsap";
import { stagger as staggers, trigger as triggers } from "../config";
import { presets, type PresetName } from "../presets";
import { useReducedMotion } from "../useReducedMotion";

type Tag = "div" | "ul" | "ol" | "section";

export interface MotionGroupProps {
  children: ReactNode;
  /** Applied to every child marked with `data-motion-item`. */
  preset?: PresetName;
  className?: string;
  as?: Tag;
  gap?: keyof typeof staggers;
  start?: keyof typeof triggers;
  /** "start" fires all children off one trigger; "each" gives each its own. */
  mode?: "start" | "each";
}

/**
 * Sequences a set of children off one scroll trigger — grids, card rows,
 * checklists. Children opt in with the `data-motion-item` attribute, so the
 * group does not need to clone or wrap them.
 */
export function MotionGroup({
  children,
  preset = "rise",
  className,
  as: Tag = "div",
  gap = "base",
  start = "default",
  mode = "start",
}: MotionGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-motion-item]", root);
      if (!items.length) return;

      const { from, to } = presets[preset];

      if (mode === "each") {
        items.forEach((item, i) => {
          gsap.fromTo(item, from, {
            ...to,
            delay: i * staggers[gap],
            scrollTrigger: { trigger: item, start: triggers[start], once: true },
          });
        });
        return;
      }

      gsap.fromTo(items, from, {
        ...to,
        stagger: staggers[gap],
        scrollTrigger: { trigger: root, start: triggers[start], once: true },
      });
    },
    { scope: ref, dependencies: [reduced, preset, gap, start, mode] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
