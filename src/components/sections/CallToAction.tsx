import { ButtonLink, Container } from "@/components/ui";
import { SECTION_IDS } from "@/lib/constants";
import type { CtaContent } from "@/types/content";

export function CallToAction({ content }: { content: CtaContent }) {
  return (
    <section id={SECTION_IDS.cta} className="bg-navy scroll-mt-20 py-20 text-center lg:py-24">
      <Container>
        <h2 className="text-[28px] leading-tight font-extrabold text-white md:text-[40px]">
          {content.heading.map((line) => (
            <span key={line} className="lg:block">
              {line}{" "}
            </span>
          ))}
        </h2>
        <p className="text-navy-body mx-auto mt-6 max-w-[640px] text-[17px] leading-7">{content.body}</p>

        <div aria-hidden className="mt-9 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center">
              <span className="bg-teal size-2.5 rounded-full" />
              <span className={i === 2 ? "h-0.5 w-14 bg-[#3A5573]" : "bg-teal h-0.5 w-14"} />
            </span>
          ))}
          <span className="size-2.5 rounded-full border-[1.5px] border-[#52708F]" />
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href={`#${SECTION_IDS.demo}`}>{content.primaryCta}</ButtonLink>
          <ButtonLink href="#" variant="dark">
            {content.secondaryCta}
          </ButtonLink>
        </div>

        <p className="text-navy-muted mt-7 text-sm">{content.note}</p>
      </Container>
    </section>
  );
}
