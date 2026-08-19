import { de } from "@/data/content/de";
import { en } from "@/data/content/en";
import { legalDe } from "@/data/legal/de";
import { legalEn } from "@/data/legal/en";
import type { SiteContent } from "@/types/content";
import type { LegalContent } from "@/types/legal";

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";

const dictionaries: Record<Locale, SiteContent> = { de, en };
const legalDictionaries: Record<Locale, LegalContent> = { de: legalDe, en: legalEn };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

/** Narrow an untrusted string — a header, a query param — to a Locale. */
export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Imprint, privacy policy and terms for one locale. */
export function getLegal(locale: Locale): LegalContent {
  return legalDictionaries[locale];
}

/** German is served at "/", English at "/en". */
export function pathFor(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}
