/**
 * Public Kompleet plan values for the company Products page.
 *
 * Sourced from Kompleet `dev`:
 * - prices and ids: `src/lib/constants.ts` (`SUBSCRIPTION_TIERS`)
 * - feature lines: `src/lib/tiers/upgrade-copy.ts` (`TIER_COMPARISON_ROWS`)
 *   and `src/components/pricing/PricingPlans.tsx` (`pricingFeatures`)
 *
 * Do not use `SUBSCRIPTION_TIERS[].features` as display copy; those arrays
 * include seat counts, which stay off every public string.
 *
 * When Kompleet changes a public price or feature line, update this module
 * in the same change window so the two pages cannot disagree.
 *
 * getkompleet.com/signup does not read a `?plan` query, so paid CTAs use
 * the plain signup URL (same as Free).
 */
const KOMPLEET_ORIGIN = "https://getkompleet.com";

export const KOMPLEET_SIGNUP_HREF = `${KOMPLEET_ORIGIN}/signup`;
export const KOMPLEET_LOGIN_HREF = `${KOMPLEET_ORIGIN}/login`;
export const KOMPLEET_PRICING_HREF = `${KOMPLEET_ORIGIN}/pricing`;

export const KOMPLEET_PLANS_INTRO =
  "Start on Free and move up when your business needs more. Every price includes VAT. Pay monthly, or pay yearly for the price of ten months.";

export const KOMPLEET_PLANS_UPGRADE_NOTE =
  "Upgrades from Free are set up by our team for now. Choose a plan in Billing after you sign up and we'll move your business across.";

export type KompleetPlanId = "free" | "plus" | "pro" | "max";

export type KompleetPlan = {
  id: KompleetPlanId;
  name: string;
  /** Monthly price in naira, VAT inclusive (0 for Free). */
  priceMonthlyNaira: number;
  /** Annual price in naira, VAT inclusive: ten times the monthly price (0 for Free). */
  priceAnnualNaira: number;
  priceLabel: string;
  priceSubline: string;
  everythingIn?: string;
  features: readonly string[];
  cta: string;
  href: string;
  primary: boolean;
};

function formatNaira(naira: number): string {
  return `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(naira)}`;
}

function monthlyLabel(naira: number): string {
  if (naira === 0) return formatNaira(0);
  return `${formatNaira(naira)} a month`;
}

function annualSubline(naira: number): string {
  if (naira === 0) return "VAT included";
  return `or ${formatNaira(naira)} a year. VAT included`;
}

export const KOMPLEET_PLANS: readonly KompleetPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthlyNaira: 0,
    priceAnnualNaira: 0,
    priceLabel: monthlyLabel(0),
    priceSubline: annualSubline(0),
    features: [
      "Up to 100 invoices a year",
      "Expense tracking",
      "Bank statement import",
      "Profit and Loss and balance sheet",
    ],
    cta: "Start free",
    href: KOMPLEET_SIGNUP_HREF,
    primary: true,
  },
  {
    id: "plus",
    name: "Plus",
    priceMonthlyNaira: 3_500,
    priceAnnualNaira: 35_000,
    priceLabel: monthlyLabel(3_500),
    priceSubline: annualSubline(35_000),
    everythingIn: "Everything in Free, plus:",
    features: [
      "Unlimited invoicing",
      "VAT report",
      "Send invoices by WhatsApp",
      "NRS e-invoicing for turnover below ₦25m",
    ],
    cta: "Choose Plus",
    href: KOMPLEET_SIGNUP_HREF,
    primary: false,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthlyNaira: 6_500,
    priceAnnualNaira: 65_000,
    priceLabel: monthlyLabel(6_500),
    priceSubline: annualSubline(65_000),
    everythingIn: "Everything in Plus, plus:",
    features: [
      "Daily sales and stock",
      "Owner reports by email",
    ],
    cta: "Choose Pro",
    href: KOMPLEET_SIGNUP_HREF,
    primary: false,
  },
  {
    id: "max",
    name: "Max",
    priceMonthlyNaira: 11_500,
    priceAnnualNaira: 115_000,
    priceLabel: monthlyLabel(11_500),
    priceSubline: annualSubline(115_000),
    everythingIn: "Everything in Pro, plus:",
    features: [
      "Advanced reports",
      "Priority support",
    ],
    cta: "Choose Max",
    href: KOMPLEET_SIGNUP_HREF,
    primary: false,
  },
];
