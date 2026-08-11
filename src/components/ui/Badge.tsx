import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  /** "light" sits on white sections, "dark" on the navy CTA/footer band. */
  tone?: "light" | "dark";
  className?: string;
}

/** The DSGVO / Server in Deutschland / SSL pills. */
export function Badge({ children, tone = "light", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-semibold",
        tone === "light"
          ? "border-line text-ink border bg-white"
          : "border border-white/15 bg-white/[0.06] text-white/85",
        className,
      )}
    >
      {tone === "light" && <span aria-hidden className="bg-teal size-[7px] rounded-full" />}
      {children}
    </span>
  );
}
