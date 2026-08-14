import Image from "next/image";

import { BrowserFrame } from "./BrowserFrame";
import { cn } from "@/lib/utils";

interface ScreenshotFrameProps {
  title: string;
  /** Alt text for a real screenshot, or the placeholder caption when `src` is absent. */
  label: string;
  /** Path under /public. When omitted the frame falls back to the placeholder box. */
  src?: string;
  /** Load the first frame eagerly when it sits high on the page. */
  priority?: boolean;
  className?: string;
}

/** Intrinsic size of the exported product screenshots (4:3). */
const SHOT_WIDTH = 1448;
const SHOT_HEIGHT = 1086;

/**
 * The app-window frame used for every product screenshot. With `src` it renders
 * the real image at its natural aspect ratio; without it, the placeholder box
 * the design was built against.
 */
export function ScreenshotFrame({ title, label, src, priority = false, className }: ScreenshotFrameProps) {
  return (
    <BrowserFrame title={title} className={cn("w-full max-w-[564px]", className)}>
      {src ? (
        <Image
          src={src}
          alt={label}
          width={SHOT_WIDTH}
          height={SHOT_HEIGHT}
          sizes="(min-width: 1024px) 564px, 100vw"
          priority={priority}
          className="block h-auto w-full"
        />
      ) : (
        <div className="text-muted flex h-[280px] items-center justify-center bg-gradient-to-b from-[#FCFDFF] to-[#F6F9FC] text-xs md:h-[340px]">
          [ {label} ]
        </div>
      )}
    </BrowserFrame>
  );
}
