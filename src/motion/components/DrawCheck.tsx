"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease, trigger as triggers } from "../config";
import { useReducedMotion } from "../useReducedMotion";
import { cn } from "@/lib/utils";

interface DrawCheckProps {
  className?: string;
  /** Position in the list, for a cascading draw. */
  index?: number;
}

const PATH = "M3 8.4l3.2 3.2L13 4.8";

/** Tick marks draw themselves stroke-first. Same geometry as a static icon,
 *  so nothing shifts when the animation is skipped. */
export function DrawCheck({ className, index = 0 }: DrawCheckProps) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || reduced) return;

      const path = svg.querySelector("path");
      if (!path) return;

      const length = path.getTotalLength();

      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.4,
          ease: ease.settle,
          delay: Math.min(index, 5) * 0.06,
          scrollTrigger: { trigger: svg, start: triggers.default, once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced, index] },
  );

  return (
    <svg ref={ref} aria-hidden viewBox="0 0 16 16" fill="none" className={cn("size-[15px]", className)}>
      <path d={PATH} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
