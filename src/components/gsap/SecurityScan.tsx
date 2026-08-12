"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE, motionTokens } from "./tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SecurityScanProps {
  children: ReactNode;
}

/**
 * SCAN AND VERIFY — a line passes down the security claims once, and each
 * claim flips from pending to verified as it is crossed. Executes a single
 * time and settles; a looping scanner would read as decoration, not proof.
 */
export function SecurityScan({ children }: SecurityScanProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const beam = beamRef.current;
      if (!root || !beam) return;

      const marks = gsap.utils.toArray<HTMLElement>("[data-scan-mark]", root);
      const t = motionTokens();

      if (prefersReducedMotion) {
        gsap.set(beam, { opacity: 0 });
        gsap.set(marks, { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(beam, { opacity: 0, top: "0%" });
      gsap.set(marks, { scale: 0.7, opacity: 0.45 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 68%", once: true },
      });

      tl.to(beam, { opacity: 1, duration: 0.18 })
        .to(beam, { top: "100%", duration: 0.8, ease: EASE.linear })
        .to(beam, { opacity: 0, duration: 0.3 }, "-=0.15");

      // Each mark verifies as the beam reaches its row.
      marks.forEach((mark, i) => {
        tl.to(
          mark,
          {
            scale: 1,
            opacity: 1,
            backgroundColor: t.teal,
            color: t.white,
            duration: 0.24,
            ease: EASE.pop,
          },
          0.28 + i * 0.18,
        );
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={beamRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-10 h-px opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-teal) 20%, var(--color-teal) 80%, transparent)",
        }}
      />
      {children}
    </div>
  );
}
