import { LandingPage } from "@/components/LandingPage";
import { getContent } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/seo";

export default function GermanHomePage() {
  return (
    <>
      <LandingPage content={getContent("de")} locale="de" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
    </>
  );
}
