import { Card, Container, Section, SectionHeading } from "@/components/ui";
import { Tilt } from "@/components/motion";
import { ProcessTimeline } from "@/components/gsap";
import { SECTION_IDS } from "@/lib/constants";
import type { HowItWorksContent } from "@/types/content";

/** Numbered because the steps are a real sequence, not decoration. */
export function HowItWorks({ content }: { content: HowItWorksContent }) {
  return (
    <Section id={SECTION_IDS.howItWorks} tone="surface" aria-labelledby="how-heading">
      <Container>
        <SectionHeading
          id="how-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          description={content.body}
          align="center"
        />

        <ProcessTimeline>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step, i) => (
              <li key={step.title} data-step-card>
                <Tilt max={5}>
                  <Card interactive className="h-full p-7">
                    <span
                      data-step-badge
                      className="bg-blue font-display flex size-10 items-center justify-center rounded-[11px] text-[15px] font-extrabold text-white"
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-lg leading-6 font-bold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6">{step.description}</p>
                  </Card>
                </Tilt>
              </li>
            ))}
          </ol>
        </ProcessTimeline>
      </Container>
    </Section>
  );
}
