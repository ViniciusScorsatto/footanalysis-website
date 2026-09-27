import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // Only canonical content pages. Build time is not a content modification date.
  return ["", "/about"].flatMap((path) => ["pt", "en"].map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    alternates: {
      languages: {
        pt: `${siteUrl}/pt${path}`,
        en: `${siteUrl}/en${path}`,
        "x-default": `${siteUrl}/pt${path}`,
      },
    },
  })));
}
