export const CONTACT_EMAIL = "hi@ivanotechnologies.com";

/** Kezie lock: never FCT or dashed forms (not "Abuja – FCT", not "Abuja-FCT"). */
export const LOCATION = "Abuja Nigeria";

/** Home hero tagline — sub line under the H1, not the H1 itself. */
export const HERO_TAGLINE =
  "Intelligent products and services for modern businesses";

export const SITE = {
  name: "Ivano Technologies",
  legalName: "IVANO TECHNOLOGIES LTD",
  rc: "RC 8736090",
  tagline: "Technology products and services, built to ship.",
  description:
    "Ivano Technologies builds software products and delivers technology services: finance tools, operations systems and trusted client platforms.",
  email: CONTACT_EMAIL,
  phoneDisplay: "+234 806 784 4858",
  phoneHref: "tel:+2348067844858",
  socialHandle: "@techivano",
  socialHref: "https://x.com/techivano",
  webDisplay: "www.ivanotechnologies.com",
  webHref: "https://www.ivanotechnologies.com",
  location: LOCATION,
  /** Kezie lock: no street address on the site, area and city only. */
  officeArea: `Wuse 2, ${LOCATION}`,
  officeLine: `Office · Wuse 2, ${LOCATION}`,
  pdfHref: "/company-profile.pdf",
  pdfFilename: "Ivano Technologies Company Profile.pdf",
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

export const SOCIAL_LINKS = [
  {
    name: "X",
    label: "X",
    href: "https://x.com/techivano",
  },
  {
    name: "Instagram",
    label: "Instagram",
    href: "https://www.instagram.com/techivano/",
  },
  {
    name: "YouTube",
    label: "YouTube",
    href: "https://www.youtube.com/@techivano",
  },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;
