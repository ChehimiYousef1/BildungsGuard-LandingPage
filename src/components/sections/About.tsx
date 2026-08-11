import { Container, Section } from "@/components/ui";
import { SECTION_IDS } from "@/lib/constants";
import type { AboutContent } from "@/types/content";

export function About({ content }: { content: AboutContent }) {
  return (
    <Section id={SECTION_IDS.about} aria-labelledby="about-heading">
      <Container width="narrow" className="text-center">
        <p className="text-teal text-[13px] font-extrabold tracking-[0.09em] uppercase">{content.eyebrow}</p>
        {/* Joined rather than hard-broken: the statement has to wrap cleanly
            in both locales and at every width. */}
        <h2
          id="about-heading"
          className="mx-auto mt-5 max-w-[820px] text-[22px] leading-[1.45] font-extrabold md:text-[28px]"
        >
          {content.statement.join(" ")}
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-[17px] leading-7">{content.body}</p>
      </Container>
    </Section>
  );
}
