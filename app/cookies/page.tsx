import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Cookie notice", "/cookies");

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie notice">
      <p>Last updated 28 October 2026</p>

      <h2>The short version</h2>
      <p>
        This website does not use cookies. It does not use analytics,
        advertising or social media trackers, and it does not store anything
        in your browser&apos;s local storage.
      </p>

      <h2>Fonts and hosting</h2>
      <p>
        Our fonts are served from our own website, so loading a page does not
        contact Google or any other font service. The site is hosted by Vercel
        Inc., which keeps standard server logs (IP address, browser type, page
        requested) to keep the site secure. Those logs are covered in our
        Privacy notice (<Link href="/privacy">/privacy</Link>).
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics or any other non-essential cookie or tracker,
        we will update this notice first, show a clear &quot;Accept&quot; and
        &quot;Reject&quot; choice on your first visit before anything is set,
        and let you change your mind at any time from a link in the footer.
        This follows Article 19 of the NDPC General Application and
        Implementation Directive 2025.
      </p>

      <h2>Questions</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.officeArea}
      </p>
    </LegalPage>
  );
}
