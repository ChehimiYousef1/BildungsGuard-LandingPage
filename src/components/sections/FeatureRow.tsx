import { CheckList, ScreenshotFrame } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

interface FeatureRowProps {
  feature: Feature;
  /** Which side the screenshot sits on at desktop width. */
  imageSide?: "left" | "right";
}

/** One alternating feature block. Used by every feature group. */
export function FeatureRow({ feature, imageSide = "right" }: FeatureRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16",
        imageSide === "left" && "lg:flex-row-reverse",
      )}
    >
      <div className="lg:max-w-[600px]">
        <p className="text-teal text-[13px] font-extrabold tracking-[0.09em] uppercase">{feature.eyebrow}</p>
        <h3 className="mt-3.5 text-[24px] leading-tight font-extrabold md:text-[30px]">
          {feature.title.map((line) => (
            <span key={line} className="lg:block">
              {line}{" "}
            </span>
          ))}
        </h3>
        <p className="mt-5 text-base leading-[26px]">{feature.description}</p>
        <CheckList items={feature.bullets} className="mt-6" />
      </div>

      <div className="w-full lg:w-[564px] lg:shrink-0">
        <ScreenshotFrame title={feature.frameTitle} label={feature.screenshotLabel} />
      </div>
    </div>
  );
}
