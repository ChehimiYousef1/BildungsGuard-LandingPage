import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowTone?: "blue" | "teal";
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — keep the document outline correct. */
  as?: "h2" | "h3";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "blue",
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-[13px] font-extrabold tracking-[0.09em] uppercase",
            eyebrowTone === "blue" ? "text-blue" : "text-teal",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "mt-3 font-extrabold",
          Tag === "h2" ? "text-[28px] leading-tight md:text-[34px]" : "text-2xl md:text-[30px]",
        )}
      >
        {title}
      </Tag>
      {description && <p className="mt-5 text-[17px] leading-7">{description}</p>}
    </div>
  );
}
