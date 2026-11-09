export type ProductBadge = "product" | "client";

export type ProductHighlight = "kompleet" | "pms" | "nrcs" | "client";

export const KOMPLEET_PRICING_HREF = "https://kompleet.techivano.com/pricing";

export type Product = {
  name: string;
  highlight: ProductHighlight;
  badge: ProductBadge;
  badgeLabel: string;
  description: string;
  homeDescription?: string;
  href: string;
  cta: string;
  image: string;
  featured?: boolean;
  /** Show on the home product thumb grid */
  homeThumb?: boolean;
  price?: string;
  priceNote?: string;
  includesLabel?: string;
  includes?: readonly string[];
  pricingOnRequest?: boolean;
};

export type HomeProduct = Product & {
  homeDescription: string;
  homeThumb: true;
};

export const PRODUCTS: Product[] = [
  {
    name: "Kompleet",
    highlight: "kompleet",
    badge: "product",
    badgeLabel: "Founding offer",
    description:
      "Bookkeeping and invoicing for small and medium-sized businesses: bank imports, simple invoicing and clean financial reports.",
    homeDescription:
      "Bookkeeping and invoicing for small and medium-sized businesses: bank imports, simple invoicing and clean financial reports.",
    href: KOMPLEET_PRICING_HREF,
    cta: "Get lifetime access for ₦5,000",
    image: "/products/kompleet-art.png",
    featured: true,
    homeThumb: true,
    price: "₦5,000 one-off payment, lifetime access (VAT inclusive)",
    priceNote:
      "Per user: one licence covers one named user account. For the first 100 users only. No monthly or annual fees.",
    includesLabel: "What's included, for each licensed user:",
    includes: [
      "Invoicing",
      "Bank statement imports and expense tracking",
      "Financial reports",
      "Future improvements to these core features (separately priced add-ons excluded)",
    ],
  },
  {
    name: "Ivano PMS",
    highlight: "pms",
    badge: "product",
    badgeLabel: "Product",
    description:
      "Hospitality property management: bookings, guests, units and channel messages.",
    homeDescription:
      "Hospitality property management: bookings, guests, units and channel messages.",
    href: "https://pms.techivano.com",
    cta: "Open PMS",
    image: "/products/pms-ui.png",
    homeThumb: true,
    pricingOnRequest: true,
  },
  {
    name: "NRCS EAM",
    highlight: "nrcs",
    badge: "product",
    badgeLabel: "Product",
    description:
      "Enterprise asset management: assets, work orders, PM, inventory and compliance.",
    homeDescription:
      "Enterprise asset management: assets, work orders, PM, inventory and compliance.",
    href: "https://nrcseam.techivano.com",
    cta: "Open NRCS EAM",
    image: "/products/nrcs-eam-ui.png",
    homeThumb: true,
    pricingOnRequest: true,
  },
  {
    name: "JUO Campaign",
    highlight: "client",
    badge: "client",
    badgeLabel: "Client work",
    description: "Campaign website for the John Upan Odey organisation.",
    href: "https://www.votejohnupanodey.com",
    cta: "Visit site",
    image: "/products/juo-ui.png",
  },
  {
    name: "NMDPRA Dashboard",
    highlight: "client",
    badge: "client",
    badgeLabel: "Client work",
    description:
      "Live survey and plain language compliance dashboard for NMDPRA.",
    href: "https://nmdpra-dashboard-techivano.vercel.app",
    cta: "Visit dashboard",
    image: "/products/nmdpra-ui.png",
  },
  {
    name: "Bayek",
    highlight: "client",
    badge: "client",
    badgeLabel: "Client work",
    description:
      "Company website for Bayek Integrated Services and Bayek Construction.",
    href: "https://bayek.org",
    cta: "Visit site",
    image: "/products/bayek-ui-v2.png",
  },
];

/** Web links open in a new tab; mailto and other non web links open in place. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export const HOME_PRODUCT_THUMBS: HomeProduct[] = PRODUCTS.filter(
  (product): product is HomeProduct =>
    product.homeThumb === true && product.homeDescription !== undefined,
);

export const SALE_PRODUCTS: Product[] = PRODUCTS.filter(
  (product) => product.badge === "product",
);

export const HOME_CLIENT_CARDS: Product[] = PRODUCTS.filter(
  (product) => product.badge === "client",
);
