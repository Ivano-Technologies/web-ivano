import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { KOMPLEET_HREF, KOMPLEET_SEE_CTA, PRODUCTS } from "./products.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Bare ₦ as the Naira symbol is allowed. Amounts (₦ plus digits, NGN plus digits, 5,000 / 5000) are not. */
const PRICE_AMOUNT = /₦\s*[\d,]+|\bNGN\s*[\d,]+|\b5,000\b|\b5000\b/;
const NO_PRICE_ROUTES = ["app/terms/page.tsx", "app/refunds/page.tsx"] as const;
const FOUNDERS_CLAUSE =
  "Businesses that bought a founding place keep what they paid for.";
const OLD_SALE_NOW_LINES = [
  "One-off payment via Paystack",
  "Not happy?",
  "Full refund within 14 days",
  "Access starts immediately after payment",
  "Any payment received after the 25th seat",
  "Any payment received after the 10th seat",
  "10 licences (seats)",
  "one named user account",
  "the 10-seat offer",
  "first 10 licences sold",
  "Founding lifetime offer coming soon",
  "Founding offer",
  "Founding Lifetime",
  "When it opens, the founding offer",
];
const PRICE_OK_PREFIXES = ["lib/kompleetPlans.ts"] as const;

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

function visibleFoundingHits(text: string): string[] {
  const withoutClause = text.split(FOUNDERS_CLAUSE).join(" ");
  const hits: string[] = [];
  const patterns: Array<[string, RegExp]> = [
    ["founding", /\bfounding\b/i],
    ["Founding Lifetime", /Founding Lifetime/i],
    ["lifetime offer", /lifetime offer/i],
  ];
  for (const [label, pattern] of patterns) {
    if (pattern.test(withoutClause)) {
      hits.push(label);
    }
  }
  return hits;
}

describe("Kompleet public copy", () => {
  const kompleet = PRODUCTS.find((product) => product.highlight === "kompleet");

  it("uses the See Kompleet CTA and a Product badge, with no founding fields", () => {
    assert.ok(kompleet);
    assert.equal(kompleet.cta, "See Kompleet");
    assert.equal(kompleet.cta, KOMPLEET_SEE_CTA);
    assert.equal(kompleet.href, KOMPLEET_HREF);
    assert.equal(kompleet.href, "https://getkompleet.com");
    assert.equal(kompleet.badgeLabel, "Product");
    assert.equal(kompleet.price, undefined);
    assert.equal(kompleet.priceNote, undefined);
    assert.equal(kompleet.includesLabel, undefined);
    assert.equal(kompleet.includes, undefined);
    assert.equal(kompleet.secondaryCta, undefined);
    assert.equal(kompleet.secondaryHref, undefined);
  });

  it("keeps one founders clause in Terms and no other founding wording", () => {
    const terms = readFileSync(join(ROOT, "app/terms/page.tsx"), "utf8");
    assert.ok(
      terms.includes(FOUNDERS_CLAUSE),
      "missing founders clause in Terms",
    );
    assert.equal(terms.split(FOUNDERS_CLAUSE).length - 1, 1);

    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      const text = readFileSync(file, "utf8");
      if (rel === "app/terms/page.tsx") {
        const extras = visibleFoundingHits(text);
        if (extras.length > 0) {
          failures.push(`${rel}: ${extras.join(", ")}`);
        }
        continue;
      }
      if (visibleFoundingHits(text).length > 0 || text.includes(FOUNDERS_CLAUSE)) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join("\n"));
  });

  it("does not publish a naira or NGN amount outside the plans module", () => {
    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      if (PRICE_OK_PREFIXES.some((prefix) => rel === prefix)) {
        continue;
      }
      if (PRICE_AMOUNT.test(readFileSync(file, "utf8"))) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("does not publish a naira or NGN amount on /terms or /refunds", () => {
    const failures: string[] = [];
    for (const rel of NO_PRICE_ROUTES) {
      const text = readFileSync(join(ROOT, rel), "utf8");
      if (PRICE_AMOUNT.test(text)) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("drops old sale-now and founding marketing sentences", () => {
    const page = readFileSync(join(ROOT, "app/products/page.tsx"), "utf8");
    const section = readFileSync(join(ROOT, "components/KompleetPlans.tsx"), "utf8");
    assert.match(section, /href="\/terms">Terms of Service</);
    assert.match(section, /href="\/refunds">Refund Policy</);
    assert.equal(page.includes("founding"), false);
    assert.equal(section.includes("founding"), false);
    assert.equal(PRICE_AMOUNT.test(page), false);
    assert.equal(PRICE_AMOUNT.test(section), false);

    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
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
