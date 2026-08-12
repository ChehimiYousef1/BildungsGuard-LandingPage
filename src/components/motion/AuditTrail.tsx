"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING, VIEWPORT } from "./tokens";

/**
 * Signature moment: the audit trail draws itself once, on scroll.
 * Each connector wipes left to right, then the next checkpoint springs in —
 * the page demonstrates the claim instead of describing it.
 */
export function AuditTrail({ steps }: { steps: string[] }) {
  const reduced = usePrefersReducedMotion();
  const done = steps.slice(0, -1);
  const step = 0.42;

  const Checkpoint = ({ i }: { i: number }) => (
    <motion.span
      className="bg-teal flex size-[22px] shrink-0 items-center justify-center rounded-full"
      variants={{
        hidden: { scale: reduced ? 1 : 0.4, opacity: reduced ? 1 : 0.35 },
        show: { scale: 1, opacity: 1, transition: { ...SPRING, delay: i * step } },
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3">
        <motion.path
          d="M3 8.4l3.2 3.2L13 4.8"
          stroke="white"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: reduced ? 1 : 0 },
            show: { pathLength: 1, transition: { duration: 0.3, ease: EASE_OUT, delay: i * step + 0.12 } },
          }}
        />
      </svg>
    </motion.span>
  );

  return (
    <motion.div className="mt-3.5 flex items-center" initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {done.map((label, i) => (
        <div key={label} className="flex flex-1 items-center">
          <Checkpoint i={i} />
          <span className={cn("relative h-0.5 flex-1", i === done.length - 1 ? "bg-line" : "bg-line")}>
            {i < done.length - 1 && (
              <motion.span
                className="bg-teal absolute inset-0 origin-left"
                variants={{
                  hidden: { scaleX: reduced ? 1 : 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.34, ease: EASE_OUT, delay: i * step + 0.2 },
                  },
                }}
              />
            )}
          </span>
        </div>
      ))}
      <span className="border-line text-muted flex size-[22px] shrink-0 items-center justify-center rounded-full border bg-white text-xs">
        {steps.length}
      </span>
    </motion.div>
  );
}
