"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease, trigger as triggers } from "../config";
import { useReducedMotion } from "../useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Kept so an aria-labelledby on the parent section still resolves. */
  id?: string;
  stagger?: number;
}

/**
 * Word-by-word reveal. The element keeps an aria-label with the full string,
 * so screen readers and copy-paste get one sentence rather than scattered
 * words — only the visual layer is split.
 */
export function SplitText({ text, className, as: Tag = "h2", id, stagger = 0.03 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const words = el.querySelectorAll("[data-word]");

      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: ease.out,
          stagger,
          scrollTrigger: { trigger: el, start: triggers.default, once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced, text, stagger] },
  );

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} id={id} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {word}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </Tag>
  );
}
