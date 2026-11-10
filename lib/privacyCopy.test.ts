import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { KOMPLEET_HREF, KOMPLEET_PRIVACY_HREF } from "./products.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVACY = join(ROOT, "app/privacy/page.tsx");

const STALE = [
  "Supabase",
  "Anthropic",
  "OpenAI",
  "Moonshot",
  "Kimi",
  "Founding Lifetime",
  "join Kompleet",
  "buy our products through this website",
  "Paystack",
  "active licence, then 12 months",
  "source of truth",
] as const;

describe("company privacy page", () => {
  const text = readFileSync(PRIVACY, "utf8");

  it("points at Kompleet's notice and does not say either page prevails", () => {
    assert.equal(KOMPLEET_PRIVACY_HREF, `${KOMPLEET_HREF}/privacy`);
    assert.match(text, /kompleet\.techivano\.com\/privacy/);
    assert.match(text, /KOMPLEET_PRIVACY_HREF/);
    assert.match(text, /Neither notice prevails over the\s+other/);
    assert.doesNotMatch(text, /source of truth/i);
    assert.doesNotMatch(text, /this (page|notice) prevails/i);
    assert.doesNotMatch(text, /company page is the source/i);
  });

  it("drops stale Kompleet processors, offers and Paystack licence wording", () => {
    const hits = STALE.filter((token) => text.includes(token));
    assert.equal(hits.length, 0, hits.join(", "));
  });

  it("keeps company identity, DPO, mail routing, transfers and the 10 Nov date", () => {
    assert.match(text, /Ivano Technologies Ltd/);
    assert.match(text, /SITE\.rc/);
    assert.match(text, /SITE\.legalAddress/);
    assert.match(text, /David\s+Inalegwu/);
    assert.match(text, /SITE\.supportEmail/);
    assert.match(text, /SITE\.email/);
    assert.match(text, /Data-protection requests and disputes/);
    assert.match(text, /General enquiries/);
    assert.match(text, /ss\. 41 to 43/);
    assert.match(text, /Last updated 10 Nov 2026/);
    assert.match(text, /Convex, Inc\./);
    assert.match(text, /Resend, Inc\./);
    assert.match(text, /Sentry/);
    assert.match(text, /Zoho Corporation/);
    assert.match(text, /We do not currently send personal data to AI providers/);
  });
});
