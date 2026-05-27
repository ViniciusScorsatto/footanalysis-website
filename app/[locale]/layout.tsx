import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getLocaleContent, isLocale, locales } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

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
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${content.locale}`;
  const ogImage = content.locale === "pt" ? `${siteUrl}/hero-bg-brazil.png` : `${siteUrl}/hero-bg-international.png`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en`,
        pt: `${siteUrl}/pt`,
        "x-default": `${siteUrl}/pt`
      }
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: canonicalUrl,
      siteName: "FootAnalysis",
      locale: content.locale === "en" ? "en_US" : "pt_BR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1980,
          height: 1024,
          alt: content.metadata.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.title,
      description: content.metadata.description,
      images: [ogImage]
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
