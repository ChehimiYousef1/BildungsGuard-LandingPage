import type { Metadata } from "next";
import { site } from "@/data/site";
import { getContent, type Locale } from "@/lib/i18n";

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
