import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Exo, Montserrat } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { MotionEffects } from "@/components/MotionEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyContact } from "@/components/StickyContact";
import { CANONICAL_ORIGIN, isPreviewDeployment } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: isPreviewDeployment()
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon-32-navy.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

/** Pass 3: dark navy is the default; light follows prefers-color-scheme. */
export const viewport: Viewport = {
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo.variable} ${montserrat.variable}`}>
      <body>
        <JsonLd />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyContact />
        <MotionEffects />
      </body>
    </html>
  );
}
