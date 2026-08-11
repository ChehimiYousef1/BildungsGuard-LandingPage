import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-button)] font-bold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-blue text-white shadow-[0_6px_18px_rgba(37,99,235,0.20)] hover:bg-blue-dark",
        ghost: "border border-line bg-white text-navy hover:bg-surface",
        dark: "border border-navy-line bg-navy-soft text-white hover:bg-navy-line",
      },
      size: {
        sm: "px-[22px] py-3 text-sm",
        md: "px-[30px] py-[17px] text-base",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", full: false },
  },
);

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof button> {}

export function Button({ className, variant, size, full, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size, full }), className)} {...props} />;
}

export interface ButtonLinkProps extends React.ComponentPropsWithoutRef<"a">, VariantProps<typeof button> {}

/** Same visual contract as Button, for anchors and CTAs that navigate. */
export function ButtonLink({ className, variant, size, full, ...props }: ButtonLinkProps) {
  return <a className={cn(button({ variant, size, full }), className)} {...props} />;
}
