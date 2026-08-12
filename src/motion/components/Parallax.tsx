"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease } from "../config";
import { useReducedMotion } from "../useReducedMotion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total travel across the element's time on screen. Keep it small. */
  distance?: number;
}

/**
 * Depth on scroll: the element drifts slightly slower than the page.
 * Scrubbed, so it tracks the scrollbar exactly rather than easing behind it.
 */
export function Parallax({ children, className, distance = 28 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      gsap.fromTo(
        el.firstElementChild,
        { y: distance / 2 },
        {
          y: -distance / 2,
          ease: ease.linear,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, distance] },
  );

  return (
    <div ref={ref} className={className}>
      <div>{children}</div>
    </div>
  );
}
