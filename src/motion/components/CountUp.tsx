"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../gsap";
import { trigger as triggers } from "../config";
import { useReducedMotion } from "../useReducedMotion";

interface CountUpProps {
  /** Final value exactly as written in the content, e.g. "318" or "94 %". */
  value: string;
  className?: string;
  duration?: number;
}

/** Splits "94 %" into 94 and " %" so the suffix is never animated. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const numeric = Number(match[2].replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;
  return { prefix: match[1], target: numeric, suffix: match[3] };
}

/**
 * Counts to the value the first time it scrolls into view. Non-numeric
 * content and reduced motion both fall back to the plain string, so the
 * number on screen is always correct even when nothing animates.
 */
export function CountUp({ value, className, duration = 1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  // Memoised: a fresh object each render would restart the tween and leave
  // several counters racing each other.
  const parsed = useMemo(() => parse(value), [value]);
  const [shown, setShown] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !parsed) return;

      const counter = { n: 0 };

      gsap.to(counter, {
        n: parsed.target,
        duration,
        ease: "power2.out",
        onUpdate: () => setShown(Math.round(counter.n)),
        scrollTrigger: { trigger: el, start: triggers.late, once: true },
      });
    },
    { scope: ref, dependencies: [reduced, parsed, duration] },
  );

  if (!parsed || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {shown}
      {parsed.suffix}
    </span>
  );
}
