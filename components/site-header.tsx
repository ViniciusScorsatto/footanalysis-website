import Link from "next/link";

import type { LocaleContent } from "@/lib/site-content";
import { Container } from "@/components/container";

type SiteHeaderProps = {
  content: LocaleContent;
  switchHref: string;
};

export function SiteHeader({ content, switchHref }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <Container className="py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href={`/${content.locale}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-sm font-semibold uppercase tracking-[0.35em] text-accent">
              FA
            </div>
            <div>
              <p className="font-display text-2xl uppercase tracking-[0.14em] text-mist">FootAnalysys</p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">{content.languageName}</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 md:gap-7">
            {content.nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.22em] text-white/68 transition hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              className="rounded-full border border-white/15 px-4 py-2 text-sm uppercase tracking-[0.2em] text-mist transition hover:border-accent/60 hover:text-accent"
            >
              {content.nav.switchLabel}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
