"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "../gsap";

import { useReducedMotion } from "../useReducedMotion";
import { ease } from "../config";

/**
 * Motion dimension — each carries a distinct role, not just a distinct look.
 *
 *  1d "trace"    single axis. Content is revealed along a line, the way an
 *                audit trail is read: start to finish, nothing sideways.
 *  2d "assemble" the plane. Parts arrive from different corners and lock into
 *                one composition — separate tools becoming one platform.
 *  3d "depth"    perspective. The interface turns toward the reader, so a
 *                screenshot reads as a real surface rather than a picture.
 */
export type MotionDimension = "1d" | "2d" | "3d";

interface FeatureMotionProps {
  children: ReactNode;
  dimension: MotionDimension;
  /** Which side the screenshot sits on — the plane motion mirrors it. */
  imageSide: "left" | "right";
  index?: number;
  className?: string;
}

export function FeatureMotion({ children, dimension, imageSide, index = 0, className }: FeatureMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const copy = root.querySelector<HTMLElement>("[data-feature-copy]");
      const frame = root.querySelector<HTMLElement>("[data-feature-frame]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-feature-line]", root);
      if (!copy || !frame) return;

      if (prefersReducedMotion) {
        gsap.set([copy, frame, ...lines], {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          clipPath: "none",
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: ease.out },
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      if (dimension === "1d") {
        // TRACE — one axis only. The frame wipes open along its length while
        // the copy steps down the same vertical line.
        gsap.set(frame, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(lines, { opacity: 0, y: 14 });

        tl.to(frame, { clipPath: "inset(0 0% 0 0)", duration: 0.62 }).to(
          lines,
          { opacity: 1, y: 0, duration: 0.32, stagger: 0.05 },
          0.1,
        );
      } else if (dimension === "2d") {
        // ASSEMBLE — the two halves travel diagonally from opposite corners
        // and meet on the centre line.
        const dir = imageSide === "right" ? 1 : -1;

        gsap.set(copy, { opacity: 0, x: -34 * dir, y: 26 });
        gsap.set(frame, { opacity: 0, x: 34 * dir, y: -18, scale: 0.97 });
        gsap.set(lines, { opacity: 0, y: 10 });

        tl.to(copy, { opacity: 1, x: 0, y: 0, duration: 0.55 })
          .to(frame, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.6 }, 0.06)
          .to(lines, { opacity: 1, y: 0, duration: 0.28, stagger: 0.045 }, 0.22);
      } else {
        // DEPTH — the frame turns toward the reader out of perspective.
        const dir = imageSide === "right" ? 1 : -1;

        gsap.set(frame.parentElement, { perspective: 1100 });
        gsap.set(frame, {
          opacity: 0,
          rotateY: 14 * dir,
          rotateX: 5,
          y: 30,
          transformOrigin: imageSide === "right" ? "left center" : "right center",
        });
        gsap.set(copy, { opacity: 0, y: 22 });
        gsap.set(lines, { opacity: 0, y: 10 });

        tl.to(copy, { opacity: 1, y: 0, duration: 0.5 })
          .to(frame, { opacity: 1, rotateY: 0, rotateX: 0, y: 0, duration: 0.7 }, 0.04)
          .to(lines, { opacity: 1, y: 0, duration: 0.28, stagger: 0.045 }, 0.2);
      }
    },
    { scope: rootRef, dependencies: [prefersReducedMotion, dimension, imageSide, index] },
  );

  return (
    <div ref={rootRef} className={className} data-dimension={dimension}>
      {children}
    </div>
  );
}
