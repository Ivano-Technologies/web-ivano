/**
 * Analytics consent (GAID Art. 19).
 *
 * The visitor's choice is stored in first-party localStorage. Until the
 * visitor accepts, no gtag script loads and no _ga cookies are set.
 */

export type AnalyticsConsent = "granted" | "denied";

/** Server render and pre-hydration value: nothing is known yet. */
export type ConsentSnapshot = AnalyticsConsent | "unset" | "pending";

export const CONSENT_STORAGE_KEY = "ivano_cookie_consent";
export const CONSENT_VERSION = 1;

const CHANGE_EVENT = "ivano:consent-change";
const OPEN_EVENT = "ivano:consent-open";

type StoredConsent = {
  v: number;
  analytics: AnalyticsConsent;
  at: string;
};

export function parseStoredConsent(raw: string | null): AnalyticsConsent | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.v !== CONSENT_VERSION) {
      return null;
    }
    if (parsed.analytics === "granted" || parsed.analytics === "denied") {
      return parsed.analytics;
    }
  } catch {
    return null;
  }
  return null;
}

export function readConsent(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "pending";
  }
  try {
    return (
      parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)) ??
      "unset"
    );
  } catch {
    return "unset";
  }
}

export function writeConsent(value: AnalyticsConsent): void {
  const record: StoredConsent = {
    v: CONSENT_VERSION,
    analytics: value,
    at: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  memoryConsent = value;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

let memoryConsent: AnalyticsConsent | null = null;

/** useSyncExternalStore snapshot. Falls back to an in-memory choice. */
export function getConsentSnapshot(): ConsentSnapshot {
  const stored = readConsent();
  if (stored === "unset" && memoryConsent) {
    return memoryConsent;
  }
  return stored;
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return "pending";
}

export function subscribeConsent(onChange: () => void): () => void {
  function onStorage(event: StorageEvent) {
    if (event.key === CONSENT_STORAGE_KEY) {
      onChange();
    }
  }
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Reopen the banner from "Cookie settings". */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeOpenSettings(onOpen: () => void): () => void {
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}

/** Remove _ga and _ga_* cookies on this host and its parent domains. */
export function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim() ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  if (names.length === 0) {
    return;
  }
  const labels = window.location.hostname.split(".");
  const domains: string[] = [""];
  for (let i = 0; i < labels.length - 1; i += 1) {
    domains.push(`; domain=.${labels.slice(i).join(".")}`);
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}
