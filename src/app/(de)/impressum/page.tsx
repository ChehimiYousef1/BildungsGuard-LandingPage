import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegal } from "@/lib/i18n";
import { legalMetadata } from "@/lib/seo";

const doc = getLegal("de").imprint;

export const metadata: Metadata = legalMetadata("de", doc);

export default function GermanImprintPage() {
  return <LegalPage locale="de" doc={doc} />;
}
