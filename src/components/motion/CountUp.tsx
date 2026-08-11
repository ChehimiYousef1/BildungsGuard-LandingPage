"use client";

import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  /** Final value as written in the content, e.g. "318" or "94 %". */
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
 * Counts to the value the first time it scrolls into view. Falls back to the
 * plain string for non-numeric content and for reduced motion, so the number
 * is always correct even when nothing animates.
 */
export function CountUp({ value, className, duration = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  // Memoised: a fresh object every render would restart the effect,
  // leaving several rAF loops racing each other.
  const parsed = useMemo(() => parse(value), [value]);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduced || !parsed) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, gentle landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.round(parsed.target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, parsed, duration]);

  if (!parsed || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const shown = current ?? 0;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {shown}
      {parsed.suffix}
    </span>
  );
}
