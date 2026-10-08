import Image from "next/image";
import Link from "next/link";
import { FOOTER_EXPLORE, LEGAL_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

/** Pass 3: Explore, Principles and Selected clients moved off Home into compact footer notes (live copy, word for word). */
const FOOTER_PRINCIPLES = [
  {
    name: "Craft over theatre.",
    text: "Designed around how businesses actually operate: clear systems, real constraints.",
  },
  {
    name: "Ship honest product.",
    text: "Clear tools and real systems, built for daily use.",
  },
  {
    name: "Your brand comes first.",
    text: "Work we deliver carries only a small Ivano credit.",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>Explore</h4>
            {FOOTER_EXPLORE.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <a href={SITE.pdfHref} download>
              {SITE.pdfLabel}
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.webHref}>{SITE.webDisplay}</a>
          </div>
          <div>
            <h4>Connect</h4>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                {link.label}
              </a>
            ))}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            <Link href="/contact">{SITE.officeLine}</Link>
          </div>
        </div>
        <div className="footer-notes">
          <div className="footer-note">
            <h4>Principles</h4>
            <ul>
              {FOOTER_PRINCIPLES.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-note">
            <h4>How we work</h4>
            <p>
              Your brand leads.
              <br />
              Ours stays quiet on the work we deliver.
            </p>
          </div>
          <div className="footer-note">
            <h4>Selected clients</h4>
            <ul className="footer-clients">
              <li>
                <Image
                  src="/clients/juo-mark-mono-white.png"
                  alt="John Upan Odey Campaign"
                  width={31}
                  height={22}
                />
              </li>
              <li>
                {/* No logo asset yet: acronym mark sized like the logos. */}
                <span
                  className="client-mark"
                  role="img"
                  aria-label="Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA)"
                >
                  <span aria-hidden="true">NMDPRA</span>
                </span>
              </li>
            </ul>
            <p>Organisations we’ve built for.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{SITE.copyright}</span>
          <nav className="footer-legal" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
