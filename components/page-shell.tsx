import type { ReactNode } from "react";

import type { LocaleContent } from "@/lib/site-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
  content: LocaleContent;
};

export function PageShell({ children, content }: PageShellProps) {
  const switchHref = content.locale === "en" ? "/pt" : "/en";

  return (
    <div className="min-h-screen bg-ink text-mist">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[26rem] w-[26rem] rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute inset-0 bg-stadium-grid bg-[size:42px_42px] opacity-[0.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,13,18,0.2),rgba(11,13,18,0.9))]" />
      </div>
      <SiteHeader content={content} switchHref={switchHref} />
      <main>{children}</main>
      <SiteFooter content={content} />
    </div>
  );
}
