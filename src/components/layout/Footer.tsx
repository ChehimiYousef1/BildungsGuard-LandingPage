import Image from "next/image";
import { Badge, Container } from "@/components/ui";
import type { FooterContent } from "@/types/content";

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-navy border-t border-white/10 pt-14">
      <Container className="max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[363px_repeat(4,1fr)]">
          <div>
            <div className="inline-block rounded-xl bg-white px-4 py-2.5">
              <Image
                src="/images/logo.png"
                alt="Bildungs Guard"
                width={165}
                height={36}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-navy-body mt-5 max-w-[300px] text-sm leading-6">{content.description}</p>
          </div>

          {content.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[13px] font-extrabold tracking-[0.09em] text-[#7F97B2] uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-[#DCE6F2] transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-11 border-t border-white/10 pt-8">
          <div className="flex flex-wrap justify-center gap-3.5">
            {content.badges.map((badge) => (
              <Badge key={badge.label} tone="dark">
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-navy-muted mt-8 flex flex-col gap-2 border-t border-white/10 py-7 text-[13px] sm:flex-row sm:justify-between">
          <span>{content.copyright}</span>
          <span>{content.copyrightRight}</span>
        </div>
      </Container>
    </footer>
  );
}
