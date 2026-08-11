import { ArrowRight } from "lucide-react";
import { Card, Container, Section } from "@/components/ui";
import { HoverLift, Stagger } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { InsightsContent } from "@/types/content";

const tagTone = {
  teal: "bg-teal-soft text-teal-ink",
  blue: "bg-[#EAF1FE] text-blue",
  navy: "bg-[#EDF1F6] text-[#43607F]",
} as const;

export function Insights({ content }: { content: InsightsContent }) {
  return (
    <Section id={SECTION_IDS.insights} aria-labelledby="insights-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-blue text-[13px] font-extrabold tracking-[0.09em] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="insights-heading"
              className="mt-3 text-[26px] leading-tight font-extrabold md:text-[34px]"
            >
              {content.heading}
            </h2>
          </div>
          <a href="#" className="text-blue inline-flex items-center gap-1.5 text-[15px] font-bold">
            {content.allLabel}
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>

        <Stagger as="ul" className="mt-11 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-13" stagger={0.09}>
          {content.items.map((article) => (
            <HoverLift as="li" key={article.title}>
              <Card as="article" className="h-full p-7">
                <span
                  className={cn(
                    "inline-block rounded-full px-3 py-1.5 text-xs font-bold",
                    tagTone[article.tone],
                  )}
                >
                  {article.tag}
                </span>
                <h3 className="mt-5 text-lg leading-6 font-bold">{article.title}</h3>
                <p className="mt-3.5 text-sm leading-6">{article.excerpt}</p>
                <a
                  href="#"
                  className="text-blue mt-5 inline-flex items-center gap-1.5 text-sm font-bold"
                  aria-label={`${article.readMore}: ${article.title}`}
                >
                  {article.readMore}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </Card>
            </HoverLift>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
