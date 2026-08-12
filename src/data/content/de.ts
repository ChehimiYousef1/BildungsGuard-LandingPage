import type { SiteContent } from "@/types/content";
import { SECTION_IDS } from "@/lib/constants";

/** Deutsche Fassung — Standardsprache. Sämtliche Seitentexte stehen hier. */
export const de: SiteContent = {
  meta: {
    title: "Bildungs Guard – Die zentrale LMS- und Audit-Plattform für Bildungsträger",
    description:
      "Bildungs Guard verbindet LMS und Auditmanagement in einer Plattform: Kurse, Lerninhalte, " +
      "Teilnehmende, Lernfortschritte und Nachweise – digital, zentral und prüfsicher.",
  },

  nav: [
    { label: "Software", href: `#${SECTION_IDS.audit}` },
    { label: "Funktionen", href: `#${SECTION_IDS.lms}` },
    { label: "Unternehmen", href: `#${SECTION_IDS.why}` },
    { label: "Wissen", href: `#${SECTION_IDS.insights}` },
    { label: "FAQ", href: `#${SECTION_IDS.faq}` },
  ],
  navCta: "Webdemo vereinbaren",

  hero: {
    headline: ["Lernen organisieren.", "Fortschritt verfolgen.", "Prüfsicher dokumentiert."],
    subline: "Vom ersten Kurstag bis zum Audit.",
    body:
      "Bildungs Guard verbindet LMS und Auditmanagement in einer Plattform. Kurse, Lerninhalte, " +
      "Teilnehmende und Lernfortschritte verwalten – und Anwesenheiten, Nachweise und " +
      "Teilnehmerakten bleiben zentral, digital und jederzeit auditbereit.",
    primaryCta: "Webdemo vereinbaren",
    secondaryCta: "Kostenlos testen",
    note: "kostenfrei & unverbindlich – Antwort innerhalb eines Werktags",
    preview: {
      title: "Bildungs Guard · Übersicht",
      stats: [
        { label: "Aktive Teilnehmende", value: "318", tone: "navy" },
        { label: "Anwesenheit heute", value: "94 %", tone: "success" },
        { label: "Offene Nachweise", value: "2", tone: "blue" },
      ],
      trailTitle: "Prüfpfad · „Fachkraft Lager 26-B“",
      steps: ["Erfassen", "Signieren", "Archivieren", "Audit"],
      footerText: "Klassenbuch KW 29 · digital signiert und archiviert",
      footerBadge: "prüfsicher",
    },
  },

  trust: {
    headline: "Bildungsträger in ganz Deutschland arbeiten bereits mit Bildungs Guard.",
    badges: [{ label: "DSGVO-konform" }, { label: "Server in Deutschland" }, { label: "SSL-verschlüsselt" }],
  },

  demo: {
    eyebrow: "Webdemo & Beratung",
    heading: ["In 20 Minuten wissen", "Sie, ob Bildungs Guard zu", "Ihrer Einrichtung passt."],
    body:
      "Im kurzen Video sehen Sie die Plattform im Überblick. In der persönlichen Webdemo gehen " +
      "wir auf Ihre Kurse, Ihre Maßnahmen und Ihre Nachweispflichten ein.",
    videoLabel: "Erklärvideo (16:9)",
    question: "Wie viele Maßnahmen laufen aktuell zeitgleich bei Ihnen?",
    options: ["1–2", "3–5", "6–10", "10+"],
    questionCta: "Unverbindliche & kostenfreie Beratung",
    form: {
      title: "Webdemo vereinbaren",
      subtitle: "Wählen Sie Ihren Wunschtermin – wir bestätigen innerhalb eines Werktags.",
      nameLabel: "Ihr Name",
      namePlaceholder: "Vor- und Nachname",
      emailLabel: "Geschäftliche E-Mail",
      emailPlaceholder: "name@einrichtung.de",
      dateLabel: "Wunschtermin",
      timeLabel: "Uhrzeit",
      timePlaceholder: "Auswählen …",
      submit: "Demo buchen",
      note: "Kostenfrei & unverbindlich. Ihre Daten werden ausschließlich auf Servern in Deutschland verarbeitet.",
      success: "Vielen Dank. Wir melden uns innerhalb eines Werktags mit einer Bestätigung.",
    },
  },

  about: {
    eyebrow: "Wofür wir stehen",
    statement: [
      "Wir glauben, dass Bildungsträger ihre Zeit in Unterricht und",
      "Lernerfolg stecken sollten – nicht in getrennte Systeme und",
      "Papierablagen.",
    ],
    body:
      "Deshalb verbindet Bildungs Guard Lernmanagement, Kursorganisation und prüfsichere " +
      "Dokumentation in einer zentralen Plattform.",
  },

  audit: {
    eyebrow: "Audit & Dokumentation",
    heading: "Lückenlos dokumentiert – vom Eintrag bis zum Export.",
    intro:
      "Jede Anwesenheit, jeder Nachweis und jede Akte wird so abgelegt, dass ein Audit kein " +
      "Projekt mehr ist, sondern ein Export.",
    features: [
      {
        eyebrow: "Dashboard & Auswertungen",
        title: ["Kursstatus und Lernfortschritt", "– live"],
        description:
          "Kursstatus, Lernfortschritte, Anwesenheitsquoten, offene Nachweise und laufende " +
          "Maßnahmen auf einen Blick. Das Dashboard zeigt Lernaktivität und auditrelevanten " +
          "Handlungsbedarf, bevor er im Audit auffällt.",
        bullets: [
          "Kennzahlen je Kurs, Maßnahme, Klasse und Standort",
          "Lernfortschritt und Teilnahmequoten je Teilnehmer:in",
          "PDF-Auswertungen für fachkundige Stellen",
        ],
        frameTitle: "Dashboard",
        screenshotLabel: "Screenshot: Dashboard",
      },
      {
        eyebrow: "Digitales Klassenbuch",
        title: ["Unterricht und Anwesenheit", "zentral dokumentiert"],
        description:
          "Dozenten dokumentieren Unterrichtsinhalte und Anwesenheiten digital. Jeder Eintrag " +
          "wird signiert und revisionssicher archiviert – und bleibt mit den zugehörigen Kursen " +
          "und Teilnehmenden verknüpft.",
        bullets: [
          "Digitale Signatur von Dozenten und Teilnehmenden",
          "Fehlzeiten mit Entschuldigungsverwaltung",
          "Automatische UE-Berechnung je Kurs und Maßnahme",
        ],
        frameTitle: "Klassenbuch",
        screenshotLabel: "Screenshot: Klassenbuch",
      },
    ],
  },

  lms: {
    eyebrow: "Lernmanagement",
    heading: "Kurse, Inhalte und Lernfortschritt in einem System.",
    intro:
      "Lerninhalte organisieren, Unterricht durchführen und Fortschritte verfolgen – ohne die " +
      "Dokumentation aus den Augen zu verlieren.",
    features: [
      {
        eyebrow: "Teilnehmer & Lernfortschritt",
        title: ["Kurse, Lernfortschritt und", "Akte – an einem Ort"],
        description:
          "Kurse, Lernfortschritte, Bildungsgutscheine, Förderdaten, Dokumente und Zertifikate " +
          "liegen strukturiert in einer zentralen Teilnehmerakte. Fristen und erforderliche " +
          "Nachweise bleiben jederzeit sichtbar.",
        bullets: [
          "Digitale Teilnehmerakten mit Fristenwarnung",
          "Lernfortschritt, Abschlüsse und Zertifikate je Akte",
          "PDF-Export von Fehlzeitenlisten für die Agentur für Arbeit",
        ],
        frameTitle: "Teilnehmerakte",
        screenshotLabel: "Screenshot: Teilnehmerakte",
      },
      {
        eyebrow: "Online-Lernraum",
        title: ["Lernen und unterrichten", "im Browser"],
        description:
          "Der integrierte, in Deutschland gehostete Lernraum verbindet Live-Unterricht, " +
          "Lerninhalte und Teilnahme mit der zentralen Kurs- und Teilnehmerverwaltung. " +
          "Teilnahmezeiten fließen direkt in die Dokumentation.",
        bullets: [
          "DSGVO-konforme Videokonferenz ohne US-Drittanbieter",
          "Lerninhalte, Materialien und Aufgaben direkt im Kurs",
          "Automatische Anwesenheitsprotokolle",
        ],
        frameTitle: "Online-Lernraum",
        screenshotLabel: "Screenshot: Lernraum",
      },
    ],
  },

  benefits: {
    heading: ["LMS und Auditmanagement –", "an einem Ort."],
    body:
      "Bildungs Guard verbindet digitales Lernen, Kursverwaltung, Teilnehmerverwaltung und " +
      "prüfsichere Dokumentation in einer zentralen Plattform.",
    bullets: [
      "Kurse, Maßnahmen und Teilnehmende zentral verwalten",
      "Klassenbücher & Unterrichtseinheiten dokumentieren",
      "Lerninhalte und Unterricht digital organisieren",
      "Fehlzeiten, Nachweise & Fristen unter Kontrolle behalten",
      "Lernfortschritt und Teilnahme transparent verfolgen",
      "Prüfsichere Auswertungen und Exporte erstellen",
    ],
    badges: [{ label: "DSGVO-konform" }, { label: "Server in Deutschland" }, { label: "SSL-verschlüsselt" }],
  },

  howItWorks: {
    eyebrow: "Ablauf",
    heading: "In vier Schritten produktiv.",
    body: "Vom ersten Gespräch bis zum laufenden Betrieb – mit fester Ansprechperson.",
    steps: [
      {
        title: "Webdemo & Analyse",
        description:
          "Wir sehen uns Ihre Maßnahmen, Standorte und Nachweispflichten an und zeigen die " +
          "Plattform an Ihren Beispielen.",
      },
      {
        title: "Einrichtung & Datenübernahme",
        description:
          "Teilnehmende, Kurse und Maßnahmen werden aus Excel oder CSV übernommen. Rollen und " +
          "Standorte richten wir gemeinsam ein.",
      },
      {
        title: "Schulung der Teams",
        description:
          "Verwaltung und Dozenten werden in kurzen Sessions eingewiesen – ohne " +
          "IT-Vorkenntnisse und ohne Projektwochen.",
      },
      {
        title: "Betrieb & Audit",
        description:
          "Der Prüfpfad entsteht im Tagesgeschäft. Zum Audit exportieren Sie, statt Ordner " +
          "zusammenzusuchen.",
      },
    ],
  },

  modules: {
    heading: "Sechs Module. Ein System.",
    body:
      "Jedes Modul greift ins nächste – statt sechs Insellösungen, die Sie im Audit einzeln " +
      "erklären müssen.",
    items: [
      {
        code: "TM",
        title: "Teilnehmer- & Maßnahmeverwaltung",
        description: "Kurse, Maßnahmen, Teilnehmende, Förderdaten und Historien zentral verwalten.",
        tone: "blue",
      },
      {
        code: "KB",
        title: "Digitales Klassenbuch & Anwesenheit",
        description:
          "Unterricht dokumentieren, Anwesenheit erfassen, digital signieren und prüfsicher archivieren.",
        tone: "blue",
      },
      {
        code: "CL",
        title: "Kurse & Lerninhalte",
        description: "Lernmodule, Materialien, Aufgaben und Inhalte zentral organisieren und bereitstellen.",
        tone: "blue",
      },
      {
        code: "ML",
        title: "Monitoring & Lernfortschritt",
        description: "Lernfortschritt, Teilnahmequoten, Abschlüsse und Maßnahmenziele transparent verfolgen.",
        tone: "teal",
      },
      {
        code: "ND",
        title: "Nachweise & Dokumentation",
        description: "Dokumente, Nachweise und revisionssichere Exporte zentral verwalten.",
        tone: "teal",
      },
      {
        code: "AZ",
        title: "Audit & AZAV",
        description:
          "Auditrelevante Informationen strukturiert zusammenführen – entlang der AZAV-Anforderungen.",
        tone: "teal",
      },
    ],
  },

  why: {
    eyebrow: "Unternehmen",
    heading: "Warum Bildungs Guard?",
    body:
      "Eine Plattform für Lernen, Verwaltung und Qualitätssicherung. Bildungs Guard wurde für " +
      "Bildungsträger entwickelt, die Lernprozesse effizient organisieren und zugleich " +
      "Dokumentations- und Nachweispflichten zuverlässig erfüllen wollen.",
    pillars: [
      {
        title: "AZAV-Expertise",
        description:
          "Unser Team kennt Maßnahmezulassung, fachkundige Stellen und Audits aus erster Hand. " +
          "Jede Funktion entsteht entlang echter Prüfanforderungen – nicht am Reißbrett.",
        accent: "teal",
      },
      {
        title: "Persönliche Betreuung",
        description:
          "Vom Onboarding bis zum Audit-Tag haben Sie eine feste Ansprechperson. Support per " +
          "Telefon und E-Mail, auf Deutsch, ohne Ticket-Warteschleife.",
        accent: "blue",
      },
      {
        title: "Transparente Preise",
        description:
          "Ein Preis nach Teilnehmerzahl und Modulen, monatlich kündbar, keine versteckten " +
          "Kosten. Das Angebot erhalten Sie nach der Demo schriftlich.",
        accent: "navy",
      },
    ],
  },

  security: {
    eyebrow: "Sicherheit & Compliance",
    heading: "Daten, die bleiben, wo sie hingehören.",
    body:
      "Bildungsträger arbeiten mit besonders schützenswerten Daten. Bildungs Guard ist darauf " +
      "ausgelegt – technisch und organisatorisch.",
    items: [
      {
        title: "Serverstandort Deutschland",
        icon: "hosting",
        description:
          "Betrieb und Datenhaltung ausschließlich in deutschen Rechenzentren, ohne Transfer in " +
          "Drittstaaten.",
      },
      {
        title: "DSGVO by design",
        icon: "privacy",
        description:
          "Rollen- und Rechtekonzept, Löschfristen und Auftragsverarbeitung sind Teil der " +
          "Plattform, nicht Beiwerk.",
      },
      {
        title: "Revisionssichere Ablage",
        icon: "archive",
        description:
          "Signierte Einträge, nachvollziehbare Änderungen und Exporte, die fachkundige Stellen " +
          "anerkennen.",
      },
      {
        title: "Verschlüsselte Übertragung",
        icon: "transport",
        description:
          "SSL/TLS auf allen Verbindungen, verschlüsselte Backups und regelmäßige " +
          "Wiederherstellungstests.",
      },
    ],
    badges: [
      { label: "DSGVO-konform" },
      { label: "Server in Deutschland" },
      { label: "SSL-verschlüsselt" },
      { label: "AZAV-konform" },
    ],
  },

  testimonials: {
    eyebrow: "Kundenstimmen",
    heading: "Was Bildungsträger berichten",
    items: [
      {
        quote:
          "„[PLACEHOLDER: Langform-Zitat – z. B. Erfahrung aus dem letzten Audit, konkrete " +
          "Zeitersparnis im Verwaltungsalltag.]“",
        name: "[PLACEHOLDER: Name]",
        role: "[Geschäftsführung, Bildungsträger]",
      },
      {
        quote: "„[PLACEHOLDER: Langform-Zitat – z. B. Umstieg von Excel/Papier, wie die Migration verlief.]“",
        name: "[PLACEHOLDER: Name]",
        role: "[Verwaltungsleitung]",
      },
      {
        quote:
          "„[PLACEHOLDER: Langform-Zitat – z. B. Sicht einer Dozentin auf Kurse und das digitale " +
          "Klassenbuch.]“",
        name: "[PLACEHOLDER: Name]",
        role: "[Dozent:in]",
      },
      {
        quote:
          "„[PLACEHOLDER: Langform-Zitat – z. B. Datenschutz und Serverstandort als " +
          "Entscheidungsgrund.]“",
        name: "[PLACEHOLDER: Name]",
        role: "[Qualitätsmanagement]",
      },
    ],
  },

  insights: {
    eyebrow: "Wissen",
    heading: "Ratgeber für Bildungsträger",
    allLabel: "Alle Beiträge",
    items: [
      {
        tag: "AZAV",
        tone: "teal",
        title: "Das digitale Klassenbuch: Was fachkundige Stellen wirklich prüfen",
        excerpt:
          "Welche Anforderungen an Anwesenheitsnachweise gelten – und wie Sie sie ohne Papier erfüllen.",
        readMore: "Weiterlesen",
      },
      {
        tag: "DSGVO",
        tone: "blue",
        title: "Teilnehmerdaten rechtssicher verwalten: Die 5 häufigsten Fehler",
        excerpt:
          "Von der Ablage bis zur Löschfrist: worauf es bei personenbezogenen Daten in Maßnahmen ankommt.",
        readMore: "Weiterlesen",
      },
      {
        tag: "Praxis",
        tone: "navy",
        title: "Vom Papierordner zur Plattform: Migration in vier Wochen",
        excerpt:
          "Ein realistischer Fahrplan für den Umstieg – inklusive Datenübernahme und Dozentenschulung.",
        readMore: "Weiterlesen",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Häufige Fragen",
    items: [
      {
        question: "Was ist Bildungs Guard und für wen ist es gedacht?",
        answer:
          "Bildungs Guard ist eine zentrale LMS- und Audit-Plattform für Bildungsträger. " +
          "Verwaltung, Dozenten und Teilnehmende arbeiten in einem System, das Kurse, " +
          "Lerninhalte, Lernfortschritte, Maßnahmen, Teilnehmerakten, Klassenbücher und " +
          "Nachweise digital zusammenführt.",
        defaultOpen: true,
      },
      {
        question: "Welche Prozesse kann ich digitalisieren?",
        answer:
          "Von der Kurs- und Teilnehmerverwaltung über Lerninhalte, Unterricht, Anwesenheit und " +
          "Lernfortschritt bis hin zu Nachweisen, Dokumentation und Auditvorbereitung lassen " +
          "sich die zentralen Prozesse in Bildungs Guard abbilden.",
        defaultOpen: true,
      },
      {
        question: "Wie unterstützt Bildungs Guard das Lernen?",
        answer:
          "Kurse, Lerninhalte, Teilnehmende und Lernfortschritte lassen sich zentral " +
          "organisieren. Dozenten und Verwaltung erhalten einen gemeinsamen Überblick über den " +
          "Lernprozess.",
        defaultOpen: true,
      },
      {
        question: "Ist die Plattform speziell für AZAV entwickelt?",
        answer:
          "Die Prozesse orientieren sich an den Anforderungen zugelassener Maßnahmen. " +
          "Dokumentation, Nachweise und Exporte sind entlang der AZAV-Praxis aufgebaut.",
      },
      {
        question: "Eignet sich Bildungs Guard auch für QCG-geförderte Maßnahmen?",
        answer:
          "Ja. Maßnahmen, Förderdaten und Nachweispflichten lassen sich unabhängig vom " +
          "Förderrahmen abbilden.",
      },
      {
        question: "Wo liegen unsere Daten und wie sicher sind sie?",
        answer:
          "Alle Daten werden ausschließlich in deutschen Rechenzentren verarbeitet, verschlüsselt " +
          "übertragen und regelmäßig gesichert.",
      },
      {
        question: "Ersetzt das digitale Klassenbuch die Papierform vollständig?",
        answer:
          "Einträge werden digital signiert und revisionssicher archiviert. Für den Prüfpfad " +
          "entsteht damit eine vollständige digitale Dokumentation.",
      },
      {
        question: "Wie lange dauert die Einführung?",
        answer:
          "Von der Einrichtung über die Datenübernahme bis zur Schulung planen die meisten " +
          "Einrichtungen wenige Wochen ein.",
      },
      {
        question: "Können wir bestehende Teilnehmerdaten übernehmen?",
        answer:
          "Bestehende Listen lassen sich aus Excel oder CSV importieren, inklusive Maßnahmen- " +
          "und Förderdaten.",
      },
      {
        question: "Wie hilft Bildungs Guard konkret beim Audit?",
        answer:
          "Auditrelevante Teilnehmerdaten, Anwesenheiten, Klassenbücher, Nachweise und " +
          "Dokumentation werden zentral geführt und lassen sich strukturiert für Prüfungen und " +
          "Berichte aufbereiten.",
        defaultOpen: true,
      },
      {
        question: "Brauchen unsere Dozenten eine Schulung?",
        answer:
          "Eine kurze Einweisung genügt. Die Oberfläche ist auf den Unterrichtsalltag " +
          "zugeschnitten und erfordert keine IT-Vorkenntnisse.",
      },
    ],
  },

  cta: {
    heading: ["Ihre Kurse. Ihr LMS.", "Ihr Audit. Eine Plattform."],
    body:
      "Erleben Sie Bildungs Guard in einer Webdemo und sehen Sie, wie Lernmanagement und " +
      "prüfsichere Dokumentation in einem System zusammenspielen.",
    primaryCta: "Webdemo vereinbaren",
    secondaryCta: "Kostenlos testen",
    note: "Kostenfrei & unverbindlich · Antwort innerhalb eines Werktags",
  },

  footer: {
    description:
      "Die zentrale LMS- und Audit-Plattform für Bildungsträger. Kurse, Lerninhalte, " +
      "Teilnehmende, Maßnahmen und Nachweise – digital, zentral und prüfsicher.",
    columns: [
      {
        title: "Seiteninhalt",
        links: [
          { label: "Start", href: `#${SECTION_IDS.hero}` },
          { label: "Webdemo & Beratung", href: `#${SECTION_IDS.demo}` },
          { label: "Software", href: `#${SECTION_IDS.audit}` },
          { label: "Funktionen", href: `#${SECTION_IDS.lms}` },
          { label: "Warum Bildungs Guard", href: `#${SECTION_IDS.why}` },
          { label: "FAQ", href: `#${SECTION_IDS.faq}` },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "support@bildungsguard.de", href: "mailto:support@bildungsguard.de" },
          { label: "+49 (0) 30 123 456 78", href: "tel:+493012345678" },
          { label: "Dokumentation", href: "#" },
          { label: "Problem melden", href: "#" },
        ],
      },
      {
        title: "Weitere Links",
        links: [
          { label: "Blog", href: `#${SECTION_IDS.insights}` },
          { label: "Login", href: "#" },
          { label: "Beratung buchen", href: `#${SECTION_IDS.demo}` },
          { label: "Kostenlos testen", href: "#" },
        ],
      },
      {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/impressum" },
          { label: "Datenschutz", href: "/datenschutz" },
          { label: "Cookie-Einstellungen", href: "#" },
          { label: "AGB", href: "/agb" },
        ],
      },
    ],
    badges: [
      { label: "DSGVO-konform" },
      { label: "Server in Deutschland" },
      { label: "SSL-verschlüsselt" },
      { label: "AZAV-konform" },
    ],
    copyright: "© 2026 Bildungs Guard GmbH. Alle Rechte vorbehalten.",
    copyrightRight: "Entwickelt und gehostet in Deutschland.",
  },
};
