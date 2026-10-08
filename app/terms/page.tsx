import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Terms", "/terms");

export default function TermsPage() {
  return (
    <LegalPage title="Terms" lede="The terms for using this website.">
      <p>Last updated 8 October 2026</p>
      <h2>About this site</h2>
      <p>
        This website is provided by Ivano Technologies Ltd ({SITE.rc}) to give
        information about our products and services.
      </p>
      <h2>Using the site</h2>
      <p>You may use this site to learn about our work and to contact us.</p>
      <h2>Our name and logo</h2>
      <p>
        The Ivano Technologies name and logo belong to Ivano Technologies Ltd.
        Please ask us before using them.
      </p>
      <h2>Our products and other sites</h2>
      <p>
        Our linked products, including Kompleet, Ivano PMS, NRCS EAM and client
        systems, are governed by their own hosts and terms. Other sites we link
        to also have their own terms.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of
        this page shows when they last changed.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: email{" "}
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
