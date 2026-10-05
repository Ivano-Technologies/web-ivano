"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="logo" href="/">
          Ivano
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.hideSm ? "hide-sm" : ""}${
                isActive(pathname, link.href) ? " active" : ""
              }`.trim()}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
