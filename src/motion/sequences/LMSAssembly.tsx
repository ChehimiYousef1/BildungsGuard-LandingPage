"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "../gsap";

import { useReducedMotion } from "../useReducedMotion";
import { ease } from "../config";

interface LMSAssemblyProps {
  children: ReactNode;
}

/**
 * CONVERGENCE — separate capabilities become one platform.
 *
 * Rows arrive from opposite corners along a slight curve, the connecting
 * spine draws between them, and everything settles. Runs once: the story is
 * "scattered -> connected -> stable", so it must not keep moving.
 */
export function LMSAssembly({ children }: LMSAssemblyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const spine = spineRef.current;
      if (!root || !spine) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-lms-row]", root);
      const length = spine.getTotalLength();

      if (prefersReducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(spine, { strokeDasharray: "none", strokeDashoffset: 0, opacity: 1 });
        return;
      }

      gsap.set(spine, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });

      // Diagonal entry: odd rows from bottom-left, even rows from bottom-right,
      // so the pair visibly converges on the centre line between them.
      rows.forEach((row, i) => {
        const fromLeft = i % 2 === 0;

        gsap.set(row, {
          opacity: 0,
          x: fromLeft ? -46 : 46,
          y: 34,
          scale: 0.975,
        });

        gsap.to(row, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: ease.out,
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
      });

      gsap.to(spine, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: ease.settle,
        scrollTrigger: { trigger: root, start: "top 62%", once: true },
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={rootRef} className="relative">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          ref={spineRef}
          d="M 12 4 C 52 26, 48 62, 88 96"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="0.22"
          strokeLinecap="round"
          opacity="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}
