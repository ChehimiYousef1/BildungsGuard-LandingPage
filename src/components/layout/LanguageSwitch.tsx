import Link from "next/link";
import { LOCALES, pathFor, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  active: Locale;
  className?: string;
}

/** Real navigation: German is served at "/", English at "/en". */
export function LanguageSwitch({ active, className }: LanguageSwitchProps) {
  return (
    <div className={cn("border-line flex overflow-hidden rounded-[9px] border", className)}>
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={pathFor(locale)}
          hrefLang={locale}
          aria-current={active === locale ? "true" : undefined}
          className={cn(
            "px-3.5 py-2 text-[13px] font-bold uppercase transition-colors",
            active === locale ? "bg-navy text-white" : "text-body hover:bg-surface bg-white",
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
