import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "Ivano Technologies Ltd builds software products and delivers technology services — from SME finance to enterprise operations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Who we are"
        lede="Ivano Technologies Ltd builds software products and delivers technology services — from SME finance to enterprise operations and regulated sector systems."
      />
      <section>
        <div className="wrap about-narrow about-copy">
          <h2>What we build</h2>
          <p className="about-build">
            SaaS products (Kompleet, PMS, NRCS EAM) and client platforms
            (campaigns, compliance dashboards), backed by consulting and
            managed services.
          </p>
          <h2>Where we are</h2>
          <p className="about-where">{SITE.addressFull}.</p>
          <div className="explore-panels">
            <div className="explore-panel warm" data-reveal>
              <h3>{SITE.location}</h3>
              <p>Wuse 2 office · registered Nigerian company.</p>
            </div>
            <div className="explore-panel cool" data-reveal>
              <h3>Products + services</h3>
              <p>
                SaaS family, client platforms, consulting and managed
                services.
              </p>
            </div>
          </div>
          <div className="legal-box">
            <strong>{SITE.legalName}</strong>
            <p>
              {SITE.rc} · {SITE.incorporated}
            </p>
          </div>
          <p className="about-download">
            <a className="btn btn-primary" href={SITE.pdfHref} download>
              Download company profile (PDF)
            </a>
          </p>
          <p className="muted about-pdf-note">
            PDF includes full CAC certificate, services summary, and contact.
          </p>
        </div>
      </section>
    </>
  );
}
