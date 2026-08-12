import { Archive, Lock, ServerCog, ShieldCheck, type LucideIcon } from "lucide-react";
import { Badge, Card, Container, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { SecurityScan } from "@/components/gsap";
import { SECTION_IDS } from "@/lib/constants";
import type { SecurityContent, SecurityIcon } from "@/types/content";

/**
 * Each claim gets the icon that matches what it says — a server for hosting,
 * a lock for transport. One repeated shield told the reader nothing.
 */
const icons: Record<SecurityIcon, LucideIcon> = {
  hosting: ServerCog,
  privacy: ShieldCheck,
  archive: Archive,
  transport: Lock,
};

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

        <SecurityScan>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {content.items.map((item, i) => {
              const Icon = icons[item.icon];

              return (
                <Reveal
                  as="li"
                  key={item.title}
                  index={i % 2}
                  from={i % 2 === 0 ? "left" : "right"}
                  distance={24}
                >
                  <Card className="flex h-full gap-5 p-7">
                    <span
                      data-scan-mark
                      className="bg-teal-soft text-teal-ink flex size-10 shrink-0 items-center justify-center rounded-[11px]"
                    >
                      {/* No colour class: the icon inherits currentColor, so when
                        the scan flips the mark to teal the glyph turns white. */}
                      <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="text-lg leading-6 font-bold">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-6">{item.description}</p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </SecurityScan>

        <div className="mt-10 flex flex-wrap gap-3">
          {content.badges.map((badge) => (
            <Badge key={badge.label}>{badge.label}</Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}
