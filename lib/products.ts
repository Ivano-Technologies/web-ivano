export type ProductBadge = "product" | "client";

export type ProductHighlight = "kompleet" | "pms" | "nrcs" | "client";

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
    badgeLabel: "Product · Flagship",
    description:
      "Tax and finance software for Nigerian SMEs: bank imports, Tax Act 2025 compliance and NRS electronic invoicing.",
    homeDescription:
      "Tax and finance software for Nigerian SMEs: bank imports, Tax Act 2025 compliance and NRS electronic invoicing.",
    href: "https://kompleet.techivano.com",
    cta: "Open Kompleet",
    image: "/products/kompleet-ui.png",
    featured: true,
    homeThumb: true,
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
];

export const HOME_PRODUCT_THUMBS: HomeProduct[] = PRODUCTS.filter(
  (product): product is HomeProduct =>
    product.homeThumb === true && product.homeDescription !== undefined,
);

export const HOME_CLIENT_CARDS: Product[] = PRODUCTS.filter(
  (product) => product.badge === "client",
);
