"use client";

import Script from "next/script";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { googleAnalyticsScriptSrc } from "@/lib/analytics";
import {
  clearAnalyticsCookies,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

type GoogleAnalyticsProps = {
  measurementId: string | null;
};

/**
 * GA4 loads only after the visitor accepts the cookie banner. Before a
 * choice, and after Decline, no gtag script is requested and no _ga cookie
 * is set. Withdrawing consent clears the cookies and reloads the page so
 * the already loaded gtag is gone.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const wasGranted = useRef(false);
  const scriptSrc = googleAnalyticsScriptSrc(measurementId, consent);

  useEffect(() => {
    if (consent === "granted") {
      wasGranted.current = true;
      return;
    }
    if (consent === "denied") {
      clearAnalyticsCookies();
      if (wasGranted.current && measurementId) {
        (window as unknown as Record<string, unknown>)[
          `ga-disable-${measurementId}`
        ] = true;
        window.location.reload();
      }
    }
  }, [consent, measurementId]);

  if (!measurementId || !scriptSrc) {
    return null;
  }

  return (
    <>
      <Script id="ga4-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${measurementId}');
`}
      </Script>
      <Script src={scriptSrc} strategy="afterInteractive" />
    </>
  );
}
