"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("nav-open");
      return;
    }

    const sheet = sheetRef.current;
    if (!sheet) {
      return;
    }

    document.body.classList.add("nav-open");

    const sheetFocusables = Array.from(
      sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    const focusables = [toggleRef.current, ...sheetFocusables].filter(
      (node): node is HTMLElement => node !== null,
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    sheetFocusables[0]?.focus();

    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open, close]);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link
          className="nav-brand"
          href="/"
          onClick={close}
          aria-label={SITE.name}
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={32}
            height={32}
            unoptimized
            priority
          />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(pathname, link.href) ? "active" : undefined}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact">
            Contact
          </Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <button
        type="button"
        className={`nav-backdrop${open ? " is-open" : ""}`}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Close menu"
        onClick={close}
      />
      <div
        ref={sheetRef}
        id={panelId}
        className={`nav-sheet${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-hidden={!open}
        aria-label="Menu"
        inert={!open ? true : undefined}
      >
        <nav className="nav-sheet-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(pathname, link.href) ? "active" : undefined}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta nav-sheet-cta" href="/contact" onClick={close}>
          Contact
        </Link>
      </div>
    </header>
  );
}
