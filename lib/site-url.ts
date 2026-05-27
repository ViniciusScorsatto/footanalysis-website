const defaultSiteUrl = "http://localhost:3000";

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || defaultSiteUrl;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteOrigin() {
  return new URL(getSiteUrl());
}
