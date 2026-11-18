import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  GTAG_SCRIPT_SRC,
  getGaMeasurementId,
  googleAnalyticsScriptSrc,
  gtagScriptUrl,
  shouldLoadGoogleAnalytics,
  shouldShowCookieBanner,
} from "./analytics.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURE_ID = "G-TESTID123";
const HARDCODED_GA_ID = /\bG-[A-Z0-9]{8,}\b/;

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
    if (/\.(ts|tsx|js|jsx|mjs|md)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

function withMeasurementId<T>(value: string | undefined, run: () => T): T {
  const previous = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  } else {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = value;
  }
  try {
    return run();
  } finally {
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    } else {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = previous;
    }
  }
}

describe("GA4 measurement id and load gating", () => {
  it("is a no-op without the env var, and ignores blank or invalid values", () => {
    withMeasurementId(undefined, () => {
      assert.equal(getGaMeasurementId(), null);
      assert.equal(
        googleAnalyticsScriptSrc(getGaMeasurementId(), "granted"),
        null,
      );
    });
    withMeasurementId("  ", () => {
      assert.equal(getGaMeasurementId(), null);
    });
    withMeasurementId("UA-123456", () => {
      assert.equal(getGaMeasurementId(), null);
    });
    withMeasurementId("G-TESTID123", () => {
      assert.equal(getGaMeasurementId(), FIXTURE_ID);
    });
  });

  it("makes no GA request before consent", () => {
    assert.equal(shouldLoadGoogleAnalytics(FIXTURE_ID, "unset"), false);
    assert.equal(shouldLoadGoogleAnalytics(FIXTURE_ID, "pending"), false);
    assert.equal(googleAnalyticsScriptSrc(FIXTURE_ID, "unset"), null);
    assert.equal(googleAnalyticsScriptSrc(FIXTURE_ID, "pending"), null);
  });

  it("loads the gtag script after Accept", () => {
    const src = googleAnalyticsScriptSrc(FIXTURE_ID, "granted");
    assert.equal(src, `${GTAG_SCRIPT_SRC}?id=${FIXTURE_ID}`);
    assert.equal(src, gtagScriptUrl(FIXTURE_ID));
    assert.equal(shouldLoadGoogleAnalytics(FIXTURE_ID, "granted"), true);
  });

  it("loads nothing on Decline", () => {
    assert.equal(shouldLoadGoogleAnalytics(FIXTURE_ID, "denied"), false);
    assert.equal(googleAnalyticsScriptSrc(FIXTURE_ID, "denied"), null);
  });

  it("does not show the cookie banner when the env var is unset", () => {
    withMeasurementId(undefined, () => {
      assert.equal(shouldShowCookieBanner(getGaMeasurementId()), false);
    });
    withMeasurementId("  ", () => {
      assert.equal(shouldShowCookieBanner(getGaMeasurementId()), false);
    });
    withMeasurementId("G-TESTID123", () => {
      assert.equal(shouldShowCookieBanner(getGaMeasurementId()), true);
    });

    const banner = readFileSync(
      join(ROOT, "components/CookieBanner.tsx"),
      "utf8",
    );
    const layout = readFileSync(join(ROOT, "app/layout.tsx"), "utf8");
    assert.match(banner, /shouldShowCookieBanner\(measurementId\)/);
    assert.match(layout, /CookieBanner measurementId=\{gaMeasurementId\}/);
  });

  it("does not hardcode a GA4 measurement id in source", () => {
    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      if (HARDCODED_GA_ID.test(readFileSync(file, "utf8"))) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });

  it("built pages do not request gtag when the env var is unset", () => {
    const serverApp = join(ROOT, ".next", "server", "app");
    assert.ok(
      existsSync(serverApp),
      "No built pages found under .next/server/app. Run npm run build first.",
    );
    const files: string[] = [];
    function walkBuilt(dir: string): void {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
          walkBuilt(full);
          continue;
        }
        if (full.endsWith(".html") || full.endsWith(".rsc")) {
          files.push(full);
        }
      }
    }
    walkBuilt(serverApp);
    assert.ok(files.length > 0, "No built HTML/RSC pages found. Run npm run build first.");
    const failures: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (
        text.includes("googletagmanager.com") ||
        text.includes("google-analytics.com")
      ) {
        failures.push(rel);
      }
      if (file.endsWith(".html") && text.includes("data-cookie-banner")) {
        failures.push(rel);
      }
    }
    assert.equal(failures.length, 0, failures.join(", "));
  });
});
