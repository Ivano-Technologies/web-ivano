"use client";

import { useEffect, useRef } from "react";

type HeroGlobeProps = {
  markup: string;
};

export function HeroGlobe({ markup }: HeroGlobeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncPause(): void {
      const node = rootRef.current;
      if (!node) {
        return;
      }
      const offscreen = node.dataset.visible !== "true";
      const paused = media.matches || document.hidden || offscreen;
      node.classList.toggle("is-paused", paused);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        root.dataset.visible = entry.isIntersecting ? "true" : "false";
        syncPause();
      },
      { threshold: 0.15 },
    );
    observer.observe(root);
    root.dataset.visible = "true";
    syncPause();

    document.addEventListener("visibilitychange", syncPause);
    media.addEventListener("change", syncPause);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPause);
      media.removeEventListener("change", syncPause);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-globe" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div
        className="globe-sphere"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>
  );
}
