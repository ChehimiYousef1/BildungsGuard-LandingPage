import { Play } from "lucide-react";
import { ButtonLink, Card, Container, Section } from "@/components/ui";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { SECTION_IDS } from "@/lib/constants";
import type { DemoContent } from "@/types/content";

export function WebDemo({ content }: { content: DemoContent }) {
  return (
    <Section id={SECTION_IDS.demo} tone="surface" aria-labelledby="demo-heading">
      <Container
        width="narrow"
        className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="lg:max-w-[600px]">
          <p className="text-blue text-[13px] font-extrabold tracking-[0.09em] uppercase">
            {content.eyebrow}
          </p>
          <h2 id="demo-heading" className="mt-4 text-[26px] leading-tight font-extrabold md:text-[36px]">
            {content.heading.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-[17px] leading-7">{content.body}</p>

          <Card className="mt-8 flex h-[280px] flex-col items-center justify-center gap-4">
            <span className="bg-blue flex size-14 items-center justify-center rounded-full shadow-[0_8px_22px_rgba(37,99,235,0.28)]">
              <Play aria-hidden className="size-5 fill-white text-white" />
            </span>
            <span className="text-muted text-xs">[ {content.videoLabel} ]</span>
          </Card>

          <Card className="mt-7 p-7">
            <p className="text-ink text-[15px] font-bold">{content.question}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {content.options.map((option) => (
                <span
                  key={option}
                  className="border-line bg-surface text-ink rounded-[10px] border py-3 text-center text-sm font-semibold"
                >
                  {option}
                </span>
              ))}
            </div>
            <ButtonLink href="#" full size="sm" className="mt-5">
              {content.questionCta}
            </ButtonLink>
          </Card>
        </div>

        <div className="w-full lg:w-auto lg:shrink-0">
          <DemoRequestForm content={content.form} />
        </div>
      </Container>
    </Section>
  );
}
