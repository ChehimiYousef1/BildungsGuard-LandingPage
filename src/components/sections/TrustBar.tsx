import { Badge, Container } from "@/components/ui";
import { Motion, MotionGroup } from "@/motion";
import type { TrustContent } from "@/types/content";

interface TrustBarProps {
  content: TrustContent;
}

export function TrustBar({ content }: TrustBarProps) {
  return (
    <section className="border-line border-b bg-white py-9">
      <Container width="narrow">
        <Motion>
          <p className="text-ink text-base font-bold">{content.headline}</p>
        </Motion>
        <MotionGroup preset="pop" className="mt-5 flex flex-wrap gap-3" gap="tight">
          {content.badges.map((badge) => (
            <span key={badge.label} data-motion-item>
              <Badge>{badge.label}</Badge>
            </span>
          ))}
        </MotionGroup>
      </Container>
    </section>
  );
}
