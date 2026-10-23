import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";
import { lastModified } from "@/lib/lastmod";

export const dynamic = "force-static";

// Only the pages of the site plan: home, activities, gymkhana events, privacy.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: lastModified(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
