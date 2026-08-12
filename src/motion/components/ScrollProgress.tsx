"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease } from "../config";
import { useReducedMotion } from "../useReducedMotion";

/**
 * Reading-progress bar. Decorative, so it is hidden from assistive tech —
 * the scrollbar already conveys the same thing.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: ease.linear,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    },
    { dependencies: [reduced] },
  );

  if (reduced) return null;

  return (
    <span
      ref={ref}
      aria-hidden
      className="bg-teal absolute inset-x-0 bottom-0 h-[2px] origin-left"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
