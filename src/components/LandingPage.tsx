import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WebDemo } from "@/components/sections/WebDemo";
import { About } from "@/components/sections/About";
import { FeatureGroup } from "@/components/sections/FeatureGroup";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Modules } from "@/components/sections/Modules";
import { WhyUs } from "@/components/sections/WhyUs";
import { Security } from "@/components/sections/Security";
import { Insights } from "@/components/sections/Insights";
import { Faq } from "@/components/sections/Faq";
import { CallToAction } from "@/components/sections/CallToAction";
import { SECTION_IDS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/types/content";

/**
 * The whole landing page, composed from sections. Identical for every locale —
 * only the content dictionary changes.
 */
export function LandingPage({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <>
      <Navbar links={content.nav} cta={content.navCta} locale={locale} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <TrustBar content={content.trust} />
        <WebDemo content={content.demo} locale={locale} />
        <About content={content.about} />
        <FeatureGroup
          id={SECTION_IDS.audit}
          headingId="audit-heading"
          content={content.audit}
          tone="surface"
          animation="audit"
          dimensions={["1d", "3d"]}
        />
        <FeatureGroup
          id={SECTION_IDS.lms}
          headingId="lms-heading"
          content={content.lms}
          tone="light"
          animation="lms"
          dimensions={["2d", "3d"]}
        />
        <Benefits content={content.benefits} />
        <HowItWorks content={content.howItWorks} />
        <Modules content={content.modules} />
        <WhyUs content={content.why} />
        <Security content={content.security} />
        {/* Hidden until real customer quotes replace the placeholders. */}
        {/* <Testimonials content={content.testimonials} /> */}
        <Insights content={content.insights} />
        <Faq content={content.faq} />
        <CallToAction content={content.cta} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
