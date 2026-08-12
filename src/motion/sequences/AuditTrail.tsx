"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, useGSAP } from "../gsap";
import { ease, trigger as triggers } from "../config";
import { useReducedMotion } from "../useReducedMotion";

interface AuditTrailProps {
  steps: string[];
  title: string;
}

/**
 * The Prüfpfad inside the hero preview — the product's own claim, animated:
 * connectors wipe, checkpoints land, ticks draw. Runs once and settles.
 */
export function AuditTrail({ steps, title }: AuditTrailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const last = steps[steps.length - 1];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;

      const dots = gsap.utils.toArray<HTMLElement>("[data-trail-dot]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-trail-bar]", root);
      const ticks = gsap.utils.toArray<SVGPathElement>("[data-trail-tick] path", root);

      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dots, { scale: 0.5, opacity: 0.4 });
      ticks.forEach((t) => {
        const len = t.getTotalLength();
        gsap.set(t, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: triggers.early, once: true },
      });

      dots.forEach((dot, i) => {
        tl.to(dot, { scale: 1, opacity: 1, duration: 0.26, ease: ease.pop }, i * 0.22);
        if (ticks[i]) {
          tl.to(ticks[i], { strokeDashoffset: 0, duration: 0.24, ease: ease.settle }, i * 0.22 + 0.1);
        }
        if (bars[i]) {
          tl.to(bars[i], { scaleX: 1, duration: 0.3, ease: ease.settle }, i * 0.22 + 0.14);
        }
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className="border-line mt-3.5 rounded-xl border p-4">
      <p className="text-ink text-xs font-bold">{title}</p>

      <div className="mt-3.5 flex items-center">
        {steps.slice(0, -1).map((step, i) => (
          <div key={step} className="flex flex-1 items-center">
            <span
              data-trail-dot
              className="bg-teal flex size-[22px] shrink-0 items-center justify-center rounded-full"
            >
              <Check data-trail-tick aria-hidden className="size-3 text-white" strokeWidth={3} />
            </span>
            <span
              data-trail-bar
              className={i === steps.length - 2 ? "bg-line h-0.5 flex-1" : "bg-teal h-0.5 flex-1"}
            />
          </div>
        ))}
        <span className="border-line text-muted flex size-[22px] shrink-0 items-center justify-center rounded-full border bg-white text-xs">
          {steps.length}
        </span>
      </div>

      <div className="mt-2 flex text-[10px] font-semibold">
        {steps.slice(0, -1).map((step) => (
          <span key={step} className="text-teal flex-1">
            {step}
          </span>
        ))}
        <span className="text-muted">{last}</span>
      </div>
    </div>
  );
}
