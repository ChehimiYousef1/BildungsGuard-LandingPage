import { Card, Container, Section } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ModulesContent } from "@/types/content";

const badgeTone = {
  blue: "bg-[#EAF1FE] text-blue",
  teal: "bg-teal-soft text-teal-ink",
} as const;

export function Modules({ content }: { content: ModulesContent }) {
  return (
    <Section id={SECTION_IDS.modules} aria-labelledby="modules-heading">
      <Container>
        <div className="text-center">
          <h2 id="modules-heading" className="text-[26px] leading-tight font-extrabold md:text-[34px]">
            {content.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-[26px]">{content.body}</p>
        </div>

        {/* Signature moment: the grid springs in on a diagonal. */}
        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {content.items.map((module) => (
            <StaggerItem as="li" key={module.code} effect="pop">
              <Card interactive className="h-full p-7">
                <span
                  className={cn(
                    "font-display flex size-10 items-center justify-center rounded-[11px] text-[15px] font-extrabold",
                    badgeTone[module.tone],
                  )}
                  aria-hidden
                >
                  {module.code}
                </span>
                <h3 className="mt-5 text-lg leading-6 font-bold">{module.title}</h3>
                <p className="mt-3 text-sm leading-6">{module.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
