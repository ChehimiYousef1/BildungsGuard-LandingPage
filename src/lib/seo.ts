import type { Metadata } from "next";
import { site } from "@/data/site";
import { getContent, type Locale } from "@/lib/i18n";
import type { LegalDocument } from "@/types/legal";

/** Metadata for one locale, including hreflang alternates. */
export function metadataFor(locale: Locale): Metadata {
  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: locale === "de" ? "/" : "/en",
      languages: { de: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      url: locale === "de" ? site.url : `${site.url}/en`,
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

/** Metadata for one legal document, with the other locale as its alternate. */
export function legalMetadata(locale: Locale, doc: LegalDocument): Metadata {
  const de = locale === "de" ? doc.path : doc.altPath;
  const en = locale === "en" ? doc.path : doc.altPath;

  return {
    metadataBase: new URL(site.url),
    title: `${doc.title} | ${site.name}`,
    description: doc.description,
    alternates: { canonical: doc.path, languages: { de, en, "x-default": de } },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      url: `${site.url}${doc.path}`,
      title: doc.title,
      description: doc.description,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Serialise a JSON-LD object for injection into a <script> tag.
 *
 * `<` is escaped so a string in the payload can never close the script element
 * early — the only way structured-data markup can turn into an injection point.
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Organization + SoftwareApplication markup, injected once per page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: site.url,
    publisher: { "@type": "Organization", name: `${site.name} GmbH`, email: site.email },
  };
}
