"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { shouldShowCookieBanner } from "@/lib/analytics";
import {
  type AnalyticsConsent,
  getConsentSnapshot,
  getServerConsentSnapshot,
  openCookieSettings,
  subscribeConsent,
  subscribeOpenSettings,
  writeConsent,
} from "@/lib/consent";

type CookieBannerProps = {
  measurementId: string | null;
};

/**
 * First-visit cookie choice. Not a modal: it does not trap focus or block
 * the page. Accept and Decline share one class so they carry equal weight.
 */
export function CookieBanner({ measurementId }: CookieBannerProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [reopened, setReopened] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const analyticsEnabled = shouldShowCookieBanner(measurementId);

  useEffect(
    () =>
      subscribeOpenSettings(() => {
        setReopened(true);
        window.requestAnimationFrame(() => headingRef.current?.focus());
      }),
    [],
  );

  const visible =
    analyticsEnabled && (consent === "unset" || reopened);

  useEffect(() => {
    const root = document.documentElement;
    const open = visible && consent !== "pending";
    root.classList.toggle("cookie-banner-open", open);
    return () => {
      root.classList.remove("cookie-banner-open");
    };
  }, [visible, consent]);

  if (!visible || consent === "pending") {
    return null;
  }

  function choose(value: AnalyticsConsent) {
    writeConsent(value);
    setReopened(false);
  }

  return (
    <section
      className="cookie-banner"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      data-cookie-banner=""
    >
      <h2 id="cookie-banner-title" ref={headingRef} tabIndex={-1}>
        We use cookies
      </h2>
      <p id="cookie-banner-text">
        We use Google Analytics 4 to see how people use this site, only if you
        agree. See the{" "}
        <Link href="/cookies">Cookie notice</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="btn cookie-banner-choice"
          onClick={() => choose("granted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn cookie-banner-choice"
          onClick={() => choose("denied")}
        >
          Decline
        </button>
      </div>
    </section>
  );
}

/** Footer and /cookies control to change the choice later. */
export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}
