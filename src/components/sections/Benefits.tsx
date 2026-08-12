import { Badge, CheckList, Container, Section } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { BenefitsContent } from "@/types/content";

export function Benefits({ content }: { content: BenefitsContent }) {
  const half = Math.ceil(content.bullets.length / 2);

  return (
    <Section id={SECTION_IDS.benefits} aria-labelledby="benefits-heading">
      <Container>
        <Reveal>
          <h2 id="benefits-heading" className="text-[26px] leading-tight font-extrabold md:text-[34px]">
            {content.heading.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-[760px] text-[17px] leading-7">{content.body}</p>
        </Reveal>

        <Reveal index={1} className="mt-9 grid gap-x-16 gap-y-5 md:grid-cols-2">
          <CheckList items={content.bullets.slice(0, half)} className="space-y-5" />
          <CheckList items={content.bullets.slice(half)} className="space-y-5" />
        </Reveal>

        <hr className="border-line mt-10 border-t" />

        <Stagger className="mt-8 flex flex-wrap gap-3" stagger={0.07}>
          {content.badges.map((badge) => (
            <StaggerItem key={badge.label} effect="spring">
              <Badge>{badge.label}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
