import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";

import { getSiteOrigin } from "@/lib/site-url";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteOrigin(),
  title: "FootAnalysis",
  description: "Bilingual football media brand website.",
  icons: {
    icon: "/icon.png"
  }
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headerStore = await headers();
  const locale = headerStore.get("x-footanalysis-locale") === "en" ? "en" : "pt";
  const htmlLang = locale === "en" ? "en" : "pt-BR";

  return (
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
