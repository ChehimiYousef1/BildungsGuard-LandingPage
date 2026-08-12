"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "../gsap";

import { useReducedMotion } from "../useReducedMotion";
import { ease } from "../config";
import { colorTokens } from "../tokens";

interface AuditJourneyProps {
  children: ReactNode;
}

export function AuditJourney({ children }: AuditJourneyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const progress = progressRef.current;

      if (!root || !progress) {
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-audit-step]", root);

      const nodes = gsap.utils.toArray<HTMLElement>("[data-audit-node]", root);

      const numbers = gsap.utils.toArray<HTMLElement>("[data-audit-number]", root);

      const t = colorTokens();

      if (prefersReducedMotion) {
        gsap.set(progress, { scaleY: 1 });

        gsap.set(nodes, {
          scale: 1,
          backgroundColor: t.teal,
          borderColor: t.teal,
        });

        gsap.set(steps, {
          opacity: 1,
          scale: 1,
        });

        gsap.set(numbers, { opacity: 0.7, y: 0 });

        return;
      }

      gsap.set(progress, {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.set(nodes, {
        scale: 0.72,
      });

      gsap.set(steps, {
        opacity: 0.72,
        scale: 0.985,
      });

      gsap.set(numbers, { opacity: 0, y: 8 });

      gsap.to(progress, {
        scaleY: 1,
        ease: ease.linear,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 0.4,
        },
      });

      steps.forEach((step, index) => {
        const node = nodes[index];
        const number = numbers[index];

        if (!node) {
          return;
        }

        ScrollTrigger.create({
          trigger: step,
          start: "top 68%",
          end: "bottom 42%",

          onEnter: () => {
            gsap.to(step, {
              opacity: 1,
              scale: 1,
              duration: 0.28,
              ease: ease.settle,
            });

            gsap.to(node, {
              scale: 1.15,
              backgroundColor: t.teal,
              borderColor: t.teal,
              duration: 0.22,
              ease: ease.pop,
            });

            if (number) {
              gsap.to(number, {
                opacity: 0.7,
                y: 0,
                duration: 0.22,
                ease: ease.settle,
              });
            }
          },

          onEnterBack: () => {
            gsap.to(step, {
              opacity: 1,
              scale: 1,
              duration: 0.22,
            });

            gsap.to(node, {
              scale: 1.15,
              backgroundColor: t.teal,
              borderColor: t.teal,
              duration: 0.25,
            });
          },

          onLeave: () => {
            gsap.to(step, {
              opacity: 0.84,
              scale: 0.992,
              duration: 0.22,
            });
          },

          onLeaveBack: () => {
            gsap.to(step, {
              opacity: 0.72,
              scale: 0.985,
              duration: 0.25,
            });

            gsap.to(node, {
              scale: 0.72,
              backgroundColor: t.white,
              borderColor: t.line,
              duration: 0.25,
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
      <div aria-hidden className="bg-line absolute top-0 bottom-0 left-5 hidden w-px lg:block">
        <div ref={progressRef} className="bg-teal h-full w-full origin-top" />
      </div>

      <div className="relative lg:pl-14">{children}</div>
    </div>
  );
}
