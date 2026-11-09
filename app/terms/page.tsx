import Link from "next/link";
import {
  LegalPage,
  LegalUpdated,
  MailLink,
  legalMetadata,
} from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = legalMetadata("Terms of Service", "/terms");

const mail = <MailLink address={SITE.email} />;

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <LegalUpdated />

      <h2>1. Who we are</h2>
      <p>
        This website ({SITE.webDisplay}) and the products sold through it are
        provided by <strong>Ivano Technologies Ltd</strong>, a private company
        limited by shares registered in Nigeria with the Corporate Affairs
        Commission under <strong>{SITE.rc}</strong> (&quot;Ivano&quot;,
        &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). Our registered
        address and office is {SITE.legalAddress}.
      </p>
      <p>Contact: {mail}.</p>
      <p>
        Ivano Technologies Ltd is registered in Nigeria only. We work with
        customers and partners in other countries, including Canada and the
        United States, but we are not registered as a company in those
        countries.
      </p>
      <p>
        By using this website, or by buying or using any of our products, you
        agree to these Terms of Service (&quot;Terms&quot;), our{" "}
        <strong>Refund Policy</strong> (<Link href="/refunds">/refunds</Link>),
        our <strong>Privacy Policy</strong> (
        <Link href="/privacy">/privacy</Link>) and our{" "}
        <strong>Cookie Notice</strong> (<Link href="/cookies">/cookies</Link>).
        If you do not agree, please do not use the website or buy our products.
      </p>

      <h2>2. Website content</h2>
      <p>
        General information on this website about who we are, what we build and
        the services we offer is provided for information only. It is not
        professional advice. Services we provide to clients (such as software
        development or consulting) are governed by a separate written
        agreement.
      </p>
      <p>
        <strong>
          Buying a product listed with a price on this website is different
        </strong>
        : when you complete a payment, a contract is formed between you and
        Ivano Technologies Ltd on these Terms and our Refund Policy (see
        section 4).
      </p>

      <h2>3. Products and prices</h2>
      <p>
        3.1 Our products and current prices are listed on our{" "}
        <strong>Products and pricing</strong> page (
        <Link href="/products">/products</Link>). The price you pay is the
        price shown at checkout at the time you pay.
      </p>
      <p>
        3.2 All prices are in <strong>Nigerian Naira (₦)</strong> and are{" "}
        <strong>VAT inclusive</strong>. The price shown is the total you pay;
        no tax is added at checkout.
      </p>
      <p>
        3.3 Products shown as &quot;Coming soon&quot; or &quot;Contact us&quot;
        are not yet for sale online and have no published price. Nothing on
        this website is an offer to sell those products.
      </p>
      <p>
        3.4 We may change prices or offers for future purchases. A price change
        never affects a purchase you have already paid for.
      </p>

      <h2>4. Buying from us</h2>
      <p>
        4.1 <strong>Order.</strong> You place an order by choosing a product,
        entering the details requested and completing payment.
      </p>
      <p>
        4.2 <strong>Payment.</strong> Payments are processed by{" "}
        <strong>Paystack Payments Limited</strong> (&quot;Paystack&quot;), a
        payment processor licensed by the Central Bank of Nigeria. You may pay
        by any method Paystack offers at checkout (for example card, bank
        transfer or USSD). Paystack&apos;s own terms and privacy policy apply
        to the payment step.
      </p>
      <p>
        4.3 <strong>We do not store your card details.</strong> Card and bank
        details are entered into Paystack&apos;s secure checkout and are
        handled by Paystack. Ivano does not receive or store your full card
        number, CVV or PIN.
      </p>
      <p>
        4.4 <strong>Contract and receipt.</strong> The contract is formed when
        your payment is confirmed. We will send a confirmation and receipt to
        the email address you gave us. Please keep it; you may need the
        transaction reference if you contact us.
      </p>
      <p>
        4.5 <strong>Statement descriptor.</strong> The charge will appear on
        your bank or card statement as <strong>IVANO TECHNOLOGIES</strong>.
      </p>
      <p>
        4.6 <strong>Failed or duplicate payments.</strong> If you are charged
        twice, or charged for a payment that failed, contact us with the
        transaction reference and we will refund the duplicate or failed charge
        in full.
      </p>
      <p>
        4.7 <strong>Who can buy.</strong> You must be at least 18 and able to
        enter a binding contract. If you buy for a business, you confirm you
        are authorised to bind that business.
      </p>

      <h2>5. Your Kompleet licence (Founding Lifetime offer)</h2>
      <p>
        5.1 <strong>What you get.</strong> Kompleet&apos;s Founding Lifetime
        offer is limited to <strong>100 licences (seats)</strong>. Each licence
        costs a one-off payment of <strong>₦5,000 (VAT inclusive)</strong> and
        gives lifetime access to Kompleet for{" "}
        <strong>one named user account</strong>. A licence is personal to that
        user: it cannot be shared between people or used to give access to
        additional users, and each additional user needs their own licence. The
        licence covers Kompleet&apos;s core bookkeeping and invoicing features
        as offered at the time (including invoicing, bank statement imports,
        expense tracking and financial reports), and any improvements we make
        to those core features. Future paid add-ons or separately priced
        products are not included.
      </p>
      <p>
        5.2 <strong>What &quot;lifetime&quot; means.</strong>{" "}
        &quot;Lifetime&quot; means for as long as we offer Kompleet as a
        product, not the lifetime of a person or business. There are no monthly
        or annual charges for the scope in 5.1. If we ever decide to
        discontinue Kompleet, we will give you at least{" "}
        <strong>90 days&apos; notice</strong> by email and a way to export your
        data before access ends.
      </p>
      <p>
        5.3 <strong>Licence.</strong> We grant you a personal, non-exclusive,
        non-transferable licence to use Kompleet for your own business purposes
        under these Terms and Kompleet&apos;s in-product terms. You may not
        resell, sublicense, transfer or share the licence; it is for the one
        named user in 5.1.
      </p>
      <p>
        5.4 <strong>Limited offer (100 seats).</strong> The ₦5,000 price
        applies only to the first 100 licences sold. Once the 100th seat has
        been sold, the offer closes and the website will be updated.{" "}
        <strong>
          Any payment we receive after the 100th seat has been sold will be
          refunded in full
        </strong>
        , with the Paystack processing fee absorbed by Ivano, within the
        timings in our Refund Policy (we tell you within 2 working days and
        process the refund within 5 working days). No licence is issued for
        that payment.
      </p>
      <p>
        5.5 <strong>Delivery.</strong> Kompleet is a digital service. Access is
        provided online, normally by email invitation or account activation
        immediately after confirmed payment. We only sell the Founding Lifetime
        licence once Kompleet is live, so you can start using it straight away.
      </p>
      <p>
        5.6 <strong>Your data in Kompleet.</strong> You own the business data
        you put into Kompleet. How we handle personal data is explained in our
        Privacy Policy and Kompleet&apos;s own privacy notice.
      </p>

      <h2>6. Refunds and cancellations</h2>
      <p>
        Our <strong>Refund Policy</strong> (
        <Link href="/refunds">/refunds</Link>) forms part of these Terms. In
        short: you can ask for a full refund within <strong>14 days</strong> of
        purchase, and we always refund duplicate charges, failed-but-debited
        payments and cases where we cannot deliver what you paid for. Nothing
        in these Terms or the Refund Policy limits your rights under the
        Federal Competition and Consumer Protection Act 2018 or other Nigerian
        law. Refunds are always for the full amount you paid; we do not deduct
        payment processing fees.
      </p>

      <h2>7. Accounts and acceptable use</h2>
      <p>
        7.1 Keep your login details secure and tell us promptly if you think
        someone has used your account without permission.
      </p>
      <p>
        7.2 Do not misuse the website or our products. In particular, do not:
        try to break, overload or gain unauthorised access to them; scrape them
        at scale; reverse engineer them except where the law allows; use them
        to send spam or to store or share unlawful content; or use them for
        fraud or money laundering.
      </p>
      <p>
        7.3 We may suspend or end access for serious or repeated breaches of
        these Terms. If we end a paid licence because of your breach, no refund
        is due; if we end it for any other reason, see section 5.2 and the
        Refund Policy.
      </p>

      <h2>8. Our name and content</h2>
      <p>
        The Ivano and Kompleet names and logos, the {SITE.socialHandle} handle
        and the content of this website belong to Ivano Technologies Ltd. You
        may share links and short quotes with credit. You may not copy, reuse
        or present our content or marks as your own without written permission.
      </p>

      <h2>9. Third-party sites and services</h2>
      <p>
        Our website links to our product sites, client systems and other
        websites, and we use third-party providers such as Paystack. Each has
        its own terms and privacy notice. We are not responsible for websites
        or services we do not control.
      </p>

      <h2>10. No guarantee</h2>
      <p>
        We work to keep the website and our products accurate, secure and
        available, but we do not promise they will always be available, error
        free or up to date. Planned maintenance or events outside our control
        may cause interruptions.
      </p>

      <h2>11. Limits on our liability</h2>
      <p>
        11.1 Nothing in these Terms limits or excludes liability that cannot be
        limited or excluded under Nigerian law, including liability for fraud,
        for death or personal injury caused by negligence, or your statutory
        rights as a consumer.
      </p>
      <p>
        11.2 Subject to 11.1, we are not liable for any indirect or
        consequential loss, or for loss of profit, revenue, data or business.
      </p>
      <p>
        11.3 Subject to 11.1, our total liability to you for any claim relating
        to a product is limited to the amount you paid us for that product in
        the 12 months before the claim.
      </p>

      <h2>12. Privacy</h2>
      <p>
        How we handle personal data, including payment-related data, is
        explained in our Privacy Policy (<Link href="/privacy">/privacy</Link>)
        and Cookie Notice (<Link href="/cookies">/cookies</Link>).
      </p>

      <h2>13. Changes to these Terms</h2>
      <p>
        We may update these Terms. The date at the top shows when they last
        changed. Changes apply from that date and do not affect purchases
        already made, except where the law requires otherwise.
      </p>

      <h2>14. Complaints and disputes</h2>
      <p>
        14.1 If you have a problem, please email {mail} first. We aim to
        acknowledge within 2 working days and to resolve within 14 days.
      </p>
      <p>
        14.2 If we cannot resolve it within 30 days, either of us may refer the
        dispute to the courts of the Federal Capital Territory, Abuja.
      </p>
      <p>
        14.3 You may also contact the Federal Competition and Consumer
        Protection Commission (FCCPC) about consumer issues.
      </p>

      <h2>15. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Federal Republic of
        Nigeria.
      </p>

      <h2>16. General</h2>
      <p>
        If any part of these Terms is found to be invalid, the rest still
        applies. If we do not enforce a right straight away, we may still
        enforce it later. You may not transfer your rights under these Terms
        without our written consent.
      </p>

      <p className="legal-sign">
        Ivano Technologies Ltd · {SITE.rc} · {SITE.legalAddress} · {mail}
      </p>
    </LegalPage>
  );
}
