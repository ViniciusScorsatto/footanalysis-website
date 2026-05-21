import Link from "next/link";

import type { LocaleContent } from "@/lib/site-content";
import { Container } from "@/components/container";

type SiteFooterProps = {
  content: LocaleContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-10">
      <Container className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-2xl uppercase tracking-[0.14em] text-mist">FootAnalysys</p>
          <p className="max-w-xl text-sm text-white/65">{content.footer.statement}</p>
        </div>

        <div className="space-y-2 text-sm text-white/65">
          <p className="uppercase tracking-[0.22em] text-white/45">{content.footer.contactLabel}</p>
          <Link href={`mailto:${content.contactEmail}`} className="transition hover:text-accent">
            {content.contactEmail}
          </Link>
          <p>{new Date().getFullYear()} {content.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
