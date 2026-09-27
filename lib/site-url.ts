const defaultSiteUrl = "https://footanalysis.io";

export function getSiteUrl() {
  const value = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
  const url = new URL(value.trim());
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.");
  }
  return url.origin;
}

export function getSiteOrigin() {
  return new URL(getSiteUrl());
}
