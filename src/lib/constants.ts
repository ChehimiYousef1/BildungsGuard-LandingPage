/** Anchor ids — the navbar links to these and each section uses them. */
export const SECTION_IDS = {
  hero: "start",
  demo: "webdemo",
  about: "ueber-uns",
  audit: "audit",
  lms: "lms",
  benefits: "plattform",
  howItWorks: "ablauf",
  modules: "module",
  why: "warum",
  security: "sicherheit",
  testimonials: "stimmen",
  insights: "wissen",
  faq: "faq",
  cta: "demo",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
