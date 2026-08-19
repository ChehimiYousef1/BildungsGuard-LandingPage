import type { SiteContent } from "@/types/content";
import { SECTION_IDS } from "@/lib/constants";

/** English version. Typed against the same contract as de.ts, so a missing
 *  translation fails the build instead of shipping. */
export const en: SiteContent = {
  meta: {
    title: "BildungsGuard – The central LMS and audit platform for training providers",
    description:
      "BildungsGuard24 combines LMS and audit management in one platform: courses, learning " +
      "content, participants, learning progress and evidence – digital, centralized and audit-ready.",
  },

  nav: [
    { label: "Software", href: `#${SECTION_IDS.audit}` },
    { label: "Features", href: `#${SECTION_IDS.lms}` },
    { label: "Company", href: `#${SECTION_IDS.why}` },
    { label: "Resources", href: `#${SECTION_IDS.insights}` },
    { label: "FAQ", href: `#${SECTION_IDS.faq}` },
  ],
  navCta: "Book a web demo",

  hero: {
    headline: ["Organize learning.", "Track progress.", "Document with", "audit confidence."],
    subline: "From the first day of training to the audit.",
    body:
      "BildungsGuard combines LMS and audit management in one platform. Manage courses, " +
      "learning content, participants and learning progress while keeping attendance, evidence " +
      "and participant records centralized, digital and audit-ready.",
    primaryCta: "Book a web demo",
    secondaryCta: "Try for free",
    note: "free & non-binding – reply within one working day",
    preview: {
      title: "BildungsGuard · Overview",
      stats: [
        { label: "Active participants", value: "318", tone: "navy" },
        { label: "Attendance today", value: "94 %", tone: "success" },
        { label: "Open records", value: "2", tone: "blue" },
      ],
      trailTitle: "Audit trail · “Warehouse Specialist 26-B”",
      steps: ["Capture", "Sign", "Archive", "Audit"],
      footerText: "Class book W29 · digitally signed and archived",
      footerBadge: "audit-ready",
    },
  },

  trust: {
    headline:
      "Training providers across Germany already work with BildungsGuard. [PLACEHOLDER: number]",
    badges: [{ label: "GDPR-compliant" }, { label: "Servers in Germany" }, { label: "SSL encrypted" }],
  },

  demo: {
    eyebrow: "Web demo & consultation",
    heading: ["In 20 minutes you know", "whether BildungsGuard fits", "your organization."],
    body:
      "The short video gives you an overview of the platform. In the personal web demo we look " +
      "at your courses, your programs and your evidence requirements.",
    videoLabel: "Explainer video (16:9)",
    question: "How many programs are running in parallel right now?",
    options: ["1–2", "3–5", "6–10", "10+"],
    questionCta: "Free & non-binding consultation",
    form: {
      title: "Book a web demo",
      subtitle: "Pick your preferred slot – we confirm within one working day.",
      nameLabel: "Your name",
      namePlaceholder: "First and last name",
      emailLabel: "Business email",
      emailPlaceholder: "name@organisation.de",
      companyLabel: "Organisation",
      companyPlaceholder: "Name of your education provider",
      phoneLabel: "Phone",
      phonePlaceholder: "+49 …",
      dateLabel: "Preferred date",
      timeLabel: "Time",
      timePlaceholder: "Select …",
      programsLabel: "Parallel programmes",
      programsPlaceholder: "Select …",
      messageLabel: "Your message",
      messagePlaceholder: "What should we focus on during the demo?",
      privacyLabel: "I have read the",
      privacyLinkLabel: "privacy policy",
      privacyHref: "/en/privacy",
      optional: "optional",
      submit: "Book demo",
      submitting: "Sending …",
      note: "Free and without obligation. Your data is processed exclusively on servers in Germany.",
      successTitle: "Request received",
      success: "Thank you. We will get back to you with a confirmation within one working day.",
      successHint: "A confirmation is on its way to your inbox. You will receive the meeting link together with the appointment confirmation.",
      errorGeneric: "Your request could not be sent. Please try again later.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        company: "Please enter your organisation.",
        date: "Please choose a preferred date.",
        datePast: "Please choose a date in the future.",
        time: "Please choose a time.",
        privacy: "Please accept the privacy policy.",
        tooLong: "This entry is too long.",
      },
    },
  },

  about: {
    eyebrow: "What we stand for",
    statement: [
      "We believe training providers should spend their time on",
      "teaching and learning outcomes — not on separate systems",
      "and paperwork.",
    ],
    body:
      "That is why BildungsGuard combines learning management, course organization and " +
      "audit-ready documentation in one central platform.",
  },

  audit: {
    eyebrow: "Audit & documentation",
    heading: "Documented end to end – from entry to export.",
    intro:
      "Every attendance record, every piece of evidence and every participant file is stored so " +
      "that an audit becomes an export rather than a project.",
    features: [
      {
        eyebrow: "Dashboard & analytics",
        title: ["Course status and learning", "progress – live"],
        description:
          "Course status, learning progress, attendance rates, outstanding evidence and active " +
          "programs at a glance. The dashboard highlights both learning activity and " +
          "audit-related actions that need attention.",
        bullets: [
          "Key figures per course, program, class and location",
          "Learning progress and participation rates per participant",
          "PDF reports for accredited certification bodies",
        ],
        frameTitle: "Dashboard",
        screenshotLabel: "BildungsGuard dashboard with course status and learning progress",
        image: "/images/screens/dashboard.webp",
      },
      {
        eyebrow: "Digital class book",
        title: ["Document teaching and", "attendance centrally"],
        description:
          "Instructors document lesson content and attendance digitally. Entries are signed and " +
          "securely archived, while documentation remains connected to the relevant courses and " +
          "participants.",
        bullets: [
          "Digital signature by instructors and participants",
          "Absences with excuse management",
          "Automatic teaching-unit calculation per course and program",
        ],
        frameTitle: "Class book",
        screenshotLabel: "Digital class book with attendance and signatures",
        image: "/images/screens/class-book.webp",
      },
    ],
  },

  lms: {
    eyebrow: "Learning management",
    heading: "Courses, content and learning progress in one system.",
    intro:
      "Organize learning content, run your teaching and track progress – without losing sight " +
      "of the documentation.",
    features: [
      {
        eyebrow: "Participants & learning progress",
        title: ["Courses, learning progress", "and records – in one place"],
        description:
          "Courses, learning progress, education vouchers, funding data, documents and " +
          "certificates are organized in one central participant record. Deadlines and required " +
          "evidence remain visible at all times.",
        bullets: [
          "Digital participant records with deadline alerts",
          "Learning progress, completions and certificates per record",
          "PDF export of absence lists for the employment agency",
        ],
        frameTitle: "Participant record",
        screenshotLabel: "Participant record with funding data, documents and certificates",
        image: "/images/screens/participant-record.webp",
      },
      {
        eyebrow: "Online learning room",
        title: ["Learn, teach and participate", "in the browser"],
        description:
          "The integrated online learning room, hosted in Germany, connects live teaching, " +
          "learning content and participation with central course and participant management. " +
          "Attendance times flow directly into the documentation.",
        bullets: [
          "GDPR-compliant video conferencing without US third parties",
          "Learning content, materials and assignments inside the course",
          "Automatic attendance protocols",
        ],
        frameTitle: "Online learning room",
        screenshotLabel: "Online learning room with live session, agenda and attendance",
        image: "/images/screens/learning-room.webp",
      },
    ],
  },

  benefits: {
    heading: ["LMS and audit management", "in one place."],
    body:
      "BildungsGuard connects digital learning, course management, participant management and " +
      "audit-ready documentation in one central platform.",
    bullets: [
      "Manage courses, programs and participants centrally",
      "Document class books and teaching units",
      "Organize learning content and teaching digitally",
      "Keep absences, evidence and deadlines under control",
      "Track learning progress and participation transparently",
      "Create audit-ready reports and exports",
    ],
    badges: [{ label: "GDPR-compliant" }, { label: "Servers in Germany" }, { label: "SSL encrypted" }],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Productive in four steps.",
    body: "From the first conversation to daily operation – with a dedicated contact person.",
    steps: [
      {
        title: "Web demo & analysis",
        description:
          "We look at your programs, locations and evidence requirements and show the platform " +
          "using your own examples.",
      },
      {
        title: "Setup & data migration",
        description:
          "Participants, courses and programs are imported from Excel or CSV. We configure " +
          "roles and locations together.",
      },
      {
        title: "Team training",
        description:
          "Administrators and instructors are onboarded in short sessions – no IT background " +
          "and no project weeks required.",
      },
      {
        title: "Operation & audit",
        description:
          "The audit trail builds itself during daily work. At audit time you export instead of " +
          "collecting folders.",
      },
    ],
  },

  modules: {
    heading: "Six modules. One system.",
    body:
      "Every module connects to the next – instead of six isolated tools you have to explain " +
      "one by one in the audit.",
    items: [
      {
        code: "PP",
        title: "Participants & Program Management",
        description: "Manage courses, programs, participants, funding data and histories centrally.",
        tone: "blue",
      },
      {
        code: "DA",
        title: "Digital Class Book & Attendance",
        description: "Document teaching, record attendance, sign digitally and archive securely for audits.",
        tone: "blue",
      },
      {
        code: "CL",
        title: "Courses & Learning Content",
        description: "Organize and provide learning modules, materials, assignments and content centrally.",
        tone: "blue",
      },
      {
        code: "ML",
        title: "Monitoring & learning progress",
        description:
          "Track learning progress, participation rates, completions and program goals transparently.",
        tone: "teal",
      },
      {
        code: "ED",
        title: "Evidence & Documentation",
        description: "Manage documents, evidence and revision-safe exports centrally.",
        tone: "teal",
      },
      {
        code: "AA",
        title: "Audit & AZAV",
        description:
          "Bring audit-relevant information together in a structured way, aligned with AZAV requirements.",
        tone: "teal",
      },
    ],
  },

  why: {
    eyebrow: "Company",
    heading: "Why BildungsGuard?",
    body:
      "One platform for learning, administration and quality assurance. BildungsGuard was " +
      "developed for training providers that want to organize learning processes efficiently " +
      "while reliably meeting documentation and evidence requirements.",
    pillars: [
      {
        title: "AZAV Expertise",
        description:
          "Our team knows program accreditation, certification bodies and audits first hand. " +
          "Every feature is built along real audit requirements – not on a drawing board.",
        accent: "teal",
      },
      {
        title: "Personal Support",
        description:
          "From onboarding to audit day you have a dedicated contact person. Support by phone " +
          "and e-mail, in German, without ticket queues.",
        accent: "blue",
      },
      {
        title: "Transparent Pricing",
        description:
          "One price based on participant numbers and modules, cancellable monthly, no hidden " +
          "costs. You receive the written offer after the demo.",
        accent: "navy",
      },
    ],
  },

  security: {
    eyebrow: "Security & compliance",
    heading: "Data that stays where it belongs.",
    body:
      "Training providers work with highly sensitive data. BildungsGuard is built for that – " +
      "technically and organizationally.",
    items: [
      {
        title: "Servers in Germany",
        icon: "hosting",
        description:
          "Operation and data storage exclusively in German data centres, with no transfer to " +
          "third countries.",
      },
      {
        title: "GDPR by design",
        icon: "privacy",
        description:
          "Roles and permissions, deletion periods and data processing agreements are part of " +
          "the platform, not an add-on.",
      },
      {
        title: "Revision-safe archiving",
        icon: "archive",
        description: "Signed entries, traceable changes and exports that certification bodies accept.",
      },
      {
        title: "Encrypted transmission",
        icon: "transport",
        description: "SSL/TLS on every connection, encrypted backups and regular restore testing.",
      },
    ],
    badges: [
      { label: "GDPR-compliant" },
      { label: "Servers in Germany" },
      { label: "SSL encrypted" },
      { label: "AZAV-compliant" },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    heading: "What training providers report",
    items: [
      {
        quote:
          "“[PLACEHOLDER: long-form quote – e.g. experience from the last audit, concrete time " +
          "savings in daily administration.]”",
        name: "[PLACEHOLDER: name]",
        role: "[Managing director, training provider]",
      },
      {
        quote: "“[PLACEHOLDER: long-form quote – e.g. switching from Excel/paper, how the migration went.]”",
        name: "[PLACEHOLDER: name]",
        role: "[Head of administration]",
      },
      {
        quote:
          "“[PLACEHOLDER: long-form quote – e.g. an instructor's view on courses and the digital " +
          "class book.]”",
        name: "[PLACEHOLDER: name]",
        role: "[Instructor]",
      },
      {
        quote:
          "“[PLACEHOLDER: long-form quote – e.g. data protection and server location as a " +
          "decision factor.]”",
        name: "[PLACEHOLDER: name]",
        role: "[Quality management]",
      },
    ],
  },

  insights: {
    eyebrow: "Resources",
    heading: "Guides for training providers",
    allLabel: "All articles",
    items: [
      {
        tag: "AZAV",
        tone: "teal",
        title: "The digital class book: what certification bodies really check",
        excerpt: "Which requirements apply to attendance records – and how to meet them without paper.",
        readMore: "Read more",
      },
      {
        tag: "GDPR",
        tone: "blue",
        title: "Managing participant data safely: the 5 most common mistakes",
        excerpt: "From filing to deletion deadlines: what matters for personal data in funded programs.",
        readMore: "Read more",
      },
      {
        tag: "Practice",
        tone: "navy",
        title: "From paper folders to a platform: migration in four weeks",
        excerpt: "A realistic roadmap for the switch – including data transfer and instructor training.",
        readMore: "Read more",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    items: [
      {
        question: "What is BildungsGuard and who is it for?",
        answer:
          "BildungsGuard is a central LMS and audit platform for training providers. " +
          "Administrators, instructors and participants work in one system that brings together " +
          "courses, learning content, learning progress, programs, participant records, class " +
          "books and evidence digitally.",
        defaultOpen: true,
      },
      {
        question: "Which processes can I digitize?",
        answer:
          "From course and participant management to learning content, teaching, attendance and " +
          "learning progress, as well as evidence, documentation and audit preparation, key " +
          "processes can be managed in BildungsGuard.",
        defaultOpen: true,
      },
      {
        question: "How does BildungsGuard support learning?",
        answer:
          "Courses, learning content, participants and learning progress can be organized " +
          "centrally. Instructors and administrators gain a shared overview of the learning process.",
        defaultOpen: true,
      },
      {
        question: "Was the platform built specifically for AZAV?",
        answer:
          "The processes follow the requirements of accredited programs. Documentation, evidence " +
          "and exports are built along AZAV practice.",
      },
      {
        question: "Is BildungsGuard also suitable for QCG-funded programmes?",
        answer:
          "Yes. Programs, funding data and evidence requirements can be managed regardless of " +
          "the funding framework.",
      },
      {
        question: "Where is our data stored and how secure is it?",
        answer:
          "All data is processed exclusively in German data centres, transmitted encrypted and " +
          "backed up regularly.",
      },
      {
        question: "Does the digital class book fully replace the paper form?",
        answer:
          "Entries are signed digitally and archived in a revision-safe way, which produces a " +
          "complete digital audit trail.",
      },
      {
        question: "How long does implementation take?",
        answer: "From setup through data migration to training, most organizations plan for a few weeks.",
      },
      {
        question: "Can we import existing participant data?",
        answer: "Existing lists can be imported from Excel or CSV, including program and funding data.",
      },
      {
        question: "How does BildungsGuard specifically help with audits?",
        answer:
          "Audit-relevant participant data, attendance, class books, evidence and documentation " +
          "are managed centrally and can be prepared in a structured way for reviews and reporting.",
        defaultOpen: true,
      },
      {
        question: "Do our instructors need training?",
        answer:
          "A short introduction is enough. The interface is built around everyday teaching and " +
          "requires no IT background.",
      },
    ],
  },

  cta: {
    heading: ["Your training. Your LMS.", "Your audit. One platform."],
    body:
      "Experience BildungsGuard in a web demo and see how learning management and audit-ready " +
      "documentation work together in one system.",
    primaryCta: "Book a web demo",
    secondaryCta: "Try for free",
    note: "Free & non-binding · reply within one working day",
  },

  footer: {
    description:
      "The central LMS and audit platform for training providers. Courses, learning content, " +
      "participants, programs and evidence — digital, centralized and audit-ready.",
    columns: [
      {
        title: "Site",
        links: [
          { label: "Home", href: `#${SECTION_IDS.hero}` },
          { label: "Web demo & consultation", href: `#${SECTION_IDS.demo}` },
          { label: "Software", href: `#${SECTION_IDS.audit}` },
          { label: "Features", href: `#${SECTION_IDS.lms}` },
          { label: "Why BildungsGuard", href: `#${SECTION_IDS.why}` },
          { label: "FAQ", href: `#${SECTION_IDS.faq}` },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "info@bildungsguard.de", href: "mailto:info@bildungsguard.de" },
          { label: "Documentation", href: "#" },
          { label: "Report an issue", href: "#" },
        ],
      },
      {
        title: "More links",
        links: [
          { label: "Blog", href: `#${SECTION_IDS.insights}` },
          { label: "Login", href: "#" },
          { label: "Book a consultation", href: `#${SECTION_IDS.demo}` },
          { label: "Try for free", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Imprint", href: "/en/imprint" },
          { label: "Privacy", href: "/en/privacy" },
          { label: "Cookies", href: "/en/privacy#cookies" },
          { label: "Terms", href: "/en/terms" },
        ],
      },
    ],
    badges: [
      { label: "GDPR-compliant" },
      { label: "Servers in Germany" },
      { label: "SSL encrypted" },
      { label: "AZAV-compliant" },
    ],
    copyright: "© 2026 BildungsGuard GmbH. All rights reserved.",
    copyrightRight: "Developed and hosted in Germany.",
  },
};
