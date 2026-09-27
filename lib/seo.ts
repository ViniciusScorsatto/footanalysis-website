import type { Metadata } from "next";
import { getLocaleContent, type Locale, locales } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

export function pageMetadata(locale: Locale, path = "", title?: string, description?: string): Metadata {
  const content = getLocaleContent(locale);
  const origin = getSiteUrl();
  const pageTitle = title ?? content.metadata.title;
  const pageDescription = description ?? content.metadata.description;
  const url = `${origin}/${locale}${path}`;
  const images = [{
    url: `${origin}/${locale === "pt" ? "hero-bg-brazil" : "hero-bg-international"}.png`,
    width: 1983,
    height: 793,
    alt: pageTitle,
  }];
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url,
      languages: {
        pt: `${origin}/pt${path}`,
        en: `${origin}/en${path}`,
        "x-default": `${origin}/pt${path}`,
      },
    },
    openGraph: {
      title: pageTitle, description: pageDescription, url, siteName: "FootAnalysis",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      type: "website", images,
    },
    twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images },
  };
}

export function brandStructuredData() {
  const origin = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${origin}/#organization`,
        name: "FootAnalysis", url: origin,
        logo: { "@type": "ImageObject", url: `${origin}/footanalysis-logo.png`, width: 1024, height: 1024 },
        email: getLocaleContent("pt").contactEmail,
        sameAs: [...new Set(locales.flatMap((locale) => getLocaleContent(locale).socials.map((social) => social.href)))],
      },
      {
        "@type": "WebSite", "@id": `${origin}/#website`,
        name: "FootAnalysis", alternateName: "Foot Analysis", url: origin,
        inLanguage: ["pt-BR", "en"], publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
