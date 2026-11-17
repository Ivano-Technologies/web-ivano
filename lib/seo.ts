import type { Product } from "./products.ts";
import { SITE, SOCIAL_LINKS } from "./site.ts";

/** Absolute URLs that leave the site (canonical, og:url, JSON-LD, sitemap). */
export const CANONICAL_ORIGIN = SITE.webHref;

export const ORGANIZATION_JSON_LD_NAME = "Ivano Technologies Ltd";
export const ORGANIZATION_LOGO_PATH = "/android-chrome-512x512.png";
export const ORGANIZATION_ID = `${CANONICAL_ORIGIN}/#organization`;

/** JSON-LD PostalAddress. FCT is allowed here; the LOCATION lock does not apply. */
export const ORGANIZATION_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Shop B18, Saham Plaza, 10 Alexandria Crescent",
  addressLocality: "Wuse 2, Abuja",
  addressRegion: "FCT",
  addressCountry: "Nigeria",
} as const;

export const MARKETING_PATHS = [
  "/",
  "/products",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refunds",
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

function socialSameAs(): string[] {
  return SOCIAL_LINKS.map((link) => link.href);
}

function productSameAs(product: Product, url: string): string[] {
  const hrefs = [product.href, product.secondaryHref].filter(
    (href): href is string => Boolean(href) && href !== url,
  );
  return [...new Set(hrefs)];
}

function softwareApplicationJsonLd(
  product: Product,
): Record<string, unknown> {
  const url = product.href;
  const sameAs = productSameAs(product, url);
  const jsonLd: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    name: product.name,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.description,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }
  return jsonLd;
}

export function organizationJsonLd(): Record<string, unknown> {
  const sameAs = socialSameAs();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: ORGANIZATION_JSON_LD_NAME,
        legalName: SITE.legalName,
        url: CANONICAL_ORIGIN,
        logo: canonicalUrl(ORGANIZATION_LOGO_PATH),
        identifier: SITE.rc,
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        address: { ...ORGANIZATION_POSTAL_ADDRESS },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${CANONICAL_ORIGIN}/#website`,
        url: CANONICAL_ORIGIN,
        name: SITE.name,
        sameAs,
        publisher: {
          "@id": ORGANIZATION_ID,
        },
      },
    ],
  };
}

/** SoftwareApplication JSON-LD for products listed for sale. No offers or prices. */
export function softwareApplicationsJsonLd(
  products: readonly Product[],
): Record<string, unknown> {
  const applications = products
    .filter(
      (product) =>
        product.highlight === "kompleet" || product.highlight === "pms",
    )
    .map(softwareApplicationJsonLd);

  return {
    "@context": "https://schema.org",
    "@graph": applications,
  };
}
