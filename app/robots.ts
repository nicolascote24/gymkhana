import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Everything is public. AI crawlers and AI search crawlers are welcome by
// choice (SEO-STRATEGY.md, section 7): a free festival gains from being cited
// when someone asks what to do in the Saguenay in August. They are named so
// the choice reads in the file, not only by default.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    // No Host line: a Yandex extension that Google and Bing ignore.
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
