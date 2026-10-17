import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO_TAGLINE, SITE } from "@/lib/site";

import { OG_SIZE } from "./constants";

export { OG_ALT, OG_CONTENT_TYPE, OG_SIZE } from "./constants";

/* Brand tokens from app/globals.css (dark default). */
const BG = "#141B26";
const BG_DEEP = "#0F141C";
const BODY = "#9AA3AE";
const ACCENT = "#E0442E";
const BORDER = "#2A3342";

/**
 * Renders the share card: navy background, the locked nav lockup (IV mark plus
 * wordmark, same paths as components/NavBrand.tsx) and the home hero tagline
 * verbatim. Built at build time, so assets are read from the repo.
 */
export async function renderBrandImage(): Promise<ImageResponse> {
  const dir = join(process.cwd(), "lib/og");
  const [lockup, montserrat] = await Promise.all([
    readFile(join(dir, "lockup.svg")),
    readFile(join(dir, "Montserrat-400.ttf")),
  ]);
  const lockupSrc = `data:image/svg+xml;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: BG,
          backgroundImage: `linear-gradient(135deg, ${BG} 0%, ${BG} 55%, ${BG_DEEP} 100%)`,
          borderTop: `10px solid ${ACCENT}`,
          fontFamily: "Montserrat",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupSrc} width={876} height={120} alt="" />
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            marginTop: 44,
            backgroundColor: ACCENT,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 44,
            lineHeight: 1.35,
            color: BODY,
            maxWidth: 900,
          }}
        >
          {HERO_TAGLINE}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 96,
            right: 96,
            bottom: 56,
            paddingTop: 22,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 26,
            color: BODY,
          }}
        >
          {SITE.webDisplay}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Montserrat", data: montserrat, weight: 400, style: "normal" }],
    },
  );
}
