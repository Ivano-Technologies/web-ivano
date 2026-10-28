import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Terms of use", "/terms");

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <p>Last updated 28 October 2026</p>

      <h2>Who we are</h2>
      <p>
        This website is run by Ivano Technologies Ltd, a company registered in
        Nigeria ({SITE.rc}), with its office in Wuse 2, Abuja. Contact: {mail}.
        By using the site you agree to these terms.
      </p>

      <h2>What the site is for</h2>
      <p>
        The site explains who we are and what we build. The information is
        general. It is not an offer, a quote or professional advice, and it
        does not create a contract. Any work we do for you is governed by a
        separate written agreement.
      </p>

      <h2>Our products and client systems</h2>
      <p>
        Links on this site may lead to our products (such as Kompleet and Ivano
        PMS), to systems we run for clients, or to other websites. Each has its
        own terms and privacy notice, which apply when you use it. We are not
        responsible for websites we do not control.
      </p>

      <h2>Our name and content</h2>
      <p>
        The Ivano name, logo, the {SITE.socialHandle} handle and the content of
        this site belong to Ivano Technologies Ltd. You may share links and
        short quotes with credit. You may not copy, reuse or present our
        content or marks as your own without written permission.
      </p>

      <h2>Using the site fairly</h2>
      <p>
        Do not try to break, overload, scrape at scale or gain unauthorised
        access to the site, and do not use it to send spam or unlawful content.
      </p>

      <h2>No guarantee</h2>
      <p>
        We work to keep the site accurate and available, but it is provided
        &quot;as is&quot;. We do not promise it will always be available, error
        free or up to date.
      </p>

      <h2>Limits on our liability</h2>
      <p>
        To the extent the law allows, we are not liable for any indirect or
        consequential loss, or for loss of profit, data or business, arising
        from use of this site. Nothing in these terms limits liability that
        cannot be limited under Nigerian law, including liability for fraud or
        for death or personal injury caused by negligence.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle personal data is explained in our Privacy notice (
        <Link href="/privacy">/privacy</Link>) and Cookie notice (
        <Link href="/cookies">/cookies</Link>).
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top shows when they last
        changed.
      </p>

      <h2>Law and disputes</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of
        Nigeria. The courts of the Federal Capital Territory, Abuja have
        jurisdiction over any dispute.
      </p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.officeArea} · {mail}
      </p>
    </LegalPage>
  );
}
