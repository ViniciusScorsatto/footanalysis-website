import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getLocaleContent, isLocale, locales } from "@/lib/site-content";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getLocaleContent(locale);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: `https://footanalysys.com/${content.locale}`,
      siteName: "FootAnalysis",
      locale: content.locale === "en" ? "en_US" : "pt_BR",
      type: "website"
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLocaleContent(locale);

  return <PageShell content={content}>{children}</PageShell>;
}
