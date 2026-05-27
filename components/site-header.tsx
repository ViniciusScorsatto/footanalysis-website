import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { LocaleContent } from "@/lib/site-content";
import { Container } from "@/components/container";
import { LanguageSwitchLink } from "@/components/language-switch-link";

type SiteHeaderProps = {
  content: LocaleContent;
  switchHref: string;
};

export function SiteHeader({ content, switchHref }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050608]/84 backdrop-blur-xl">
      <Container className="py-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href={`/${content.locale}`} className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-[#1eaf30] shadow-[0_10px_30px_rgba(0,0,0,0.28)] md:h-16 md:w-16">
              <Image
                src="/footanalysis-logo.png"
                alt="Foot Analysis logo"
                fill
                className="object-contain p-1.5 md:p-2"
                priority
              />
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 md:gap-6">
            <LanguageSwitchLink
              href={switchHref}
              label={content.nav.switchLabel}
              fromLocale={content.locale}
              className="rounded-full border border-white/12 px-4 py-2 text-sm text-mist transition hover:border-accent/60 hover:text-accent"
            />
            <Link
              href={`mailto:${content.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#efffae]"
            >
              {content.locale === "pt" ? "Seja um patrocinador" : "Become a sponsor"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
