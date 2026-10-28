import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Privacy notice", "/privacy");

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice">
      <p>Last updated 28 October 2026</p>

      <h2>Who we are</h2>
      <p>
        This website is run by Ivano Technologies Ltd, a company registered in
        Nigeria ({SITE.rc}), with its office in Wuse 2, Abuja. In this notice
        &quot;we&quot; means Ivano Technologies Ltd. We decide how the personal
        data described here is used, so we are its data controller under the
        Nigeria Data Protection Act 2023 (NDPA).
      </p>
      <p>Contact for anything in this notice: {mail}.</p>
      <p>
        This notice covers this website only. Our products (Kompleet, Ivano
        PMS) and the systems we build for clients have their own notices. Where
        we run a system for a client, the client&apos;s own notice usually
        applies.
      </p>

      <h2>What we collect and why</h2>
      <div className="legal-table-wrap">
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">When</th>
              <th scope="col">Why</th>
              <th scope="col">Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Your name, email address, subject and message</td>
              <td>
                When you use the contact form or email us. The form opens your
                own email app; nothing is stored on this website.
              </td>
              <td>
                To read and reply to you, and to follow up on a project you ask
                about
              </td>
              <td>
                Our legitimate interest in answering enquiries, or steps you ask
                us to take before a contract
              </td>
            </tr>
            <tr>
              <td>
                Technical data such as IP address, browser type and the page
                requested
              </td>
              <td>Every visit, in our hosting provider&apos;s server logs</td>
              <td>To keep the site running, secure and free of abuse</td>
              <td>Our legitimate interest in running a secure website</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We do not sell personal data. We do not use it for advertising. We do
        not make automated decisions about you.
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not set any cookies and does not use analytics or
        advertising trackers. See our Cookie notice at{" "}
        <Link href="/cookies">/cookies</Link>. If that changes we will update
        both notices and ask for your consent first where the law requires it.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use a small number of service providers who process data for us
        under our instructions:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> hosts this website and keeps its server
          logs.
        </li>
        <li>
          <strong>Zoho Corporation</strong> hosts our email ({mail}) in its
          United States data centre.
        </li>
      </ul>
      <p>
        We may also share data where the law requires it, for example with a
        court or regulator.
      </p>

      <h2>Transfers outside Nigeria</h2>
      <p>
        Our hosting and email providers store data outside Nigeria, including
        in the United States. We only transfer data where the NDPA allows it,
        for example where the destination gives adequate protection or
        appropriate safeguards are in place in our contract with the provider
        (NDPA sections 41 to 43).
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          Enquiry emails: for as long as needed to answer you and follow up,
          and then deleted. If an enquiry becomes part of a contract with you,
          we keep it as part of that contract&apos;s records.
        </li>
        <li>
          Hosting server logs: kept for no more than 30 days under our hosting
          provider&apos;s published log retention limits.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>Under the NDPA you can ask us to:</p>
      <ul>
        <li>tell you what data we hold about you and give you a copy;</li>
        <li>correct data that is wrong or incomplete;</li>
        <li>delete your data;</li>
        <li>stop or limit how we use it, or object to our use of it;</li>
        <li>give you your data in a format you can reuse elsewhere;</li>
        <li>withdraw any consent you gave, at any time.</li>
      </ul>
      <p>
        Email {mail} with the subject &quot;Data request&quot;. We may ask you
        to confirm who you are. We will reply without undue delay. It is free.
      </p>
      <p>
        If you are not happy with our answer you can complain to the Nigeria
        Data Protection Commission (NDPC),{" "}
        <a href="https://ndpc.gov.ng" rel="noopener noreferrer" target="_blank">
          https://ndpc.gov.ng
        </a>
        .
      </p>

      <h2>If something goes wrong</h2>
      <p>
        If a breach affecting your data is likely to put your rights at risk,
        we will tell the NDPC within 72 hours of finding out and tell you
        directly without delay if the risk to you is high.
      </p>

      <h2>Children</h2>
      <p>
        This website is meant for businesses and adults. We do not knowingly
        collect data from anyone under 18.
      </p>

      <h2>Visitors from Canada and the United States</h2>
      <p>
        Ivano Technologies Ltd is registered in Nigeria. If you write to us
        from Canada or the United States, the same rights above apply and you
        can use the same address.
      </p>

      <h2>Changes</h2>
      <p>If we change this notice we will update the date at the top.</p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.officeArea} · {mail}
      </p>
    </LegalPage>
  );
}
