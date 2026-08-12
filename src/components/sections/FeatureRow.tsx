import { Parallax, Reveal } from "@/components/motion";
import { CheckList, ScreenshotFrame } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

type FeatureAnimation = "audit" | "lms" | "default";

interface FeatureRowProps {
  feature: Feature;
  imageSide?: "left" | "right";
  animation?: FeatureAnimation;
  index?: number;
}

/** One alternating feature block. Used by every feature group. */
export function FeatureRow({
  feature,
  imageSide = "right",
  animation = "default",
  index = 0,
}: FeatureRowProps) {
  const textDirection = imageSide === "right" ? "left" : "right";
  const imageDirection = imageSide === "right" ? "right" : "left";

  return (
    <div
      data-audit-step={animation === "audit" ? index : undefined}
      className={cn(
        "relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16",
        imageSide === "left" && "lg:flex-row-reverse",
      )}
    >
      {animation === "audit" && (
        <span
          aria-hidden
          data-audit-node
          className="absolute top-8 -left-[38px] hidden size-4 rounded-full border-2 border-slate-300 bg-white lg:block"
        />
      )}

      <Reveal
        from={textDirection}
        distance={28}
        className="lg:max-w-[600px]"
      >
        <p className="text-teal text-[13px] font-extrabold tracking-[0.09em] uppercase">
          {feature.eyebrow}
        </p>

        <h3 className="mt-3.5 text-[24px] leading-tight font-extrabold md:text-[30px]">
          {feature.title.map((line) => (
            <span key={line} className="lg:block">
              {line}{" "}
            </span>
          ))}
        </h3>

        <p className="mt-5 text-base leading-[26px]">
          {feature.description}
        </p>

        <CheckList items={feature.bullets} className="mt-6" />
      </Reveal>

      <Reveal
        from={imageDirection}
        distance={28}
        index={1}
        className="w-full lg:w-[564px] lg:shrink-0"
      >
        <Parallax distance={30}>
          <ScreenshotFrame
            title={feature.frameTitle}
            label={feature.screenshotLabel}
          />
        </Parallax>
      </Reveal>
    </div>
  );
}