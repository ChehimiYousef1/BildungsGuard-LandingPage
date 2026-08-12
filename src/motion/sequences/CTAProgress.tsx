"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "../gsap";

import { useReducedMotion } from "../useReducedMotion";
import { ease } from "../config";
import { colorTokens } from "../tokens";

interface CTAProgressProps {
  children: ReactNode;
}

/**
 * COMPLETION — the closing band finishes the journey the hero started.
 * The four-dot progress row fills, the last node lands with a single
 * confirmation pulse, then everything stops.
 */
export function CTAProgress({ children }: CTAProgressProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const dots = gsap.utils.toArray<HTMLElement>("[data-cta-dot]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-cta-bar]", root);
      const t = colorTokens();

      if (prefersReducedMotion) {
        gsap.set(bars, { scaleX: 1 });
        gsap.set(dots, { scale: 1, backgroundColor: t.teal });
        return;
      }

      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dots, { scale: 0.55 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 76%", once: true },
      });

      dots.forEach((dot, i) => {
        tl.to(dot, { scale: 1, duration: 0.22, ease: ease.pop }, i * 0.16);
        if (bars[i]) {
          tl.to(bars[i], { scaleX: 1, duration: 0.22, ease: ease.settle }, i * 0.16 + 0.12);
        }
      });

      // One confirmation pulse on the final node, then rest.
      const last = dots[dots.length - 1];
      if (last) {
        tl.to(last, { scale: 1.35, duration: 0.22, ease: ease.settle }).to(last, {
          scale: 1,
          duration: 0.222,
          ease: ease.pop,
        });
      }
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return <div ref={rootRef}>{children}</div>;
}
