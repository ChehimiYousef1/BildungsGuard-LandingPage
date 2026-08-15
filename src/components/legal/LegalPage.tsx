import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

import { Container, Logo } from "@/components/ui";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { getLegal, pathFor, type Locale } from "@/lib/i18n";
import type { LegalDocument } from "@/types/legal";

interface LegalPageProps {
  locale: Locale;
  doc: LegalDocument;
}

/** True while any "[placeholder]" is still unfilled in the document. */
function hasPlaceholders(doc: LegalDocument): boolean {
  const text = JSON.stringify(doc);
  return /\[[^\]]{3,}\]/.test(text);
}

/**
 * Legal pages get their own slim chrome rather than the marketing Navbar and
 * Footer: those link to "#section" anchors that only exist on the landing page,
 * so reusing them here would produce dead links.
 */
export function LegalPage({ locale, doc }: LegalPageProps) {
  const legal = getLegal(locale);
  const home = pathFor(locale);
  const pages = [legal.imprint, legal.privacy, legal.terms];
  const draft = hasPlaceholders(doc);

  return (
    <>
      <header className="border-line border-b bg-white">
        <Container width="faq" className="flex h-[68px] items-center justify-between gap-4">
          <Link href={home} className="shrink-0" aria-label="Bildungs Guard">
            <Logo priority className="h-9" />
          </Link>

          <LanguageSwitch
            active={locale}
            hrefs={{ [locale]: doc.path, [locale === "de" ? "en" : "de"]: doc.altPath }}
          />
        </Container>
      </header>

      <main className="flex-1 py-14 md:py-20">
        <Container width="faq" className="max-w-[820px]">
          <Link
            href={home}
            className="text-blue inline-flex items-center gap-2 text-sm font-bold hover:underline"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {legal.strings.back}
          </Link>

          <h1 className="mt-6 text-[32px] leading-tight font-extrabold md:text-[40px]">{doc.title}</h1>

          <p className="text-muted mt-3 text-sm">
            {legal.strings.updatedLabel}{" "}
            <time dateTime={doc.updated}>
              {new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(doc.updated))}
            </time>
          </p>

          {doc.intro && <p className="mt-6 text-base leading-[27px]">{doc.intro}</p>}

          {draft && (
            <div className="border-gold/40 mt-8 flex gap-3 rounded-[var(--radius-card)] border bg-[#FFFBEB] p-4">
              <AlertTriangle aria-hidden className="text-gold mt-0.5 size-5 shrink-0" />
              <p className="text-[14px] leading-6 text-[#7A5B00]">{legal.strings.draftNotice}</p>
            </div>
          )}

          <div className="mt-12 space-y-10">
            {doc.blocks.map((block) => (
              <section key={block.heading} id={block.id} className="scroll-mt-24">
                <h2 className="text-[20px] leading-snug font-extrabold md:text-[22px]">
                  {block.heading}
                </h2>

                {block.body?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-[27px]">
                    {paragraph}
                  </p>
                ))}

                {block.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base leading-[27px]">
                        <span aria-hidden className="bg-teal mt-[11px] size-1.5 shrink-0 rounded-full" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </main>

      <footer className="bg-navy">
        <Container width="faq" className="max-w-[820px] py-8">
          <nav aria-label={doc.title}>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    aria-current={page.path === doc.path ? "page" : undefined}
                    className={
                      page.path === doc.path
                        ? "text-sm font-bold text-white"
                        : "text-sm text-[#DCE6F2] transition-colors hover:text-white"
                    }
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-navy-muted mt-6 text-[13px]">
            © {new Date().getFullYear()} Bildungs Guard GmbH
          </p>
        </Container>
      </footer>
    </>
  );
}
