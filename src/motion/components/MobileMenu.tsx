"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../gsap";
import { ease } from "../config";
import { useReducedMotion } from "../useReducedMotion";

/**
 * Height transition for the mobile menu. GSAP animates to "auto" natively,
 * which is why this needs no AnimatePresence equivalent — the element simply
 * collapses and is then unmounted by the caller.
 */
export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.26, ease: ease.settle },
    );
  }, [open, reduced]);

  return (
    <div ref={ref} className="overflow-hidden">
      {children}
    </div>
  );
}
