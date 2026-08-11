import { cn } from "@/lib/utils";

type CardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * White surface used by module, testimonial, article and form cards.
 * `as` keeps the markup semantic (e.g. <figure> for a quote).
 */
export function Card<T extends React.ElementType = "div">({ as, className, ...props }: CardProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag
      className={cn(
        "border-line rounded-[var(--radius-card)] border bg-white shadow-[0_1px_2px_rgba(15,42,71,0.04)]",
        className,
      )}
      {...props}
    />
  );
}
