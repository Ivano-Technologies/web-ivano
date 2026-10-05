"use client";

import { useEffect, useRef } from "react";
import {
  drawOrthographicGlobe,
  GLOBE_CENTER_LAT,
  GLOBE_CENTER_LON,
  globePeriodMs,
} from "@/lib/orthographicGlobe";

type HeroGlobeProps = {
  markup: string;
};

export function HeroGlobe({ markup }: HeroGlobeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(true);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const periodMs = globePeriodMs();
    let elapsed = 0;
    let last = performance.now();
    let frameId = 0;

    function syncPause(): void {
      const node = rootRef.current;
      if (!node) {
        return;
      }
      const offscreen = node.dataset.visible !== "true";
      const paused = media.matches || document.hidden || offscreen;
      const wasPaused = pausedRef.current;
      pausedRef.current = paused;
      node.classList.toggle("is-paused", paused);
      node.classList.toggle("is-static-art", media.matches);
      if (paused) {
        stopLoop();
        if (!media.matches) {
          paint(currentLon());
        }
      } else if (wasPaused) {
        last = performance.now();
        startLoop();
      }
    }

    function currentLon(): number {
      if (media.matches) {
        return GLOBE_CENTER_LON;
      }
      return GLOBE_CENTER_LON + (360 * (elapsed % periodMs)) / periodMs;
    }

    function paint(centerLon: number): void {
      const node = canvasRef.current;
      const host = rootRef.current;
      if (!node || !host) {
        return;
      }
      const cssSize = host.clientWidth;
      if (cssSize < 8) {
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelSize = Math.round(cssSize * dpr);
      if (node.width !== pixelSize || node.height !== pixelSize) {
        node.width = pixelSize;
        node.height = pixelSize;
      }
      const ctx = node.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawOrthographicGlobe(ctx, cssSize, centerLon, GLOBE_CENTER_LAT);
    }

    function tick(now: number): void {
      const dt = now - last;
      last = now;
      if (!pausedRef.current && !media.matches) {
        elapsed += dt;
      }
      paint(currentLon());
      if (pausedRef.current || media.matches) {
        frameId = 0;
        return;
      }
      frameId = window.requestAnimationFrame(tick);
    }

    function startLoop(): void {
      if (frameId !== 0 || pausedRef.current || media.matches) {
        return;
      }
      frameId = window.requestAnimationFrame(tick);
    }

    function stopLoop(): void {
      if (frameId === 0) {
        return;
      }
      window.cancelAnimationFrame(frameId);
      frameId = 0;
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

    const resize = new ResizeObserver(() => {
      if (!media.matches) {
        paint(currentLon());
      }
    });
    resize.observe(root);

    document.addEventListener("visibilitychange", syncPause);
    media.addEventListener("change", syncPause);

    if (!media.matches) {
      paint(currentLon());
      startLoop();
    }

    return () => {
      stopLoop();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", syncPause);
      media.removeEventListener("change", syncPause);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-globe" aria-hidden="true">
      <div className="globe-atmosphere" />
      <div className="globe-sphere">
        <div
          className="globe-svg-art"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
        <canvas ref={canvasRef} className="globe-spin-canvas" />
        <div className="globe-shade" />
      </div>
    </div>
  );
}
