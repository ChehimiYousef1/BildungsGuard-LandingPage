import { cn } from "@/lib/utils";

type Width = "default" | "narrow" | "faq";

const widths: Record<Width, string> = {
  default: "max-w-[1326px]",
  narrow: "max-w-[1278px]",
  faq: "max-w-[1140px]",
};

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  width?: Width;
}

/** Horizontal rhythm. Widths come from the Figma grid — do not inline them. */
export function Container({ width = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6", widths[width], className)} {...props} />;
}
