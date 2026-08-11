import { cn } from "@/lib/utils";

type CardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  /** Adds hover feedback. Use on cards the visitor can act on. */
  interactive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * White surface used by module, testimonial, article and form cards.
 * `as` keeps the markup semantic (e.g. <figure> for a quote).
 */
export function Card<T extends React.ElementType = "div">({
  as,
  className,
  interactive = false,
  ...props
}: CardProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag
      className={cn(
        "border-line rounded-[var(--radius-card)] border bg-white shadow-[0_1px_2px_rgba(15,42,71,0.04)]",
        interactive &&
          "hover:border-blue/25 transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,42,71,0.10)] motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}
