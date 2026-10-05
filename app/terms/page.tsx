import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Terms", "/terms");

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>
        This website is provided by {SITE.legalName} ({SITE.rc}) for information
        about our products and services. This page is a v1 stub until full terms
        are approved.
      </p>
      <h2>Product hosts</h2>
      <p>
        Linked products (Kompleet, Ivano PMS, NRCS EAM, and client systems) are
        governed by their own hosts and terms.
      </p>
      <h2>Contact</h2>
      <p>
        Questions:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
