import { BrowserFrame } from "./BrowserFrame";
import { cn } from "@/lib/utils";

interface ScreenshotFrameProps {
  title: string;
  label: string;
  className?: string;
}

/**
 * Placeholder for a product screenshot, in the exact frame the real image will
 * use — swapping in <Image> later changes nothing around it.
 */
export function ScreenshotFrame({ title, label, className }: ScreenshotFrameProps) {
  return (
    <BrowserFrame title={title} className={cn("w-full max-w-[564px]", className)}>
      <div className="text-muted flex h-[280px] items-center justify-center bg-gradient-to-b from-[#FCFDFF] to-[#F6F9FC] text-xs md:h-[340px]">
        [ {label} ]
      </div>
    </BrowserFrame>
  );
}
