"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AuditJourneyProps {
  children: ReactNode;
}

export function AuditJourney({ children }: AuditJourneyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const progress = progressRef.current;

      if (!root || !progress) {
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>(
        "[data-audit-step]",
        root,
      );

      const nodes = gsap.utils.toArray<HTMLElement>(
        "[data-audit-node]",
        root,
      );

      if (prefersReducedMotion) {
        gsap.set(progress, {
          scaleY: 1,
        });

        gsap.set(nodes, {
          backgroundColor: "currentColor",
          borderColor: "currentColor",
          scale: 1,
        });

        return;
      }

      gsap.set(progress, {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.set(nodes, {
        scale: 0.75,
      });

      gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });

      steps.forEach((step, index) => {
        const node = nodes[index];

        if (!node) {
          return;
        }

        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          end: "bottom 40%",

          onEnter: () => {
            gsap.to(node, {
              scale: 1.15,
              backgroundColor: "#0f766e",
              borderColor: "#0f766e",
              duration: 0.3,
              ease: "power2.out",
            });
          },

          onEnterBack: () => {
            gsap.to(node, {
              scale: 1.15,
              backgroundColor: "#0f766e",
              borderColor: "#0f766e",
              duration: 0.3,
              ease: "power2.out",
            });
          },

          onLeaveBack: () => {
            gsap.to(node, {
              scale: 0.75,
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              duration: 0.25,
              ease: "power2.out",
            });
          },
        });
      });
    },
    {
      scope: rootRef,
      dependencies: [prefersReducedMotion],
    },
  );

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 hidden w-px bg-slate-200 lg:block"
      >
        <div
          ref={progressRef}
          className="bg-teal h-full w-full origin-top"
        />
      </div>

      <div className="relative lg:pl-12">
        {children}
      </div>
    </div>
  );
}