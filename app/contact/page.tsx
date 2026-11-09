import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { PHONES, SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Product questions, customer support, billing and refunds, partnerships and project briefs. We read every message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Ivano"
        lede="Product questions, customer support, billing and refunds, partnerships and project briefs. We read every message."
      />
      <section>
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <p className="contact-form-hint">
                For refunds, email{" "}
                <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>{" "}
                with the subject &quot;Refund request&quot; and include your
                Paystack transaction reference.
              </p>
              <ContactForm />
            </div>
            <aside className="contact-aside">
              <h3>Direct</h3>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {PHONES.map((phone, index) => (
                      <span key={phone.href}>
                        {index > 0 ? " · " : null}
                        <a className="contact-plain" href={phone.href}>
                          {phone.display}
                        </a>
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>{SITE.contactOffice}</dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>
                    Monday to Friday, 9:00 to 17:00 WAT (West Africa Time),
                    except Nigerian public holidays
                  </dd>
                </div>
                <div>
                  <dt>Response time</dt>
                  <dd>We reply within 1 to 2 working days</dd>
                </div>
              </dl>
              <p className="contact-pdf">
                <a href={SITE.pdfHref} download={SITE.pdfFilename}>
                  Download company profile (PDF) →
                </a>
              </p>
            </aside>
          </div>
          <div className="contact-follow">
            <div>
              <h3>Customers</h3>
              <ul>
                <li>
                  <strong>Billing, receipts and refunds:</strong> email{" "}
                  <a href={`mailto:${SITE.supportEmail}`}>
                    {SITE.supportEmail}
                  </a>{" "}
                  with your Paystack transaction reference. See our{" "}
                  <Link href="/refunds">Refund Policy</Link>.
                </li>
                <li>
                  <strong>Complaints and disputes:</strong> email{" "}
                  <a href={`mailto:${SITE.disputesEmail}`}>
                    {SITE.disputesEmail}
                  </a>
                  , ideally before contacting your bank; most issues are fixed
                  quickly.
                </li>
                <li>
                  <strong>Privacy and data requests:</strong> email{" "}
                  <a href={`mailto:${SITE.supportEmail}`}>
                    {SITE.supportEmail}
                  </a>{" "}
                  with the subject &quot;Data request&quot;. See our{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </li>
              </ul>
            </div>
            <div>
              <h3>Company</h3>
              <p>
                Ivano Technologies Ltd · {SITE.rc} · Registered in Nigeria
              </p>
              <p className="contact-legal-links">
                <Link href="/terms">Terms of Service</Link>
                {" · "}
                <Link href="/refunds">Refund Policy</Link>
                {" · "}
                <Link href="/privacy">Privacy Policy</Link>
                {" · "}
                <Link href="/cookies">Cookie Notice</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
