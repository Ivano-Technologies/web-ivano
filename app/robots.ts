import type { MetadataRoute } from "next";
import { canonicalUrl, isPreviewDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const sitemap = canonicalUrl("/sitemap.xml");

  if (isPreviewDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap,
  };
}
