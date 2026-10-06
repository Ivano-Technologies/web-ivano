import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Partnerships, product enquiries and project briefs. We read every message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Ivano"
        lede="Partnerships, product enquiries and project briefs. We read every message."
      />
      <section>
        <div className="wrap">
          <div className="contact-grid">
            <ContactForm />
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
                    <a className="contact-plain" href={SITE.phoneHref}>
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Social</dt>
                  <dd className="social-list">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.href}
                        className="contact-plain"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          link.name === "X" ? "X / Twitter" : link.name
                        }
                      >
                        {link.label}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>Web</dt>
                  <dd>{SITE.webDisplay}</dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>{SITE.addressFull}</dd>
                </div>
              </dl>
              <p className="contact-pdf">
                <a href={SITE.pdfHref} download>
                  Download company profile (PDF) →
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
