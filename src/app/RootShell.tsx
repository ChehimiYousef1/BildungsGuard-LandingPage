import { jakarta, manrope } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import "./globals.css";

/**
 * Shared <html>/<body> shell. Each locale has its own root layout so that the
 * lang attribute is correct — this keeps the markup identical between them.
 */
export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${jakarta.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
