"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE, motionTokens } from "./tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProcessTimelineProps {
  children: ReactNode;
}

/**
 * TRAVELLING NODE — the four steps are a journey, so a marker actually
 * travels the rail left to right, lighting each card as it arrives.
 * Left-to-right matches both the reading order and the process order.
 */
export function ProcessTimeline({ children }: ProcessTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const rail = railRef.current;
      const marker = markerRef.current;
      if (!root || !rail || !marker) return;

      const steps = gsap.utils.toArray<HTMLElement>("[data-step-card]", root);
      const t = motionTokens();

      if (prefersReducedMotion) {
        gsap.set(rail, { scaleX: 1 });
        gsap.set(steps, { opacity: 1, y: 0 });
        gsap.set(marker, { opacity: 0 });
        return;
      }

      gsap.set(rail, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(steps, { opacity: 0, y: 22 });
      gsap.set(marker, { opacity: 0, left: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });

      tl.to(marker, { opacity: 1, duration: 0.2, ease: EASE.settle })
        .to(rail, { scaleX: 1, duration: 0.7, ease: EASE.settle }, "<")
        .to(marker, { left: "100%", duration: 0.7, ease: EASE.settle }, "<");

      steps.forEach((step, i) => {
        tl.to(step, { opacity: 1, y: 0, duration: 0.3, ease: EASE.out }, 0.18 + i * 0.16);

        const badge = step.querySelector("[data-step-badge]");
        if (badge) {
          tl.fromTo(
            badge,
            { scale: 0.8, backgroundColor: t.line },
            { scale: 1, backgroundColor: t.blue, duration: 0.24, ease: EASE.pop },
            0.18 + i * 0.16,
          );
        }
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={rootRef} className="relative">
      <div aria-hidden className="relative mb-8 hidden h-px lg:block">
        <div className="bg-line absolute inset-0" />
        <div ref={railRef} className="bg-teal absolute inset-0 origin-left" />
        <div
          ref={markerRef}
          className="bg-teal absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>

      {children}
    </div>
  );
}
