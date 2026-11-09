import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  KOMPLEET_LEGACY_PREFIXES,
  KOMPLEET_ORIGIN,
  kompleetRedirectDestination,
  kompleetRedirects,
} from "./kompleetRedirects.ts";

/** Must stay on www. Keep in sync with MARKETING_PATHS in lib/seo.ts plus public files. */
const PUBLIC_WWW_PATHS = [
  "/",
  "/products",
  "/services",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/company-profile.pdf",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/.well-known/security.txt",
];

describe("kompleet legacy redirects", () => {
  it("emits a permanent (308) Next.js rule for each leftover prefix", () => {
    const redirects = kompleetRedirects();
    assert.equal(redirects.length, KOMPLEET_LEGACY_PREFIXES.length);
    for (const prefix of KOMPLEET_LEGACY_PREFIXES) {
      const rule = redirects.find((item) => item.source === `${prefix}/:path*`);
      assert.ok(rule, `missing redirect for ${prefix}`);
      assert.equal(rule.permanent, true);
      assert.equal(rule.destination, `${KOMPLEET_ORIGIN}${prefix}/:path*`);
    }
  });

  it("preserves the same subpath and query string on the Kompleet origin", () => {
    assert.equal(
      kompleetRedirectDestination("/login"),
      `${KOMPLEET_ORIGIN}/login`,
    );
    assert.equal(
      kompleetRedirectDestination("/dashboard/invoices/new", "?org=acme"),
      `${KOMPLEET_ORIGIN}/dashboard/invoices/new?org=acme`,
    );
    assert.equal(
      kompleetRedirectDestination("/app/reports", "?tab=open&sort=date"),
      `${KOMPLEET_ORIGIN}/app/reports?tab=open&sort=date`,
    );
    assert.equal(
      kompleetRedirectDestination("/reset-password", "?token=abc"),
      `${KOMPLEET_ORIGIN}/reset-password?token=abc`,
    );
    assert.equal(
      kompleetRedirectDestination("/forgot-password/"),
      `${KOMPLEET_ORIGIN}/forgot-password`,
    );
    assert.equal(
      kompleetRedirectDestination("/signup", "plan=pro"),
      `${KOMPLEET_ORIGIN}/signup?plan=pro`,
    );
  });

  it("does not shadow existing www marketing or public paths", () => {
    for (const path of PUBLIC_WWW_PATHS) {
      assert.equal(
        kompleetRedirectDestination(path),
        null,
        `${path} must stay on www`,
      );
    }
    assert.equal(kompleetRedirectDestination("/apple-touch-icon.png"), null);
    assert.equal(kompleetRedirectDestination("/about/team"), null);
    assert.equal(kompleetRedirectDestination("/products/kompleet"), null);
  });
});
