import type { MetadataRoute } from "next";
import { festival } from "@/content/festival";

export const dynamic = "force-static";

// Web app manifest: the name and icon a phone shows when the site is added to
// the home screen. Colours follow the night of the theme (globals.css).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: festival.name,
    short_name: "Gymkhana Falardeau",
    description: "Festival de gymkhana gratuit, chaque août à Saint-David-de-Falardeau, au Saguenay–Lac-Saint-Jean.",
    lang: "fr-CA",
    start_url: "/",
    display: "browser",
    background_color: "#141619",
    theme_color: "#141619",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/images/logo.png", sizes: "384x384", type: "image/png" },
    ],
  };
}
