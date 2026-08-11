import { ShieldCheck } from "lucide-react";
import { Badge, Card, Container, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { SecurityContent } from "@/types/content";

export function Security({ content }: { content: SecurityContent }) {
  return (
    <Section id={SECTION_IDS.security} aria-labelledby="security-heading">
      <Container>
        <SectionHeading
          id="security-heading"
          eyebrow={content.eyebrow}
          eyebrowTone="teal"
          title={content.heading}
          description={content.body}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {content.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              index={i % 2}
              from={i % 2 === 0 ? "left" : "right"}
              distance={24}
            >
              <Card className="flex h-full gap-5 p-7">
                <span className="bg-teal-soft flex size-10 shrink-0 items-center justify-center rounded-[11px]">
                  <ShieldCheck aria-hidden className="text-teal-ink size-5" />
                </span>
                <div>
                  <h3 className="text-lg leading-6 font-bold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-6">{item.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          {content.badges.map((badge) => (
            <Badge key={badge.label}>{badge.label}</Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}
