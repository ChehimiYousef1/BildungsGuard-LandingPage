import { Container, Section, SectionHeading } from "@/components/ui";
import { DrawRule, Stagger, StaggerItem } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { WhyContent } from "@/types/content";

const accents = {
  teal: "bg-teal",
  blue: "bg-blue",
  navy: "bg-navy",
} as const;

export function WhyUs({ content }: { content: WhyContent }) {
  return (
    <Section id={SECTION_IDS.why} tone="surface" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          description={content.body}
        />

        {/* Signature moment: each accent rule draws before its text. */}
        <Stagger as="ul" className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-13" stagger={0.12}>
          {content.pillars.map((pillar) => (
            <StaggerItem as="li" key={pillar.title}>
              <DrawRule className={cn(accents[pillar.accent])} />
              <h3 className="mt-6 text-xl font-bold">{pillar.title}</h3>
              <p className="mt-3.5 text-[15px] leading-[25px]">{pillar.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
