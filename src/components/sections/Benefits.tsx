import { Badge, CheckList, Container, Section } from "@/components/ui";
import { Motion, MotionGroup } from "@/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { BenefitsContent } from "@/types/content";

export function Benefits({ content }: { content: BenefitsContent }) {
  const half = Math.ceil(content.bullets.length / 2);

  return (
    <Section id={SECTION_IDS.benefits} aria-labelledby="benefits-heading">
      <Container>
        <Motion>
          <h2 id="benefits-heading" className="text-[26px] leading-tight font-extrabold md:text-[34px]">
            {content.heading.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-[760px] text-[17px] leading-7">{content.body}</p>
        </Motion>

        <Motion index={1} className="mt-9 grid gap-x-16 gap-y-5 md:grid-cols-2">
          <CheckList items={content.bullets.slice(0, half)} className="space-y-5" />
          <CheckList items={content.bullets.slice(half)} className="space-y-5" />
        </Motion>

        <hr className="border-line mt-10 border-t" />

        <MotionGroup preset="pop" className="mt-8 flex flex-wrap gap-3" gap="tight">
          {content.badges.map((badge) => (
            <span key={badge.label} data-motion-item>
              <Badge>{badge.label}</Badge>
            </span>
          ))}
        </MotionGroup>
      </Container>
    </Section>
  );
}
