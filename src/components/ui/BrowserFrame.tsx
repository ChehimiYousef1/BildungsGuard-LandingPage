import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  /** Label shown in the navy title bar. */
  title: string;
  children: React.ReactNode;
  className?: string;
}

/** The app-window chrome used for every product screenshot in the design. */
export function BrowserFrame({ title, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "border-line overflow-hidden rounded-[var(--radius-frame)] border bg-white shadow-[0_24px_60px_rgba(15,42,71,0.10)]",
        className,
      )}
    >
      <div className="bg-navy flex h-[34px] items-center gap-2 px-4">
        <span aria-hidden className="size-2 rounded-full bg-[#54708F]" />
        <span aria-hidden className="size-2 rounded-full bg-[#54708F]" />
        <span className="ml-1.5 text-xs font-bold text-white">{title}</span>
      </div>
      {children}
    </div>
  );
}
