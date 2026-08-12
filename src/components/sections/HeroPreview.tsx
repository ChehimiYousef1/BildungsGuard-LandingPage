import { AuditTrail } from "@/motion/sequences";
import { CountUp } from "@/motion";
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

  return (
    <BrowserFrame title={title} className="w-full max-w-[556px]">
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3.5">
          {stats.map((stat) => (
            <div key={stat.label} className="border-line rounded-xl border p-4">
              <p className="text-muted text-[11px] font-semibold">{stat.label}</p>
              <p className={cn("font-display mt-1.5 text-[22px] font-extrabold", valueTone[stat.tone])}>
                <CountUp value={stat.value} />
              </p>
            </div>
          ))}
        </div>

        <AuditTrail steps={steps} title={trailTitle} />

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
