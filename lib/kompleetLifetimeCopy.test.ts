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
const NAIRA_OR_AMOUNT = /₦|5,000/;
const SEAT_REFUND_LINE = /Any payment received after the\s*100th seat/;
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

  it("does not publish a naira amount outside legal pages", () => {
    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (LEGAL_PREFIXES.some((prefix) => rel.startsWith(prefix))) {
        continue;
      }
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      if (NAIRA_OR_AMOUNT.test(readFileSync(file, "utf8"))) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("drops the 100th seat payment line from the Products page", () => {
    const page = readFileSync(join(ROOT, "app/products/page.tsx"), "utf8");
    assert.equal(SEAT_REFUND_LINE.test(page), false);
    assert.equal(NAIRA_OR_AMOUNT.test(page), false);
  });
});
