// Next.js rules (Core Web Vitals), React hooks, accessibility (jsx-a11y) and
// TypeScript. Run: npm run lint
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Images are built ahead of time into AVIF/WebP sets (scripts/build-images.mjs)
      // and served by <picture>: next/image cannot optimise a static export.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**", "next-env.d.ts", "photo_clients/**", "references/**"]),
]);
