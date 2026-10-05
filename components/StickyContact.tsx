"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function StickyContactBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") {
      return;
    }

    const hero = document.querySelector(".hero, .page-hero");
    const footer = document.querySelector(".site-footer");
    if (!hero || !footer) {
      return;
    }

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    const footerObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        setFooterInView(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    heroObs.observe(hero);
    footerObs.observe(footer);
    return () => {
      heroObs.disconnect();
      footerObs.disconnect();
    };
  }, [pathname]);

  const visible =
    pathname !== "/contact" && pastHero && !footerInView && !dismissed;

  return (
    <div
      className={`sticky-contact${visible ? " is-on" : ""}`}
      hidden={!visible}
    >
      <Link className="sticky-contact-cta" href="/contact">
        Contact
      </Link>
      <button
        type="button"
        className="sticky-contact-dismiss"
        aria-label="Dismiss contact bar"
        onClick={() => setDismissed(true)}
      >
        Close
      </button>
    </div>
  );
}

export function StickyContact() {
  const pathname = usePathname();
  return <StickyContactBar key={pathname} />;
}
