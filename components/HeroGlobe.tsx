"use client";

import { useEffect, useRef } from "react";

export function HeroGlobe() {
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
      <div className="globe">
        <div className="globe-spin">
          <div className="globe-map" />
          <div className="globe-map" />
        </div>
        <svg className="globe-graticule" viewBox="0 0 100 100">
          <ellipse
            cx="50"
            cy="50"
            rx="18"
            ry="49"
            fill="none"
            stroke="#9AA3AE"
            strokeOpacity="0.22"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="34"
            ry="49"
            fill="none"
            stroke="#9AA3AE"
            strokeOpacity="0.16"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="49"
            fill="none"
            stroke="#9AA3AE"
            strokeOpacity="0.12"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="49"
            ry="16"
            fill="none"
            stroke="#9AA3AE"
            strokeOpacity="0.18"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="49"
            ry="32"
            fill="none"
            stroke="#9AA3AE"
            strokeOpacity="0.12"
          />
          <line
            x1="1"
            y1="50"
            x2="99"
            y2="50"
            stroke="#9AA3AE"
            strokeOpacity="0.22"
          />
          <line
            x1="50"
            y1="1"
            x2="50"
            y2="99"
            stroke="#9AA3AE"
            strokeOpacity="0.16"
          />
        </svg>
        <div className="globe-shade" />
      </div>
    </div>
  );
}
