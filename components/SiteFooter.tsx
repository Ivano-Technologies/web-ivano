import Link from "next/link";
import { FOOTER_EXPLORE, LEGAL_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" href="/">
              {SITE.name}
            </Link>
            <p>{SITE.tagline}</p>
            <Link className="footer-cta-link" href="/contact">
              Talk to us
            </Link>
          </div>
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
                aria-label={link.name === "X" ? "X / Twitter" : link.name}
              >
                {link.label}
              </a>
            ))}
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            <Link href="/contact">{SITE.officeLine}</Link>
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
          <span>{SITE.addressShort}</span>
        </div>
      </div>
    </footer>
  );
}
