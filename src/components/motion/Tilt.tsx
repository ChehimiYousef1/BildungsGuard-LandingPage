"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Rendered element — keeps list markup semantic. */
  as?: "div" | "li";
  /** Maximum rotation in degrees. Above ~8 it stops looking deliberate. */
  max?: number;
}

/**
 * Card that tilts toward the cursor. Pointer-driven only: a touch device never
 * fires pointermove without a press, so mobile behaves exactly as before.
 */
export function Tilt({ children, className, as = "div", max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const inner = (
    <div
      ref={ref}
      className="h-full"
      style={{ perspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </motion.div>
    </div>
  );

  if (as === "li") return <li className={className}>{inner}</li>;
  return <div className={className}>{inner}</div>;
}
