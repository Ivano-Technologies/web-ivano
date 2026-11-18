import type { ConsentSnapshot } from "./consent.ts";

const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]+$/i;

export const GTAG_SCRIPT_SRC = "https://www.googletagmanager.com/gtag/js";

/**
 * Returns the GA4 Measurement ID when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is a
 * non-empty GA4 id (`G-` followed by alphanumerics). Empty or invalid values
 * load no gtag.
 */
export function getGaMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (typeof raw !== "string") {
    return null;
  }

  const measurementId = raw.trim();
  if (!measurementId || !GA4_MEASUREMENT_ID.test(measurementId)) {
    return null;
  }

  return measurementId;
}

export function gtagScriptUrl(measurementId: string): string {
  return `${GTAG_SCRIPT_SRC}?id=${encodeURIComponent(measurementId)}`;
}

export function shouldLoadGoogleAnalytics(
  measurementId: string | null,
  consent: ConsentSnapshot,
): boolean {
  if (!measurementId) {
    return false;
  }
  switch (consent) {
    case "granted":
      return true;
    case "denied":
    case "unset":
    case "pending":
      return false;
    default: {
      const exhaustive: never = consent;
      throw new Error(`Unhandled consent: ${exhaustive}`);
    }
  }
}

/** Script URL that would be requested, or null when GA must stay unloaded. */
export function googleAnalyticsScriptSrc(
  measurementId: string | null,
  consent: ConsentSnapshot,
): string | null {
  if (!measurementId || !shouldLoadGoogleAnalytics(measurementId, consent)) {
    return null;
  }
  return gtagScriptUrl(measurementId);
}

/** Banner is only for builds that actually have a GA4 id. */
export function shouldShowCookieBanner(measurementId: string | null): boolean {
  return measurementId !== null;
}
