import Image from "next/image";
import Link from "next/link";
import { FOOTER_EXPLORE, LEGAL_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

/** Footer "How we work": three short values, one line each, no full stops. */
const FOOTER_HOW_WE_WORK = [
  "Craft over theatre",
  "Ship honest product",
  "Your brand leads",
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>How we work</h4>
            <ul className="footer-values">
              {FOOTER_HOW_WE_WORK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <a href={SITE.pdfHref} download={SITE.pdfFilename}>
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
              <li>
                <a
                  className="client-mark-link"
                  href="https://bayek.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bayek"
                >
                  <span className="client-mark" aria-hidden="true">
                    BAYEK
                  </span>
                </a>
              </li>
            </ul>
            <p>Organisations we’ve built for.</p>
          </div>
          <div>
            <h4>Explore</h4>
            {FOOTER_EXPLORE.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
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
