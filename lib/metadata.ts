import type { Metadata } from "next";
import { SITE } from "./site";

function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const origin = siteOrigin();
  const url = `${origin}${path}`;
  const isHome = title === SITE.name;
  const displayTitle = isHome ? SITE.name : `${title} · ${SITE.name}`;

  return {
    title: isHome ? { absolute: SITE.name } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
    },
  };
}
