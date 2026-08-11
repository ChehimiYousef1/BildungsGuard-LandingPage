import { Star } from "lucide-react";
import { Card, Container, Section } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { SECTION_IDS } from "@/lib/constants";
import type { TestimonialsContent } from "@/types/content";

const avatarTone = ["bg-blue", "bg-blue", "bg-teal", "bg-[#6B8299]"] as const;

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <Section id={SECTION_IDS.testimonials} tone="surface" aria-labelledby="testimonials-heading">
      <Container>
        <div className="text-center">
          <p className="text-blue text-[13px] font-extrabold tracking-[0.09em] uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 text-[26px] leading-tight font-extrabold md:text-[34px]"
          >
            {content.heading}
          </h2>
        </div>

        <Stagger as="ul" className="mt-12 grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {content.items.map((item, i) => (
            <StaggerItem as="li" key={item.role}>
              <Card as="figure" className="h-full p-7">
                <div className="flex gap-0.5" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} aria-hidden className="text-gold size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-ink mt-5 text-base leading-[26px]">{item.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className={`flex size-9 items-center justify-center rounded-full text-[13px] font-bold text-white ${avatarTone[i % avatarTone.length]}`}
                  >
                    –
                  </span>
                  <span>
                    <span className="text-navy block text-sm font-bold">{item.name}</span>
                    <span className="text-muted text-[13px]">{item.role}</span>
                  </span>
                </figcaption>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
