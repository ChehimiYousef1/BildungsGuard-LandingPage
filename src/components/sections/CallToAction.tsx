import { ButtonLink, Container } from "@/components/ui";
import { Reveal, SplitText } from "@/components/motion";
import { CTAProgress } from "@/components/gsap";
import { SECTION_IDS } from "@/lib/constants";
import type { CtaContent } from "@/types/content";

export function CallToAction({ content }: { content: CtaContent }) {
  return (
    <section id={SECTION_IDS.cta} className="bg-navy scroll-mt-20 py-20 text-center lg:py-24">
      <Container>
        {/* Closing line lands word by word — the page's last beat. */}
        <SplitText
          as="h2"
          text={content.heading.join(" ")}
          className="text-[28px] leading-tight font-extrabold text-white md:text-[40px]"
        />
        <Reveal index={1}>
          <p className="text-navy-body mx-auto mt-6 max-w-[640px] text-[17px] leading-7">{content.body}</p>
        </Reveal>

        {/* Closes the journey the hero opened: fill, land, one pulse, rest. */}
        <CTAProgress>
          <div aria-hidden className="mt-9 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center">
                <span data-cta-dot className="bg-teal size-2.5 rounded-full" />
                <span data-cta-bar className={i === 2 ? "h-0.5 w-14 bg-[#3A5573]" : "bg-teal h-0.5 w-14"} />
              </span>
            ))}
            <span data-cta-dot className="bg-teal size-2.5 rounded-full" />
          </div>
        </CTAProgress>

        <Reveal index={2} className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href={`#${SECTION_IDS.demo}`}>{content.primaryCta}</ButtonLink>
          <ButtonLink href="#" variant="dark">
            {content.secondaryCta}
          </ButtonLink>
        </Reveal>

        <p className="text-navy-muted mt-7 text-sm">{content.note}</p>
      </Container>
    </section>
  );
}
