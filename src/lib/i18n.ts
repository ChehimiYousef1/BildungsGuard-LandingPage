import { de } from "@/data/content/de";
import { en } from "@/data/content/en";
import type { SiteContent } from "@/types/content";

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

const dictionaries: Record<Locale, SiteContent> = { de, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

/** German is served at "/", English at "/en". */
export function pathFor(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
