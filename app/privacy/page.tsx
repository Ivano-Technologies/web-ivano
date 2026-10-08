import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Privacy", "/privacy");

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      lede="How we handle the details you send us through this site."
    >
      <p>Last updated 8 October 2026</p>
      <h2>What we collect</h2>
      <p>
        When you use our contact form, we collect your name, email address,
        subject and message. Nothing else is collected through the form.
      </p>
      <h2>Why we collect it</h2>
      <p>We use these details only to read and reply to your message.</p>
      <h2>What we don’t do</h2>
      <p>
        We do not sell, rent or share your details with anyone for marketing.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We keep your message for as long as we need to respond and follow up,
        and no longer than 12 months after our last exchange.
      </p>
      <h2>Site statistics and cookies</h2>
      <p>
        Our site is served through Cloudflare. It counts visits with privacy
        friendly statistics that use no cookies, and it may set one security
        cookie to protect the site from abuse. We use no advertising or
        tracking cookies.
      </p>
      <h2>Your choices</h2>
      <p>
        To see, correct or delete what we hold about you, email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will act on it
        promptly.
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
