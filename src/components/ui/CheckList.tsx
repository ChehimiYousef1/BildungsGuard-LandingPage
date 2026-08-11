import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
}

/** The ✓ bullet lists used in the feature and benefit sections. */
export function CheckList({ items, className, itemClassName }: CheckListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("text-ink flex items-start gap-3 text-[15px]", itemClassName)}>
          <Check aria-hidden className="text-success mt-[3px] size-[15px] shrink-0" strokeWidth={3} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
