import Link from "next/link";
import {
  LegalPage,
  MailLink,
  legalMetadata,
} from "@/components/LegalPage";
import { KOMPLEET_PRIVACY_HREF } from "@/lib/products";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Privacy Policy", "/privacy");

const mail = <MailLink address={SITE.email} />;
const supportMail = <MailLink address={SITE.supportEmail} />;

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated 10 Nov 2026</p>

      <h2>1. Who we are</h2>
      <p>
        This Privacy Policy is issued by <strong>Ivano Technologies Ltd</strong>
        , a company registered in Nigeria (<strong>{SITE.rc}</strong>), with
        its registered address and office at {SITE.legalAddress}{" "}
        (&quot;Ivano&quot;, &quot;we&quot;, &quot;us&quot;). We decide how and
        why the personal data described here is used, so we are the{" "}
        <strong>data controller</strong> under the{" "}
        <strong>Nigeria Data Protection Act 2023 (NDPA)</strong>.
      </p>
      <p>This notice covers:</p>
      <ul>
        <li>visitors to {SITE.webDisplay};</li>
        <li>people who contact us; and</li>
        <li>other company dealings through this website.</li>
      </ul>
      <p>
        Personal data processed <strong>inside</strong> Kompleet is governed by
        Kompleet&apos;s own privacy notice at{" "}
        <a
          href={KOMPLEET_PRIVACY_HREF}
          rel="noopener noreferrer"
          target="_blank"
        >
          kompleet.techivano.com/privacy
        </a>
        . This page governs {SITE.webDisplay}. Neither notice prevails over the
        other: each applies to the processing it describes.
      </p>
      <p>
        Our other products (for example Ivano PMS) may also have their own
        privacy notices for data you put inside the product. Where we run a
        system for a client, the client&apos;s own notice usually applies and
        we act as its data processor.
      </p>

      <h2>2. Data protection contact</h2>
      <ul>
        <li>
          <strong>Data Protection Officer / privacy contact:</strong> David
          Inalegwu
        </li>
        <li>
          <strong>Data-protection requests and disputes:</strong> {supportMail},
          subject <strong>&quot;Data request&quot;</strong>
        </li>
        <li>
          <strong>General enquiries:</strong> {mail}
        </li>
        <li>
          <strong>Post:</strong> Ivano Technologies Ltd, {SITE.legalAddress}
        </li>
      </ul>

      <h2>3. What we collect, why, and our lawful basis</h2>
      <div className="legal-table-wrap">
        <table className="legal-table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">
                What
              </th>
              <th scope="col" role="columnheader">
                When
              </th>
              <th scope="col" role="columnheader">
                Why
              </th>
              <th scope="col" role="columnheader">
                Lawful basis (NDPA s. 25)
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell" data-label="What">
                Name, email, subject and message
              </td>
              <td role="cell" data-label="When">
                You use the contact form (it opens your own email app) or email
                us
              </td>
              <td role="cell" data-label="Why">
                To read and reply, and follow up on what you ask about
              </td>
              <td role="cell" data-label="Lawful basis (NDPA s. 25)">
                Legitimate interests (answering enquiries); or steps you ask us
                to take before a contract
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="What">
                Refund and support correspondence
              </td>
              <td role="cell" data-label="When">
                You ask for help or a refund
              </td>
              <td role="cell" data-label="Why">
                To resolve your request and keep a record
              </td>
              <td role="cell" data-label="Lawful basis (NDPA s. 25)">
                Contract; legal obligation; legitimate interests (handling
                disputes)
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="What">
                Technical data (IP address, browser type, page requested, time)
              </td>
              <td role="cell" data-label="When">
                Every visit, in our hosting provider&apos;s server logs
              </td>
              <td role="cell" data-label="Why">
                To keep the site running, secure and free of abuse
              </td>
              <td role="cell" data-label="Lawful basis (NDPA s. 25)">
                Legitimate interests (running a secure website)
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="What">
                Marketing emails (product news)
              </td>
              <td role="cell" data-label="When">
                Only if you opt in
              </td>
              <td role="cell" data-label="Why">
                To send news about our products
              </td>
              <td role="cell" data-label="Lawful basis (NDPA s. 25)">
                Consent. Withdraw any time via the unsubscribe link or by
                emailing us
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>We do not</strong> sell personal data, use it for third-party
        advertising, or make decisions about you based solely on automated
        processing that have legal or similarly significant effects.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>
        This website does not set any cookies and does not use analytics or
        advertising trackers. See our <Link href="/cookies">Cookie Notice</Link>
        .
      </p>

      <h2>5. Who we share data with</h2>
      <p>
        We share personal data only as needed, with service providers who act
        on our instructions under written terms, and with others where the law
        requires:
      </p>
      <div className="legal-table-wrap">
        <table className="legal-table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">
                Recipient
              </th>
              <th scope="col" role="columnheader">
                Role
              </th>
              <th scope="col" role="columnheader">
                Location
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Vercel Inc.
              </td>
              <td role="cell" data-label="Role">
                Hosting this website and its server logs
              </td>
              <td role="cell" data-label="Location">
                United States / global edge
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Zoho Corporation
              </td>
              <td role="cell" data-label="Role">
                Email hosting ({SITE.email} and {SITE.supportEmail})
              </td>
              <td role="cell" data-label="Location">
                United States data centre
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Vercel Inc.
              </td>
              <td role="cell" data-label="Role">
                Hosting the Kompleet web app
              </td>
              <td role="cell" data-label="Location">
                United States
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Convex, Inc.
              </td>
              <td role="cell" data-label="Role">
                Kompleet application database, sign-in and file storage
              </td>
              <td role="cell" data-label="Location">
                United States
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Resend, Inc.
              </td>
              <td role="cell" data-label="Role">
                Sending Kompleet account and transactional emails
              </td>
              <td role="cell" data-label="Location">
                United States
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Functional Software, Inc. (Sentry)
              </td>
              <td role="cell" data-label="Role">
                Error monitoring for Kompleet
              </td>
              <td role="cell" data-label="Location">
                United States
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Professional advisers (lawyers, accountants, auditors)
              </td>
              <td role="cell" data-label="Role">
                Advice, audit, tax
              </td>
              <td role="cell" data-label="Location">
                Nigeria
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Recipient">
                Courts, regulators, tax and law-enforcement authorities
              </td>
              <td role="cell" data-label="Role">
                Where the law requires, or to protect our legal rights
              </td>
              <td role="cell" data-label="Location">
                Nigeria
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Kompleet currently runs on Convex, Vercel, Resend and Sentry, with Zoho
        Mail hosting {SITE.supportEmail}. Data you put inside Kompleet is
        governed by{" "}
        <a
          href={KOMPLEET_PRIVACY_HREF}
          rel="noopener noreferrer"
          target="_blank"
        >
          Kompleet&apos;s privacy notice
        </a>
        . We do not currently send personal data to AI providers. We will
        update this notice, and the relevant product notice, before enabling
        any such processing.
      </p>
      <p>
        If Ivano is involved in a merger, sale or restructuring, data may pass
        to the new owner under the same protections.
      </p>

      <h2>6. Transfers outside Nigeria</h2>
      <p>
        Some providers above store or process data outside Nigeria, including
        in the United States. We transfer personal data only as the NDPA allows
        (ss. 41 to 43) and the GAID, for example where the destination has
        adequate protection, or where appropriate safeguards (such as
        contractual data protection terms) are in place, or with your consent
        after we explain the risks. You can ask us for details of the
        safeguards for any transfer.
      </p>

      <h2>7. How long we keep data</h2>
      <div className="legal-table-wrap">
        <table className="legal-table" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">
                Data
              </th>
              <th scope="col" role="columnheader">
                How long
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell" data-label="Data">
                Enquiry emails
              </td>
              <td role="cell" data-label="How long">
                As long as needed to answer and follow up, then deleted; if the
                enquiry becomes a contract, kept with that contract&apos;s
                records
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Data">
                Accounting, tax and company records
              </td>
              <td role="cell" data-label="How long">
                6 years after the relevant period, to meet Nigerian tax and
                company-records duties
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Data">
                Hosting server logs
              </td>
              <td role="cell" data-label="How long">
                Up to 30 days, under our hosting provider&apos;s limits
              </td>
            </tr>
            <tr role="row">
              <td role="cell" data-label="Data">
                Marketing preferences
              </td>
              <td role="cell" data-label="How long">
                Until you unsubscribe; we keep a suppression record so we
                don&apos;t email you again
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>When the period ends we delete or anonymise the data.</p>

      <h2>8. How we protect data</h2>
      <p>
        We use HTTPS across our sites, access controls and multi-factor
        authentication on our admin accounts, least-privilege access for staff
        and contractors, and reputable providers with their own security
        certifications.
      </p>

      <h2>9. Your rights</h2>
      <p>Under the NDPA (Part VI) you can ask us to:</p>
      <ul>
        <li>
          tell you whether we hold data about you, and give you a copy
          (access);
        </li>
        <li>correct data that is wrong or incomplete;</li>
        <li>delete your data;</li>
        <li>restrict how we use it;</li>
        <li>
          object to our use of it, including for direct marketing (we will
          always stop marketing);
        </li>
        <li>
          not be subject to a decision based solely on automated processing
          that significantly affects you;
        </li>
        <li>
          give you your data in a commonly used, machine-readable format, or
          send it to another provider (portability); and
        </li>
        <li>
          withdraw consent at any time, without affecting earlier processing.
        </li>
      </ul>
      <p>
        <strong>How:</strong> email {supportMail} with the subject{" "}
        <strong>&quot;Data request&quot;</strong>. We may ask you to confirm
        your identity. It is free. We will respond{" "}
        <strong>within 30 days</strong>, and tell you if we need longer and
        why. Some data (for example tax records) may have to be kept by law
        even if you ask us to delete it; we will explain if so.
      </p>

      <h2>10. Complaints</h2>
      <p>
        If you are unhappy with how we handle your data, please email{" "}
        {supportMail} first. You can also send us a{" "}
        <strong>Standard Notice to Address Grievance (SNAG)</strong> using the
        form in Schedule 9 of the GAID, by email to {supportMail} with
        &quot;SNAG&quot; in the subject line or by post to the address in
        section 2.
      </p>
      <p>
        You have the right to complain to the{" "}
        <strong>Nigeria Data Protection Commission (NDPC)</strong>:{" "}
        <a href="https://ndpc.gov.ng" rel="noopener noreferrer" target="_blank">
          https://ndpc.gov.ng
        </a>
        .
      </p>

      <h2>11. Data breaches</h2>
      <p>
        If a personal data breach is likely to put your rights and freedoms at
        risk, we will notify the NDPC within <strong>72 hours</strong> of
        becoming aware of it, and tell you directly and without undue delay
        where the risk to you is high (NDPA s. 40).
      </p>

      <h2>12. Children</h2>
      <p>
        Our website and products are for businesses and adults. We do not
        knowingly collect data from anyone under 18. If you believe a child has
        given us data, email {supportMail} and we will delete it.
      </p>

      <h2>13. Visitors and customers outside Nigeria</h2>
      <p>
        Ivano Technologies Ltd is registered in Nigeria only. If you contact or
        deal with us from elsewhere (including Canada or the United States),
        this policy and the rights above apply, and you can use the same
        contact details. You may also have rights under the law where you live.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update this policy. We will change the date at the top and, for
        significant changes affecting customers, tell you by email.
      </p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.legalAddress} · {mail}
      </p>
    </LegalPage>
  );
}
