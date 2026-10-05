export const CONTACT_EMAIL = "hi@ivanotechnologies.com";

export const SITE = {
  name: "Ivano Technologies",
  legalName: "IVANO TECHNOLOGIES LTD",
  rc: "RC 8736090",
  tagline: "Technology products and services, built to ship.",
  description:
    "Ivano Technologies builds software products and delivers technology services — finance tools, operations systems, and trusted client platforms.",
  email: CONTACT_EMAIL,
  phoneDisplay: "+234 806 784 4858",
  phoneHref: "tel:+2348067844858",
  socialHandle: "@techivano",
  socialHref: "https://x.com/techivano",
  webDisplay: "www.ivanotechnologies.com",
  webHref: "https://www.ivanotechnologies.com",
  addressShort: "Shop B18, Saham Plaza, Wuse 2, Abuja – FCT",
  addressFull:
    "Shop B18, Saham Plaza, No. 10 Alexandria Crescent, Wuse 2, Abuja – FCT, Nigeria",
  officeLine: "Office · Wuse 2, Abuja",
  pdfHref: "/company-profile.pdf",
  pdfLabel: "Company profile (PDF)",
  incorporated: "Incorporated 27 January 2026 (Corporate Affairs Commission)",
  copyright: "© 2026 Ivano Technologies Ltd · RC 8736090",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_EXPLORE = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;
