export const CONTACT_EMAIL = "hi@ivanotechnologies.com";
export const DISPUTES_EMAIL = "support@ivanotechnologies.com";

/** Kezie lock: never FCT or dashed forms (not "Abuja – FCT", not "Abuja-FCT"). */
export const LOCATION = "Abuja Nigeria";

/**
 * TODO: set to the go-live date on the day Terms, Refunds and Privacy ship.
 * Do not put a placeholder in the rendered copy.
 */
export const LEGAL_LAST_UPDATED = "9 November 2026";

/** Home hero tagline: sub line under the H1, not the H1 itself. */
export const HERO_TAGLINE =
  "Software products and technology services for growing businesses";

export const PHONES = [
  { display: "+234 806 784 4858", href: "tel:+2348067844858" },
  { display: "+234 903 223 3420", href: "tel:+2349032233420" },
] as const;

export const SITE = {
  name: "Ivano Technologies",
  legalName: "IVANO TECHNOLOGIES LTD",
  rc: "RC 9326735",
  description:
    "Software products and technology services for growing businesses. Electric cars and green tech for Nigeria. Abuja Nigeria.",
  email: CONTACT_EMAIL,
  disputesEmail: DISPUTES_EMAIL,
  phoneDisplay: PHONES[0].display,
  phoneHref: PHONES[0].href,
  phoneAltDisplay: PHONES[1].display,
  phoneAltHref: PHONES[1].href,
  socialHandle: "@techivano",
  webDisplay: "www.ivanotechnologies.com",
  webHref: "https://www.ivanotechnologies.com",
  location: LOCATION,
  /** Area and city, shown on About. Contact shows the building (contactOffice). */
  officeArea: `Wuse 2, ${LOCATION}`,
  /** Contact page office line only (Kezie, 28 Oct). About and structured data keep officeArea. */
  contactOffice: "Saham Plaza, Wuse 2 Abuja",
  /**
   * Registered/office postal address. Use on Terms, Privacy and Refunds only.
   * FCT is allowed here; the LOCATION lock does not apply to this line.
   */
  legalAddress:
    "Shop B18, Saham Plaza, No. 10 Alexandria Crescent, Wuse 2, Abuja, FCT, Nigeria",
  // ?v=5: fresh CDN cache key for the v2.4 profile (RC 9326735).
  pdfHref: "/company-profile.pdf?v=5",
  pdfFilename: "Ivano Technologies Company Profile.pdf",
  pdfLabel: "Company profile (PDF)",
  incorporated: "Incorporated 27 January 2026 (Corporate Affairs Commission)",
  copyright: "© 2026 Ivano Technologies Ltd · RC 9326735",
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
  {
    name: "Facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588362925973",
  },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refunds", label: "Refunds" },
  { href: "/cookies", label: "Cookies" },
] as const;
