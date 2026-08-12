import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../config/gsap";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GsapReveal({
  children,
  className,
  delay = 0,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}