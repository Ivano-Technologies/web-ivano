import type { Metadata } from "next";
import { canonicalUrl, CANONICAL_ORIGIN } from "./seo";
import { SITE } from "./site";

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = canonicalUrl(path);
  const isHome = title === SITE.name;
  const displayTitle = isHome ? SITE.name : `${title} · ${SITE.name}`;

  return {
    metadataBase: new URL(CANONICAL_ORIGIN),
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
