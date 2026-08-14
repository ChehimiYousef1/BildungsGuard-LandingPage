export interface NavLink {
  label: string;
  href: string;
}

export interface TrustBadge {
  label: string;
}

/* ------------------------------------------------------------------ hero */

export interface HeroContent {
  headline: string[];
  subline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
  preview: {
    title: string;
    stats: { label: string; value: string; tone: "navy" | "success" | "blue" }[];
    trailTitle: string;
    steps: string[];
    footerText: string;
    footerBadge: string;
  };
}

export interface TrustContent {
  headline: string;
  badges: TrustBadge[];
}

/* ------------------------------------------------------------- web demo */

export interface DemoContent {
  eyebrow: string;
  heading: string[];
  body: string;
  videoLabel: string;
  question: string;
  options: string[];
  questionCta: string;
  form: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    timePlaceholder: string;
    submit: string;
    note: string;
    success: string;
  };
}

/* --------------------------------------------------------------- content */

export interface AboutContent {
  eyebrow: string;
  statement: string[];
  body: string;
}

export interface Feature {
  eyebrow: string;
  title: string[];
  description: string;
  bullets: string[];
  frameTitle: string;
  /** Alt text for the screenshot; also the placeholder caption when `image` is unset. */
  screenshotLabel: string;
  /** Path under /public to the real product screenshot. */
  image?: string;
}

export interface FeatureGroupContent {
  eyebrow: string;
  heading: string;
  intro?: string;
  features: Feature[];
}

export interface BenefitsContent {
  heading: string[];
  body: string;
  bullets: string[];
  badges: TrustBadge[];
}

export interface StepItem {
  title: string;
  description: string;
}

export interface HowItWorksContent {
  eyebrow: string;
  heading: string;
  body: string;
  steps: StepItem[];
}

export interface ModuleItem {
  code: string;
  title: string;
  description: string;
  tone: "blue" | "teal";
}

export interface ModulesContent {
  heading: string;
  body: string;
  items: ModuleItem[];
}

export interface Pillar {
  title: string;
  description: string;
  accent: "teal" | "blue" | "navy";
}

export interface WhyContent {
  eyebrow: string;
  heading: string;
  body: string;
  pillars: Pillar[];
}

/** Icon key for a security claim — resolved to a Lucide icon in the section. */
export type SecurityIcon = "hosting" | "privacy" | "archive" | "transport";

export interface SecurityItem {
  title: string;
  description: string;
  icon: SecurityIcon;
}

export interface SecurityContent {
  eyebrow: string;
  heading: string;
  body: string;
  items: SecurityItem[];
  badges: TrustBadge[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  heading: string;
  items: Testimonial[];
}

export interface Article {
  tag: string;
  tone: "teal" | "blue" | "navy";
  title: string;
  excerpt: string;
  readMore: string;
}

export interface InsightsContent {
  eyebrow: string;
  heading: string;
  allLabel: string;
  items: Article[];
}

export interface FaqItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FaqContent {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}

export interface CtaContent {
  heading: string[];
  body: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterContent {
  description: string;
  columns: FooterColumn[];
  badges: TrustBadge[];
  copyright: string;
  copyrightRight: string;
}

/**
 * The contract every locale file must satisfy. Sections receive slices of this
 * as props — no page copy is ever written inside a component.
 */
export interface SiteContent {
  meta: { title: string; description: string };
  nav: NavLink[];
  navCta: string;
  hero: HeroContent;
  trust: TrustContent;
  demo: DemoContent;
  about: AboutContent;
  audit: FeatureGroupContent;
  lms: FeatureGroupContent;
  benefits: BenefitsContent;
  howItWorks: HowItWorksContent;
  modules: ModulesContent;
  why: WhyContent;
  security: SecurityContent;
  testimonials: TestimonialsContent;
  insights: InsightsContent;
  faq: FaqContent;
  cta: CtaContent;
  footer: FooterContent;
}
