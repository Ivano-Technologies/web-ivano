import Link from "next/link";
import {
  LegalPage,
  LegalUpdated,
  MailLink,
  legalMetadata,
} from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Refund Policy", "/refunds");

const mail = <MailLink address={SITE.email} />;
const supportMail = <MailLink address={SITE.supportEmail} />;

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy">
      <LegalUpdated />

      <p>
        This policy explains when and how you can get your money back for
        purchases from <strong>Ivano Technologies Ltd</strong> ({SITE.rc},
        Nigeria). It forms part of our{" "}
        <Link href="/terms">Terms of Service</Link>. Nothing in it limits your
        rights
        under the Federal Competition and Consumer Protection Act 2018 or other
        Nigerian law.
      </p>

      <h2>1. What this policy covers</h2>
      <p>
        This policy covers products bought on {SITE.webDisplay} or our product
        sites and paid for through Paystack. Today that is the{" "}
        <strong>
          Kompleet Founding Lifetime licence (VAT inclusive, one-off payment,
          priced as shown at checkout)
        </strong>
        . Work we do for clients under a separate written agreement follows the
        refund terms in that agreement.
      </p>

      <h2>2. Change your mind: 14-day refund</h2>
      <p>
        If you are not happy with Kompleet for any reason, email us within{" "}
        <strong>14 days</strong> of your payment date and we will refund the{" "}
        <strong>full amount you paid</strong>. You do not need to give a
        reason.
      </p>
      <p>
        After a refund, your Kompleet lifetime licence ends and your seat in
        the 100-seat offer is released. Before we close your access we will
        give you at least 7 days to export your data.
      </p>

      <h2>3. When we always refund, at any time</h2>
      <p>Whatever the date of purchase, we will refund you in full if:</p>
      <ul>
        <li>
          you were charged more than once for the same purchase (duplicate
          charge);
        </li>
        <li>
          your account was debited but the payment failed or the purchase did
          not complete;
        </li>
        <li>
          you were charged a different amount from the price shown at checkout;
        </li>
        <li>
          we cannot provide the access you paid for, for example because we
          cannot activate your account within 7 days of payment; or
        </li>
        <li>the law requires a refund.</li>
      </ul>
      <p>
        If we discontinue Kompleet, the{" "}
        <Link href="/terms">Terms of Service</Link> (section 5.2) explain
        what happens (at least 90 days&apos; notice and a data export).
      </p>

      <h2 id="section-4">4. Payments received after the 100th seat is sold</h2>
      <p>
        The Kompleet Founding Lifetime offer is limited to 100 licences, one
        per named user account.{" "}
        <strong>
          Any payment we receive after the 100th seat has been sold is refunded
          in full
        </strong>
        , including VAT, with the Paystack processing fee absorbed by Ivano.
        You don&apos;t need to ask: we tell you by email within{" "}
        <strong>2 working days</strong> and process the refund within{" "}
        <strong>5 working days</strong>. Paystack then usually returns the
        money within 3 to 10 working days, depending on your bank. No licence
        is issued for that payment.
      </p>

      <h2>5. When we do not refund</h2>
      <ul>
        <li>
          Requests made after the 14-day period, unless section 3 applies.
        </li>
        <li>
          Where we end your access because you seriously breached our Terms of
          Service (for example fraud or abuse).
        </li>
        <li>
          Licences obtained through fraud or unauthorised payments; these are
          handled with Paystack and the bank as a fraud case.
        </li>
      </ul>

      <h2>6. How to ask for a refund</h2>
      <p>
        Email {supportMail} with the subject{" "}
        <strong>&quot;Refund request&quot;</strong> and include:
      </p>
      <ul>
        <li>the name and email address used for the purchase;</li>
        <li>the Paystack transaction reference or receipt; and</li>
        <li>for section 3 cases, a short description of the problem.</li>
      </ul>
      <p>We will confirm receipt within 2 working days.</p>

      <h2>7. How and when you get your money</h2>
      <ul>
        <li>
          We approve or explain a refusal within <strong>5 working days</strong>{" "}
          of receiving your request.
        </li>
        <li>
          Approved refunds go back to the <strong>original payment method</strong>{" "}
          through Paystack. We cannot refund to a different card or account.
        </li>
        <li>
          Once we process the refund, Paystack states that customers usually
          receive it within <strong>3 to 10 working days</strong>, depending
          on your bank (Paystack support article 2127106). We will email you
          when we have processed it.
        </li>
        <li>
          You receive the <strong>full amount you paid</strong>, including VAT.
          We do not deduct payment processing fees; Ivano bears those costs.
        </li>
      </ul>

      <h2>8. Please talk to us before your bank</h2>
      <p>
        If something is wrong, or for any payment disputes, email {supportMail}.
        Most problems can be fixed quickly. If you open a dispute or chargeback
        with your bank, we will still work with you, but the process is slower
        for everyone.
      </p>

      <h2>9. Questions</h2>
      <p>
        {mail} · Ivano Technologies Ltd · {SITE.rc} · {SITE.legalAddress}
      </p>
    </LegalPage>
  );
}
