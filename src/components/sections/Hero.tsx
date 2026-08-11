import { Check } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { HeroAside, HeroIntro, HeroItem } from "@/components/motion/HeroIntro";
import { SECTION_IDS } from "@/lib/constants";
import type { HeroContent } from "@/types/content";
import { HeroPreview } from "./HeroPreview";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section
      id={SECTION_IDS.hero}
      className="scroll-mt-20 bg-gradient-to-b from-white via-[#FAFCFE] to-[#F7FAFD] py-16 lg:py-24"
    >
      <Container
        width="narrow"
        className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between"
      >
        <HeroIntro className="max-w-[640px]">
          <h1 className="text-[34px] leading-[1.1] font-extrabold md:text-[44px] lg:text-[52px] lg:leading-[57px]">
            {/* Forced line breaks are a desktop-only detail from the design;
                on small screens the headline wraps naturally. */}
            {content.headline.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </h1>

          <HeroItem as="p" className="text-navy font-display mt-3.5 text-lg font-bold lg:text-[22px]">
            {content.subline}
          </HeroItem>

          <HeroItem as="p" className="mt-6 max-w-[600px] text-base leading-7 lg:text-lg lg:leading-[29px]">
            {content.body}
          </HeroItem>

          <HeroItem className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href={`#${SECTION_IDS.cta}`}>{content.primaryCta}</ButtonLink>
            <ButtonLink href="#" variant="ghost">
              {content.secondaryCta}
            </ButtonLink>
          </HeroItem>

          <HeroItem as="p" className="mt-6 flex items-center gap-2.5 text-sm">
            <Check aria-hidden className="text-success size-4 shrink-0" strokeWidth={3} />
            {content.note}
          </HeroItem>
        </HeroIntro>

        <HeroAside className="w-full lg:mt-11 lg:w-auto lg:shrink-0">
          <HeroPreview preview={content.preview} />
        </HeroAside>
      </Container>
    </section>
  );
}
