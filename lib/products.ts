export type ProductBadge = "product" | "client";

export type Product = {
  name: string;
  badge: ProductBadge;
  badgeLabel: string;
  description: string;
  homeDescription?: string;
  href: string;
  cta: string;
  thumb?: "t1" | "t2" | "t3";
  featured?: boolean;
};

export type HomeProduct = Product & {
  thumb: NonNullable<Product["thumb"]>;
  homeDescription: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Kompleet",
    badge: "product",
    badgeLabel: "Product · Flagship",
    description:
      "Tax and finance software for Nigerian SMEs — bank imports, Tax Act 2025 compliance, and NRS e-invoicing.",
    homeDescription:
      "Tax and finance software for Nigerian SMEs — bank imports, Tax Act 2025, NRS e-invoicing.",
    href: "https://kompleet.techivano.com",
    cta: "Open Kompleet",
    thumb: "t1",
    featured: true,
  },
  {
    name: "Ivano PMS",
    badge: "product",
    badgeLabel: "Product",
    description:
      "Hospitality property management — bookings, guests, units, and channel messages.",
    homeDescription:
      "Hospitality property management — bookings, guests, units, and channel messages.",
    href: "https://pms.techivano.com",
    cta: "Open PMS",
    thumb: "t2",
  },
  {
    name: "NRCS EAM",
    badge: "product",
    badgeLabel: "Product",
    description:
      "Enterprise asset management — work orders, PM, inventory, compliance.",
    homeDescription:
      "Enterprise asset management — assets, work orders, PM, inventory, compliance.",
    href: "https://nrcseam.techivano.com",
    cta: "Open NRCS EAM",
    thumb: "t3",
  },
  {
    name: "JUO Campaign",
    badge: "client",
    badgeLabel: "Client work",
    description: "Campaign website for the John Upan Odey organisation.",
    href: "https://www.votejohnupanodey.com",
    cta: "Visit site",
  },
  {
    name: "NMDPRA Dashboard",
    badge: "client",
    badgeLabel: "Client work",
    description:
      "Live survey and plain-language compliance dashboard for NMDPRA.",
    href: "https://nmdpra-dashboard-techivano.vercel.app",
    cta: "Visit dashboard",
  },
];

export const HOME_PRODUCT_THUMBS: HomeProduct[] = PRODUCTS.filter(
  (product): product is HomeProduct =>
    product.thumb !== undefined && product.homeDescription !== undefined,
);

export const HOME_CLIENT_CARDS: Product[] = PRODUCTS.filter(
  (product) => product.badge === "client",
);
