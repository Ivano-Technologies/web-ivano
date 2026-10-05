import type { MetadataRoute } from "next";
import { canonicalUrl, MARKETING_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKETING_PATHS.map((path) => ({
    url: canonicalUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
