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
}: FeatureGroupProps) {
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

        <div className="mt-16 space-y-20 lg:space-y-24">
          {content.features.map((feature, index) => (
            <FeatureRow
              key={feature.eyebrow}
              feature={feature}
              imageSide={index % 2 === 0 ? "right" : "left"}
              animation={animation}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}