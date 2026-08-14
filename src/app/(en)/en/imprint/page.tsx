import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegal } from "@/lib/i18n";
import { legalMetadata } from "@/lib/seo";

const doc = getLegal("en").imprint;

export const metadata: Metadata = legalMetadata("en", doc);

export default function EnglishImprintPage() {
  return <LegalPage locale="en" doc={doc} />;
}
