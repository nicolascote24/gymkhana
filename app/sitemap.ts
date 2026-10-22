import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// The files that hold each page's own content (not the menu and footer every
// page shares), so its date moves only when the page itself changes.
const SOURCES: Record<string, string[]> = {
  "/": ["app/page.tsx", "components/sections", "content/programmation.ts", "content/festival.ts", "content/partenaires.ts"],
  "/epreuves-gymkhana/": ["app/epreuves-gymkhana", "components/epreuves", "content/epreuves.ts"],
  "/activite-festival/": ["app/activite-festival", "content/activites.ts", "content/festival.ts"],
  "/confidentialite/": ["app/confidentialite"],
};

const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

// Google reads lastmod only when it is consistently right: the date of the
// last commit touching the page's files, or today when they hold changes not
// yet committed (they ship with this build). No date rather than a wrong one.
function lastModified(path: string): Date | undefined {
  const files = SOURCES[path];
  if (!files) return undefined;
  try {
    if (git("status", "--porcelain", "--", ...files)) return new Date();
    const date = git("log", "-1", "--format=%cI", "--", ...files);
    return date ? new Date(date) : undefined;
  } catch {
    return undefined;
  }
}

// Only the pages of the site plan: home, activities, gymkhana events, privacy.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: lastModified(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
