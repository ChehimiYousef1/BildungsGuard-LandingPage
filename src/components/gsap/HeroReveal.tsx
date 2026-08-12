"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroReveal({ children, className }: HeroRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = rootRef.current;

      if (!element || prefersReducedMotion) {
        return;
      }

      gsap.fromTo(
        element,
        {
          clipPath: "inset(0 0 100% 0 round 18px)",
          y: 24,
          scale: 0.97,
          rotate: 1.25,
        },
        {
          clipPath: "inset(0 0 0% 0 round 18px)",
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.68,
          delay: 0.12,
          ease: "power3.out",
        },
      );
    },
    {
      scope: rootRef,
      dependencies: [prefersReducedMotion],
    },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
