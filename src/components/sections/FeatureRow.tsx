import { FeatureMotion, type MotionDimension } from "@/motion/sequences";
import { CheckList, ScreenshotFrame } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

type FeatureAnimation = "audit" | "lms" | "default";

interface FeatureRowProps {
  feature: Feature;
  imageSide?: "left" | "right";
  animation?: FeatureAnimation;
  /** Motion dimension for this row. Rows in a group alternate roles. */
  dimension?: MotionDimension;
  index?: number;
}

export function FeatureRow({
  feature,
  imageSide = "right",
  animation = "default",
  dimension = "2d",
  index = 0,
}: FeatureRowProps) {
  const isAudit = animation === "audit";
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <FeatureMotion dimension={dimension} imageSide={imageSide} index={index}>
      <div
        data-audit-step={isAudit ? index : undefined}
        data-lms-row={animation === "lms" ? index : undefined}
        className={cn(
          "relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16",
          imageSide === "left" && "lg:flex-row-reverse",
        )}
      >
        {isAudit && (
          <>
            <span
              aria-hidden
              data-audit-node
              className="border-line absolute top-8 -left-[43px] hidden size-4 rounded-full border-2 bg-white shadow-sm lg:block"
            />

            <span
              aria-hidden
              data-audit-number
              className="text-teal absolute top-6 -left-[78px] hidden text-[11px] font-extrabold tracking-[0.12em] opacity-70 lg:block"
            >
              {stepNumber}
            </span>
          </>
        )}

        <div data-feature-copy className="lg:max-w-[600px]">
          <p data-feature-line className="text-teal text-[13px] font-extrabold tracking-[0.09em] uppercase">
            {feature.eyebrow}
          </p>

          <h3 data-feature-line className="mt-3.5 text-[24px] leading-tight font-extrabold md:text-[30px]">
            {feature.title.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </h3>

          <p data-feature-line className="mt-5 text-base leading-[26px]">
            {feature.description}
          </p>

          <div data-feature-line>
            <CheckList items={feature.bullets} className="mt-6" />
          </div>
        </div>

        <div className="w-full lg:w-[564px] lg:shrink-0">
          <div data-feature-frame className="will-change-transform">
            <ScreenshotFrame
              title={feature.frameTitle}
              label={feature.screenshotLabel}
              src={feature.image}
            />
          </div>
        </div>
      </div>
    </FeatureMotion>
  );
}
