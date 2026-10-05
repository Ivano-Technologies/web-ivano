import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Privacy", "/privacy");

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        Ivano Technologies Ltd ({SITE.rc}) respects your privacy. This page is a
        v1 stub until full policy copy is approved.
      </p>
      <h2>What we collect</h2>
      <p>
        If you write to us via the contact form or email, we receive the name,
        email address, subject, and message you send so we can reply.
      </p>
      <h2>Contact</h2>
      <p>
        Questions:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
