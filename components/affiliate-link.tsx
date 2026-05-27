"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ReactNode } from "react";

type AffiliateLinkProps = {
  href: string;
  title: string;
  tag: string;
  locale: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export function AffiliateLink({ href, title, tag, locale, className, children, target, rel }: AffiliateLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        posthog.capture("affiliate_clicked", {
          locale,
          affiliate_title: title,
          affiliate_tag: tag,
          href,
        });
      }}
    >
      {children}
    </Link>
  );
}
