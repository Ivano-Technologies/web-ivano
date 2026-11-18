import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieBanner";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Cookie notice", "/cookies");

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie notice">
      <p>Last updated 18 November 2026</p>

      <h2>The short version</h2>
      <p>
        This website uses Google Analytics 4 only if you choose Accept. Until
        then it does not load Google&apos;s scripts, set analytics cookies, or
        store your choice. Accepting stores your choice in this browser&apos;s
        local storage and lets Google set analytics cookies. Decline stores
        that choice and loads no analytics. There is no advertising or social
        media tracking.
      </p>

      <h2>Fonts and hosting</h2>
      <p>
        Our fonts are served from our own website, so loading a page does not
        contact Google or any other font service. The site is hosted by Vercel
        Inc., which keeps standard server logs (IP address, browser type, page
        requested) to keep the site secure. Those logs are covered in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Analytics (only if you accept)</h2>
      <p>
        Google Analytics 4 (gtag.js) records page URL, referrer, browser and
        device type, and a random client identifier so we can see how the site
        is used. It does not receive your name or email from this site.
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">
                Name
              </th>
              <th scope="col" role="columnheader">
                Set by
              </th>
              <th scope="col" role="columnheader">
                Purpose
              </th>
              <th scope="col" role="columnheader">
                Lasts
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell" data-label="Name">
                _ga
              </td>
              <td role="cell" data-label="Set by">
                Google Analytics
              </td>
              <td role="cell" data-label="Purpose">
                Tells visits apart
              </td>
              <td role="cell" data-label="Lasts">
                2 years
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Name">
                _ga_*
              </td>
              <td role="cell" data-label="Set by">
                Google Analytics
              </td>
              <td role="cell" data-label="Purpose">
                Keeps the session
              </td>
              <td role="cell" data-label="Lasts">
                2 years
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Name">
                ivano_cookie_consent
              </td>
              <td role="cell" data-label="Set by">
                This site
              </td>
              <td role="cell" data-label="Purpose">
                Remembers Accept or Decline
              </td>
              <td role="cell" data-label="Lasts">
                Until you clear site data
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Your choice</h2>
      <p>
        You choose Accept or Decline when you first visit, before any analytics
        cookie is set. You can change your mind at any time from Cookie
        settings in the footer. Declining does not stop you using any part of
        the site. This follows Article 19 of the NDPC General Application and
        Implementation Directive 2025.
      </p>
      <p>
        <CookieSettingsButton className="btn btn-secondary" />
      </p>

      <h2>Questions</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>

      <h2>Other notices</h2>
      <p>
        See also our <Link href="/terms">Terms of Service</Link>,{" "}
        <Link href="/refunds">Refund Policy</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.officeArea}
      </p>
    </LegalPage>
  );
}
