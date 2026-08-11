import { DrawCheck } from "@/components/motion/DrawCheck";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
}

/** The ✓ bullet lists. Ticks draw themselves as the list scrolls in. */
export function CheckList({ items, className, itemClassName }: CheckListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li key={item} className={cn("text-ink flex items-start gap-3 text-[15px]", itemClassName)}>
          <DrawCheck index={i} className="text-success mt-[3px] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
