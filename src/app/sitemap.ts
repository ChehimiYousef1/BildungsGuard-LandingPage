import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getLegal } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const de = getLegal("de");
  const en = getLegal("en");

  /** Each legal document paired with its counterpart in the other locale. */
  const legalPairs = [
    [de.imprint, en.imprint],
    [de.privacy, en.privacy],
    [de.terms, en.terms],
  ] as const;

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { de: site.url, en: `${site.url}/en` } },
    },
    { url: `${site.url}/en`, lastModified, changeFrequency: "monthly", priority: 0.9 },

    ...legalPairs.flatMap(([deDoc, enDoc]) => {
      const languages = { de: `${site.url}${deDoc.path}`, en: `${site.url}${enDoc.path}` };

      return [
        {
          url: `${site.url}${deDoc.path}`,
          lastModified: new Date(deDoc.updated),
          changeFrequency: "yearly" as const,
          priority: 0.3,
          alternates: { languages },
        },
        {
          url: `${site.url}${enDoc.path}`,
          lastModified: new Date(enDoc.updated),
          changeFrequency: "yearly" as const,
          priority: 0.2,
          alternates: { languages },
        },
      ];
    }),
  ];
}
