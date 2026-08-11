"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { LanguageSwitch } from "./LanguageSwitch";
import { useScrollLock } from "@/hooks/useScrollLock";
import { SECTION_IDS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

interface NavbarProps {
  links: NavLink[];
  cta: string;
  locale?: Locale;
}

export function Navbar({ links, cta, locale = "de" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  // Close on Escape — expected behaviour for any overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-line sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <Container width="narrow" className="flex h-[68px] items-center">
        <a href={`#${SECTION_IDS.hero}`} className="shrink-0" aria-label="Bildungs Guard – Startseite">
          <Image
            src="/images/logo.png"
            alt="Bildungs Guard"
            width={186}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </a>

        <nav aria-label="Hauptnavigation" className="ml-14 hidden lg:block">
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ink hover:text-blue text-sm font-semibold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <LanguageSwitch active={locale} className="hidden sm:flex" />
          <ButtonLink href={`#${SECTION_IDS.cta}`} size="sm" className="hidden sm:inline-flex">
            {cta}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="text-navy lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-line border-t bg-white lg:hidden">
          <Container width="narrow" className="py-6">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-ink block text-base font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <LanguageSwitch active={locale} />
              <ButtonLink href={`#${SECTION_IDS.cta}`} size="sm" onClick={() => setOpen(false)}>
                {cta}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
