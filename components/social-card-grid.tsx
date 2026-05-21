import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { LocaleContent } from "@/lib/site-content";

type SocialCardGridProps = {
  content: LocaleContent;
};

export function SocialCardGrid({ content }: SocialCardGridProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {content.socials.map((social, index) => (
        <Link
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.06]"
        >
          <div
            className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
            style={{
              background:
                index === 0
                  ? "radial-gradient(circle at top left, rgba(215,255,100,0.18), transparent 55%)"
                  : index === 1
                    ? "radial-gradient(circle at top left, rgba(255,129,89,0.16), transparent 55%)"
                    : "radial-gradient(circle at top left, rgba(120,177,255,0.18), transparent 55%)"
            }}
          />
          <div className="relative space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-3xl uppercase tracking-[0.12em] text-mist">{social.label}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/45">{social.handle}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/50 transition group-hover:text-accent" />
            </div>
            <p className="text-sm leading-7 text-white/72">{social.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
