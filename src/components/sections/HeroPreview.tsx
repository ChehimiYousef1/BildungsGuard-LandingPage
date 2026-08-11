import { Check } from "lucide-react";
import { BrowserFrame } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content";

const valueTone = {
  navy: "text-navy",
  success: "text-success",
  blue: "text-blue",
} as const;

/**
 * The product preview in the hero. Decorative in nature, so it carries no
 * headings — the real screenshot replaces it later without changing the layout.
 */
export function HeroPreview({ preview }: { preview: HeroContent["preview"] }) {
  const { title, stats, trailTitle, steps, footerText, footerBadge } = preview;
  const lastStep = steps[steps.length - 1];

  return (
    <BrowserFrame title={title} className="w-full max-w-[556px]">
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3.5">
          {stats.map((stat) => (
            <div key={stat.label} className="border-line rounded-xl border p-4">
              <p className="text-muted text-[11px] font-semibold">{stat.label}</p>
              <p className={cn("font-display mt-1.5 text-[22px] font-extrabold", valueTone[stat.tone])}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border-line mt-3.5 rounded-xl border p-4">
          <p className="text-ink text-xs font-bold">{trailTitle}</p>

          <div className="mt-3.5 flex items-center">
            {steps.slice(0, -1).map((step, i) => (
              <div key={step} className="flex flex-1 items-center">
                <span className="bg-teal flex size-[22px] shrink-0 items-center justify-center rounded-full">
                  <Check aria-hidden className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className={cn("h-0.5 flex-1", i === steps.length - 2 ? "bg-line" : "bg-teal")} />
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
            <span className="text-muted">{lastStep}</span>
          </div>
        </div>

        <div className="border-line mt-3.5 flex items-center justify-between gap-3 rounded-xl border p-4">
          <p className="text-ink text-xs">{footerText}</p>
          <span className="bg-teal-soft text-teal-ink rounded-full px-3 py-1.5 text-[11px] font-bold whitespace-nowrap">
            {footerBadge}
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}
