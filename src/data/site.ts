export const site = {
  name: "Bildungs Guard",
  tagline: "Die zentrale LMS- und Audit-Plattform für Bildungsträger",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bildungsguard.de",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "#",
  email: "support@bildungsguard.de",
  phone: "+49 (0) 30 123 456 78",
} as const;
