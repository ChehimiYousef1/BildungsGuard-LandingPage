import { AuditJourney, LMSAssembly } from "@/components/gsap";
import type { MotionDimension } from "@/components/gsap/FeatureMotion";
import { Container, Section, SectionHeading } from "@/components/ui";
import type { FeatureGroupContent } from "@/types/content";

import { FeatureRow } from "./FeatureRow";

type FeatureAnimation = "audit" | "lms" | "default";

interface FeatureGroupProps {
  id: string;
  content: FeatureGroupContent;
  tone?: "light" | "surface";
  headingId: string;
  animation?: FeatureAnimation;
  /**
   * Motion roles for the rows, in order. Audit reads as a line (1d) then
   * gains depth (3d); LMS assembles in the plane (2d) then turns (3d).
   */
  dimensions?: MotionDimension[];
}

/**
 * Shared feature-group layout.
 *
 * Audit and LMS reuse the same content structure,
 * while their animation behavior can be different.
 */
export function FeatureGroup({
  id,
  content,
  tone = "surface",
  headingId,
  animation = "default",
  dimensions = ["2d", "3d"],
}: FeatureGroupProps) {
  const featureRows = (
    <div className="space-y-20 lg:space-y-24">
      {content.features.map((feature, index) => (
        <FeatureRow
          key={feature.eyebrow}
          feature={feature}
          imageSide={index % 2 === 0 ? "right" : "left"}
          animation={animation}
          dimension={dimensions[index % dimensions.length]}
          index={index}
        />
      ))}
    </div>
  );

  return (
    <Section id={id} tone={tone} aria-labelledby={headingId}>
      <Container>
        <SectionHeading
          id={headingId}
          eyebrow={content.eyebrow}
          title={content.heading}
          description={content.intro}
          align="center"
        />

        <div className="mt-16">
          {animation === "audit" ? (
            <AuditJourney>{featureRows}</AuditJourney>
          ) : animation === "lms" ? (
            <LMSAssembly>{featureRows}</LMSAssembly>
          ) : (
            featureRows
          )}
        </div>
      </Container>
    </Section>
  );
}
