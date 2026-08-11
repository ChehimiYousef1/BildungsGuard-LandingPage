import { Container, Section, SectionHeading } from "@/components/ui";
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

        <ul className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-13">
          {content.pillars.map((pillar) => (
            <li key={pillar.title}>
              <span aria-hidden className={cn("block h-[3px] rounded-sm", accents[pillar.accent])} />
              <h3 className="mt-6 text-xl font-bold">{pillar.title}</h3>
              <p className="mt-3.5 text-[15px] leading-[25px]">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
