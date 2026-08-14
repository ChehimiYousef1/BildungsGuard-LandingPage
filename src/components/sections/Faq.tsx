import { Minus, Plus } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { MotionGroup } from "@/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { FaqContent } from "@/types/content";
import { jsonLdHtml } from "@/lib/seo";

/**
 * Native <details>/<summary>: keyboard accessible and screen-reader correct
 * without JavaScript, so this stays a Server Component.
 */
export function Faq({ content }: { content: FaqContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id={SECTION_IDS.faq} tone="surface" aria-labelledby="faq-heading">
      <Container width="faq">
        <div className="text-center">
          <p className="text-blue text-[13px] font-extrabold tracking-[0.09em] uppercase">
            {content.eyebrow}
          </p>
          <h2 id="faq-heading" className="mt-3 text-[26px] leading-tight font-extrabold md:text-[34px]">
            {content.heading}
          </h2>
        </div>

        <MotionGroup className="mt-11 space-y-3" gap="tight">
          {content.items.map((item) => (
            <div key={item.question} data-motion-item>
              <details
                open={item.defaultOpen}
                className="border-line group hover:border-blue/30 rounded-xl border bg-white px-6 py-5 shadow-[0_1px_2px_rgba(15,42,71,0.04)] transition-colors duration-200"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-navy group-hover:text-blue text-base leading-6 font-bold transition-colors">
                    {item.question}
                  </span>
                  <Plus aria-hidden className="text-blue mt-0.5 size-5 shrink-0 group-open:hidden" />
                  <Minus aria-hidden className="text-blue mt-0.5 hidden size-5 shrink-0 group-open:block" />
                </summary>
                <p className="mt-3.5 max-w-[1000px] text-[15px] leading-[25px]">{item.answer}</p>
              </details>
            </div>
          ))}
        </MotionGroup>
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
    </Section>
  );
}
