import Image from "next/image";
import { ButtonLink, Card, Container, Section } from "@/components/ui";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { Motion } from "@/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { DemoContent } from "@/types/content";
import type { Locale } from "@/lib/i18n";

export function WebDemo({ content, locale }: { content: DemoContent; locale: Locale }) {
  return (
    <Section id={SECTION_IDS.demo} tone="surface" aria-labelledby="demo-heading">
      <Container
        width="narrow"
        className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
      >
        <Motion preset="enterLeft" className="lg:max-w-[600px]">
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

          <Card className="relative mt-8 aspect-video w-full overflow-hidden p-0">
            <Image
              src={
                locale === "de"
                  ? "/images/videos/webdemo-de.png"
                  : "/images/videos/webdemo-en.png"
              }
              alt={
                locale === "de"
                  ? "Bildungs Guard Informationsvideo – bald verfügbar"
                  : "Bildungs Guard information video – coming soon"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-contain"
            />
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
        </Motion>

        <Motion preset="enterRight" className="w-full lg:w-auto lg:shrink-0">
          <DemoRequestForm content={content.form} locale={locale} />
        </Motion>
      </Container>
    </Section>
  );
}
