import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { KOMPLEET_HREF } from "./products.ts";
import {
  KOMPLEET_LOGIN_HREF,
  KOMPLEET_PLANS,
  KOMPLEET_PRICING_HREF,
  KOMPLEET_SIGNUP_HREF,
} from "./kompleetPlans.ts";

const EXPECTED = [
  {
    id: "free",
    name: "Free",
    priceMonthlyNaira: 0,
    priceAnnualNaira: 0,
    priceLabel: "₦0",
    priceSubline: "VAT included",
    everythingIn: undefined,
    features: [
      "Up to 100 invoices a year",
      "Expense tracking",
      "Bank statement import",
      "Profit and Loss and balance sheet",
    ],
    cta: "Start free",
    primary: true,
  },
  {
    id: "plus",
    name: "Plus",
    priceMonthlyNaira: 3_500,
    priceAnnualNaira: 35_000,
    priceLabel: "₦3,500 a month",
    priceSubline: "or ₦35,000 a year. VAT included",
    everythingIn: "Everything in Free, plus:",
    features: [
      "Unlimited invoicing",
      "VAT report",
      "Send invoices by WhatsApp",
      "NRS e-invoicing for turnover below ₦25m",
    ],
    cta: "Choose Plus",
    primary: false,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthlyNaira: 6_500,
    priceAnnualNaira: 65_000,
    priceLabel: "₦6,500 a month",
    priceSubline: "or ₦65,000 a year. VAT included",
    everythingIn: "Everything in Plus, plus:",
    features: [
      "Daily sales and stock",
      "Owner reports by email",
    ],
    cta: "Choose Pro",
    primary: false,
  },
  {
    id: "max",
    name: "Max",
    priceMonthlyNaira: 11_500,
    priceAnnualNaira: 115_000,
    priceLabel: "₦11,500 a month",
    priceSubline: "or ₦115,000 a year. VAT included",
    everythingIn: "Everything in Pro, plus:",
    features: [
      "Advanced reports",
      "Priority support",
    ],
    cta: "Choose Max",
    primary: false,
  },
] as const;

describe("Kompleet public plans", () => {
  it("lists Free, Plus, Pro and Max with the documented amounts and lines", () => {
    assert.equal(KOMPLEET_PLANS.length, 4);
    assert.deepEqual(
      KOMPLEET_PLANS.map((plan) => plan.id),
      ["free", "plus", "pro", "max"],
    );
    for (const [index, expected] of EXPECTED.entries()) {
      const plan = KOMPLEET_PLANS[index];
      assert.ok(plan);
      assert.equal(plan.id, expected.id);
      assert.equal(plan.name, expected.name);
      assert.equal(plan.priceMonthlyNaira, expected.priceMonthlyNaira);
      assert.equal(plan.priceAnnualNaira, expected.priceAnnualNaira);
      assert.equal(plan.priceAnnualNaira, expected.priceMonthlyNaira * 10);
      assert.equal(plan.priceLabel, expected.priceLabel);
      assert.equal(plan.priceSubline, expected.priceSubline);
      assert.equal(plan.everythingIn, expected.everythingIn);
      assert.deepEqual(plan.features, expected.features);
      assert.equal(plan.cta, expected.cta);
      assert.equal(plan.primary, expected.primary);
      assert.equal(plan.href, KOMPLEET_SIGNUP_HREF);
    }
  });

  it("uses plain signup and login URLs, with no recommended flag", () => {
    assert.equal(KOMPLEET_HREF, "https://getkompleet.com");
    assert.equal(KOMPLEET_SIGNUP_HREF, `${KOMPLEET_HREF}/signup`);
    assert.equal(KOMPLEET_LOGIN_HREF, `${KOMPLEET_HREF}/login`);
    assert.equal(KOMPLEET_PRICING_HREF, `${KOMPLEET_HREF}/pricing`);
    assert.equal(
      KOMPLEET_PLANS.filter((plan) => plan.primary).map((plan) => plan.id).join(),
      "free",
    );
    for (const plan of KOMPLEET_PLANS) {
      assert.equal(plan.href.includes("?plan="), false);
    }
  });
});
