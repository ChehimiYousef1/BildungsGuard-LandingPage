"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { LanguageSwitch } from "./LanguageSwitch";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollLock } from "@/hooks/useScrollLock";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

interface NavbarProps {
  links: NavLink[];
  cta: string;
  locale?: Locale;
}

export function Navbar({ links, cta, locale = "de" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const scrolled = useScrolled();
  useScrollLock(open);

  // Close on Escape — expected behaviour for any overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "border-line sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-[0_6px_24px_rgba(15,42,71,0.07)]",
      )}
    >
      <ScrollProgress />
      <Container width="narrow" className="relative flex h-[68px] items-center">
        <a href={`#${SECTION_IDS.hero}`} className="shrink-0" aria-label="Bildungs Guard – Startseite">
          <Image
            src="/images/logo.png"
            alt="Bildungs Guard"
            width={186}
            height={40}
            priority
            className="h-10"
            style={{ width: "auto" }}
          />
        </a>

        {/* Centred on the bar itself, so it stays centred regardless of how
            wide the logo or the action group become. */}
        <nav aria-label="Hauptnavigation" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex gap-7">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ink hover:text-blue after:bg-blue relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 motion-reduce:after:transition-none"
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-line overflow-hidden border-t bg-white lg:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
