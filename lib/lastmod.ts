import { execFileSync } from "node:child_process";
import type { Page } from "@/components/Nav";

// When each page last changed, for the sitemap only: Google uses lastmod to
// decide what to recrawl and never shows it. Pages carry no date of their own
// (see pageGraph), so the search result shows none either.

// The files that hold each page's own content (not the menu and footer every
// page shares), so its date moves only when the page itself changes.
const SOURCES: Record<string, string[]> = {
  "/": ["app/page.tsx", "components/sections", "content/programmation.ts", "content/festival.ts", "content/partenaires.ts", "content/faq.ts"],
  "/epreuves-gymkhana/": ["app/epreuves-gymkhana", "components/epreuves", "content/epreuves.ts"],
  "/activite-festival/": ["app/activite-festival", "content/activites.ts", "content/festival.ts"],
  "/confidentialite/": ["app/confidentialite"],
};

export const pagePath: Record<Page, string> = {
  accueil: "/",
  epreuves: "/epreuves-gymkhana/",
  activites: "/activite-festival/",
  confidentialite: "/confidentialite/",
};

const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

// Google reads lastmod only when it is consistently right: the date of the
// last commit touching the page's files, or today when they hold changes not
// yet committed (they ship with this build). No date rather than a wrong one.
export function lastModified(path: string): Date | undefined {
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
