import { cn } from "@/lib/utils";

type Tone = "light" | "surface" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-white",
  surface: "bg-surface border-y border-line",
  dark: "bg-navy",
};

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  tone?: Tone;
}

/** Vertical rhythm + background band. Every section is wrapped in one. */
export function Section({ tone = "light", className, ...props }: SectionProps) {
  return (
    <section className={cn("scroll-mt-20 py-16 md:py-20 lg:py-24", tones[tone], className)} {...props} />
  );
}
