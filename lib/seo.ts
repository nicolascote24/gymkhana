import type { Metadata } from "next";
import { festival } from "@/content/festival";

// One shape of metadata for every page: its own title, description, canonical
// and Open Graph card. Titles follow the layout's template ("… | Gymkhana de
// Falardeau") unless `absolute` is set (the home page carries the brand first).
type PageSeo = {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

const DEFAULT_IMAGE = {
  url: "/images/og-festival-gymkhana.jpg",
  width: 1200,
  height: 630,
  alt: "Cavalière en plein virage autour d'un baril, au Festival Gymkhana de Falardeau",
};

export function pageMetadata(p: PageSeo): Metadata {
  const image = p.image ?? DEFAULT_IMAGE;
  return {
    title: p.absolute ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: p.type ?? "website",
      locale: "fr_CA",
      siteName: festival.shortName,
      url: p.path,
      title: p.title,
      description: p.description,
      images: [image],
      ...(p.type === "article" ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [image.url] },
    ...(p.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
