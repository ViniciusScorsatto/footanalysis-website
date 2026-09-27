"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

type LanguageSwitchLinkProps = {
  href: string;
  label: string;
  fromLocale: string;
  className: string;
};

export function LanguageSwitchLink({ href, label, fromLocale, className }: LanguageSwitchLinkProps) {
  const toLocale = fromLocale === "en" ? "pt" : "en";
  const pathname = usePathname();
  const destination = pathname === `/${fromLocale}/about` ? `/${toLocale}/about` : href;

  return (
    <Link
      href={destination}
      hrefLang={toLocale}
      className={className}
      onClick={() => {
        posthog.capture("language_switched", {
          from_locale: fromLocale,
          to_locale: toLocale,
        });
      }}
    >
      {label}
    </Link>
  );
}
