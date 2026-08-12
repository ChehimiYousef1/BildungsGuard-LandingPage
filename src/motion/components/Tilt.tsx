"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { gsap } from "../gsap";
import { useReducedMotion } from "../useReducedMotion";

interface TiltProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Maximum rotation in degrees. Above ~8 it stops looking deliberate. */
  max?: number;
}

/**
 * Card that tilts toward the cursor. Mouse only — a touch device never fires
 * pointermove without a press, so mobile behaves exactly as before.
 */
export function Tilt({ children, className, as = "div", max = 6 }: TiltProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = innerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(el, {
      rotateY: (px - 0.5) * 2 * max,
      rotateX: (0.5 - py) * 2 * max,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const reset = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
  };

  const body = (
    <div ref={innerRef} className="h-full" onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );

  if (as === "li") return <li className={className}>{body}</li>;
  return <div className={className}>{body}</div>;
}
