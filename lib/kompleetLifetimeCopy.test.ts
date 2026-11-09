import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  KOMPLEET_FOUNDING_CTA,
  KOMPLEET_HREF,
  KOMPLEET_PRICING_HREF,
  KOMPLEET_SEE_CTA,
  PRODUCTS,
} from "./products.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Bare ₦ as the Naira symbol is allowed. Amounts (₦ plus digits, NGN plus digits, 5,000 / 5000) are not. */
const PRICE_AMOUNT = /₦\s*[\d,]+|\bNGN\s*[\d,]+|\b5,000\b|\b5000\b/;
const KOMPLEET_PRICE = /₦\s*5,?000|\b5,000\b|\b5000\b/;
const NO_PRICE_ROUTES = [
  "app/terms/page.tsx",
  "app/refunds/page.tsx",
  "app/products/page.tsx",
] as const;
const OLD_SALE_NOW_LINES = [
  "One-off payment via Paystack",
  "Not happy?",
  "Full refund within 14 days",
  "Access starts immediately after payment",
  "Any payment received after the 100th seat",
];
const FOUNDING_NOTE =
  "When it opens, the founding offer is a one-off payment through Paystack, with lifetime meaning for as long as Kompleet is offered. See our Terms of Service and Refund Policy.";
const LEGAL_PREFIXES = [
  "app/terms/",
  "app/refunds/",
  "app/privacy/",
  "app/cookies/",
  "app/contact/",
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") {
      continue;
    }
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs|md|txt)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

describe("Kompleet founding lifetime copy", () => {
  const kompleet = PRODUCTS.find((product) => product.highlight === "kompleet");

  it("uses the coming soon CTA with no price and keeps the founding framing", () => {
    assert.ok(kompleet);
    assert.equal(kompleet.cta, "Founding lifetime offer coming soon");
    assert.equal(kompleet.cta, KOMPLEET_FOUNDING_CTA);
    assert.equal(kompleet.href, KOMPLEET_PRICING_HREF);
    assert.equal(kompleet.href, "https://kompleet.techivano.com/pricing");
    assert.equal(kompleet.secondaryCta, KOMPLEET_SEE_CTA);
    assert.equal(kompleet.secondaryHref, KOMPLEET_HREF);
    assert.equal(kompleet.price, undefined);
    assert.equal(kompleet.badgeLabel, "Founding offer");
    assert.match(kompleet.priceNote ?? "", /first 100 users only/);
    assert.ok((kompleet.includes?.length ?? 0) >= 3);
  });

  it("does not publish a naira or NGN amount anywhere in source", () => {
    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      if (PRICE_AMOUNT.test(readFileSync(file, "utf8"))) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("does not publish ₦5,000 on /terms, /refunds or /products", () => {
    const failures: string[] = [];
    for (const rel of NO_PRICE_ROUTES) {
      const text = readFileSync(join(ROOT, rel), "utf8");
      if (KOMPLEET_PRICE.test(text) || PRICE_AMOUNT.test(text)) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("uses the coming soon founding note and drops sale-now sentences", () => {
    const page = readFileSync(join(ROOT, "app/products/page.tsx"), "utf8");
    const fineprint = page.match(
      /className="product-fineprint">([\s\S]*?)<\/p>/,
    );
    assert.ok(fineprint?.[1], "missing Products founding note");
    const visible = fineprint[1]
      .replace(/\{\s*" "\s*\}/g, " ")
      .replace(/<Link href="\/terms">Terms of Service<\/Link>/g, "Terms of Service")
      .replace(/<Link href="\/refunds">Refund Policy<\/Link>/g, "Refund Policy")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(visible, FOUNDING_NOTE);
    assert.match(page, /href="\/terms">Terms of Service</);
    assert.match(page, /href="\/refunds">Refund Policy</);
    assert.equal(PRICE_AMOUNT.test(page), false);

    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (LEGAL_PREFIXES.some((prefix) => rel.startsWith(prefix))) {
        continue;
      }
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      const text = readFileSync(file, "utf8");
      for (const line of OLD_SALE_NOW_LINES) {
        if (text.includes(line)) {
          failures.push(`${rel}: ${line}`);
        }
      }
    }
    assert.equal(failures.length, 0, failures.join("\n"));
  });
});
