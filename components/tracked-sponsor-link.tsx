"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import posthog from "posthog-js";

type TrackedSponsorLinkProps = {
  href: string;
  locale: string;
  ctaText: string;
  className: string;
};

export function TrackedSponsorLink({ href, locale, ctaText, className }: TrackedSponsorLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        posthog.capture("sponsor_cta_clicked", {
          locale,
          location: "contact_section",
          cta_text: ctaText,
        });
      }}
    >
      {ctaText}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
