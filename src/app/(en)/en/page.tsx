import { LandingPage } from "@/components/LandingPage";
import { getContent } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/seo";

export default function EnglishHomePage() {
  return (
    <>
      <LandingPage content={getContent("en")} locale="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
    </>
  );
}
