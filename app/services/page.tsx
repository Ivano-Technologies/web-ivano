import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Beyond products, Ivano delivers end to end technology services within our registered scope of business.",
  path: "/services",
});

const CLUSTERS = [
  {
    title: "Build",
    copy: "Custom software, cloud platforms, AI and analytics, digital transformation, and R&D pilots.",
  },
  {
    title: "Secure and run",
    copy: "Cybersecurity, managed IT and helpdesk, hardware and networking procurement and install.",
  },
  {
    title: "Advise",
    copy: "Technology consulting, general consultancy and BPO, training and capacity building.",
  },
  {
    title: "Grow",
    copy: "Digital marketing, branding, campaigns, partnerships and IP support.",
  },
  {
    title: "Supply",
    copy: "Contracts, supply, and ongoing technical support.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Products and services"
        lede="Beyond our SaaS family, Ivano delivers end to end technology services within our registered scope of business."
      />
      <section>
        <div className="wrap">
          <div className="card-grid cols-2">
            {CLUSTERS.map((cluster) => (
              <article className="cluster" data-reveal key={cluster.title}>
                <h3>{cluster.title}</h3>
                <p>{cluster.copy}</p>
              </article>
            ))}
          </div>
          <div className="cta-band cta-follow">
            <h2>Discuss a project</h2>
            <p>
              Tell us what you need. We’ll reply from {SITE.email}.
            </p>
            <Link className="btn btn-primary" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
