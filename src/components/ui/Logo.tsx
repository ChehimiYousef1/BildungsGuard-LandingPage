import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Rendered height. Width follows from the file's own aspect ratio. */
  className?: string;
  /** Set on the logo above the fold — it is part of the LCP. */
  priority?: boolean;
}

/**
 * The one place the logo file is referenced.
 *
 * The import is static, so Next reads the real intrinsic dimensions from the
 * file instead of us hand-writing a width/height pair that has to match its
 * aspect ratio — getting that pair wrong is what produced the "width or height
 * modified, but not the other" warning. Height comes from `className`, width
 * stays `auto`.
 *
 * Swapping in the SVG from Figma later is a one-line change here.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Bildungs Guard"
      priority={priority}
      className={cn("w-auto", className)}
    />
  );
}
