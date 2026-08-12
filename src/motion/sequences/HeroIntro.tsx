"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../gsap";
import { ease, stagger } from "../config";
import { useReducedMotion } from "../useReducedMotion";

/**
 * Hero entrance. Runs on load rather than on scroll, and deliberately
 * excludes the <h1>: that is the LCP element, and fading it in would push the
 * largest paint later for every visitor.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-hero-item]", root),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: ease.out, stagger: stagger.loose, delay: 0.12 },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface HeroItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "p";
}

export function HeroItem({ children, className, as: Tag = "div" }: HeroItemProps) {
  return (
    <Tag data-hero-item className={className}>
      {children}
    </Tag>
  );
}

/** The dashboard preview drifts in from the right, once, on load. */
export function HeroAside({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      gsap.fromTo(el, { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.7, ease: ease.out, delay: 0.2 });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
