"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease, trigger as triggers } from "../config";
import { useReducedMotion } from "../useReducedMotion";
import { cn } from "@/lib/utils";

interface DrawRuleProps {
  className?: string;
  delay?: number;
}

/** Accent rule drawn left to right. */
export function DrawRule({ className, delay = 0 }: DrawRuleProps) {
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
          duration: 0.55,
          ease: ease.settle,
          delay,
          scrollTrigger: { trigger: el, start: triggers.default, once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced, delay] },
  );

  return <span ref={ref} aria-hidden className={cn("block h-[3px] origin-left rounded-sm", className)} />;
}
