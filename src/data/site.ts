export const site = {
  name: "Bildungs Guard",
  tagline: "Die zentrale LMS- und Audit-Plattform für Bildungsträger",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bildungsguard.de",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "#",
  email: "info@bildungsguard.de",
  phone: "",
} as const;
