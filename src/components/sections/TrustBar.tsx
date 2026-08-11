import { Badge, Container } from "@/components/ui";
import type { TrustContent } from "@/types/content";

interface TrustBarProps {
  content: TrustContent;
}

export function TrustBar({ content }: TrustBarProps) {
  return (
    <section className="border-line border-b bg-white py-9">
      <Container width="narrow">
        <p className="text-ink text-base font-bold">{content.headline}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {content.badges.map((badge) => (
            <Badge key={badge.label}>{badge.label}</Badge>
          ))}
        </div>
      </Container>
    </section>
  );
}
