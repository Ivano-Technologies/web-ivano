import { SITE, SOCIAL_LINKS } from "./site";

/** Absolute URLs that leave the site (canonical, og:url, JSON-LD, sitemap). */
export const CANONICAL_ORIGIN = SITE.webHref;

export const MARKETING_PATHS = [
  "/",
  "/products",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

export type MarketingPath = (typeof MARKETING_PATHS)[number];

export function isPreviewDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function canonicalUrl(path: string): string {
  const origin = CANONICAL_ORIGIN.replace(/\/$/, "");
  if (path === "" || path === "/") {
    return origin;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${CANONICAL_ORIGIN}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: CANONICAL_ORIGIN,
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Abuja",
          addressCountry: "Nigeria",
        },
        sameAs: SOCIAL_LINKS.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${CANONICAL_ORIGIN}/#website`,
        url: CANONICAL_ORIGIN,
        name: SITE.name,
        sameAs: SOCIAL_LINKS.map((link) => link.href),
        publisher: {
          "@id": `${CANONICAL_ORIGIN}/#organization`,
        },
      },
    ],
  };
}
