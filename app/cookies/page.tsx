import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Cookies", "/cookies");

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" lede="The cookies on this site and what they do.">
      <p>Last updated 8 October 2026</p>
      <h2>What this site stores</h2>
      <p>
        The site itself stores nothing in your browser. We use no advertising
        or tracking cookies.
      </p>
      <h2>Visitor statistics</h2>
      <p>
        Our site is served through Cloudflare. It counts visits with privacy
        friendly statistics that use no cookies. These statistics are
        collected through static.cloudflareinsights.com.
      </p>
      <h2>Security cookie</h2>
      <p>
        Cloudflare may set one security cookie, named cf_clearance, to protect
        the site from abuse. It shows that your browser has passed a Cloudflare
        security check, so you are not asked to check again on every visit. We
        do not use it for advertising or tracking.
      </p>
      <h2>Your choices</h2>
      <p>
        You can block or delete cookies in your browser settings. If you block
        the security cookie, Cloudflare may ask you to complete a security
        check again.
      </p>
      <p>
        To see how we handle the details you send us, read our{" "}
        <Link href="/privacy">Privacy</Link> page. Questions: email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
      <p>
        Ivano Technologies Ltd
        <br />
        {SITE.rc}
        <br />
        {SITE.location}
      </p>
    </LegalPage>
  );
}
