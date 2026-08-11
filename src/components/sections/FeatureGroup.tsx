import { Container, Section, SectionHeading } from "@/components/ui";
import type { FeatureGroupContent } from "@/types/content";
import { FeatureRow } from "./FeatureRow";

interface FeatureGroupProps {
  id: string;
  content: FeatureGroupContent;
  tone?: "light" | "surface";
  headingId: string;
}

/**
 * Renders one titled group of alternating feature rows. Both the Audit and the
 * LMS sections are this component with different content — never a second copy.
 */
export function FeatureGroup({ id, content, tone = "surface", headingId }: FeatureGroupProps) {
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
          {content.features.map((feature, i) => (
            <FeatureRow key={feature.eyebrow} feature={feature} imageSide={i % 2 === 0 ? "right" : "left"} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
