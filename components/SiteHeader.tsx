"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NavBrand } from "@/components/NavBrand";
import { NAV_LINKS } from "@/lib/site";

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
  const headerRef = useRef<HTMLElement>(null);
  const panelId = useId();

  // Pass 3: past 40px of scroll the name slides behind the IV1 mark; it
  // returns on scroll up. CSS owns the motion (and the instant swap under
  // prefers-reduced-motion). Runs once on mount so a mid page reload is
  // already collapsed.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }
    let ticking = false;
    let collapsed: boolean | null = null;
    let frameId = 0;
    const mountedAt = performance.now();

    function update(): void {
      ticking = false;
      const next = window.scrollY > 40;
      if (!header || next === collapsed) {
        return;
      }
      // The first state, and the browser's scroll restoration right after a
      // reload, snap into place instead of sliding.
      const instant =
        collapsed === null || performance.now() - mountedAt < 500;
      collapsed = next;
      if (instant) {
        header.classList.add("is-instant");
      }
      header.classList.toggle("is-collapsed", next);
      if (instant) {
        void header.offsetWidth;
        window.requestAnimationFrame(() => {
          header.classList.remove("is-instant");
        });
      }
    }

    function onScroll(): void {
      if (!ticking) {
        ticking = true;
        frameId = window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

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
    <header ref={headerRef} className="site-header">
      <div className="wrap nav">
        <NavBrand onClick={close} />
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
