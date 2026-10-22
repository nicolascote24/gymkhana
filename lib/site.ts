// The public address of the site, for canonical links, the sitemap and
// robots.txt. The production domain is festivalfalardeau.ca; a staging build
// may override it with NEXT_PUBLIC_SITE_URL.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://festivalfalardeau.ca").replace(/\/$/, "");

// Structured data for a <script type="application/ld+json">, with "<" escaped
// so no string in it can ever close the script tag (Next.js guidance).
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

// Every indexable page, as decided with the client (site-plan.md): the
// sitemap is built from this list only.
export type Route = { path: string; changeFrequency: "monthly" | "yearly"; priority: number };

export const routes: Route[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/epreuves-gymkhana/", changeFrequency: "yearly", priority: 0.8 },
  { path: "/activite-festival/", changeFrequency: "yearly", priority: 0.8 },
  { path: "/confidentialite/", changeFrequency: "yearly", priority: 0.2 },
];
