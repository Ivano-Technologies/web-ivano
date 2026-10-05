"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function markReduced(): void {
  document.querySelectorAll("[data-reveal]").forEach((node) => {
    node.classList.add("is-revealed");
  });
  document
    .querySelectorAll(".section-head h2, .cta-band h2, .about-copy > h2")
    .forEach((node) => {
      node.classList.add("is-inview");
    });
}

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      markReduced();
      return;
    }

    document.documentElement.classList.add("motion-on");

    const reveal = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => {
            el.classList.add("is-revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(
          parent.querySelectorAll<HTMLElement>(":scope > [data-reveal]"),
        );
        const index = siblings.indexOf(el);
        if (index > 0) {
          el.dataset.revealDelay = String(index * 75);
        }
      }
      reveal.observe(el);
    });

    const heads = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(".section-head h2, .cta-band h2, .about-copy > h2")
      .forEach((node) => heads.observe(node));

    return () => {
      reveal.disconnect();
      heads.disconnect();
      document.documentElement.classList.remove("motion-on");
    };
  }, [pathname]);

  return null;
}
