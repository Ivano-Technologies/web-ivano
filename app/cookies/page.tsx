import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Cookies", "/cookies");

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies">
      <p>
        This v1 marketing site does not set analytics or advertising cookies.
        Essential cookies may be used by the host to operate the site.
      </p>
      <h2>Contact</h2>
      <p>
        Questions:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
