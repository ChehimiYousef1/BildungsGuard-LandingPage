import { Badge, Container } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { TrustContent } from "@/types/content";

interface TrustBarProps {
  content: TrustContent;
}

export function TrustBar({ content }: TrustBarProps) {
  return (
    <section className="border-line border-b bg-white py-9">
      <Container width="narrow">
        <Reveal as="div">
          <p className="text-ink text-base font-bold">{content.headline}</p>
        </Reveal>
        <Stagger className="mt-5 flex flex-wrap gap-3" stagger={0.07}>
          {content.badges.map((badge) => (
            <StaggerItem key={badge.label} effect="spring">
              <Badge>{badge.label}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
