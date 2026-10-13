import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { festival } from "@/content/festival";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://festivalgymkhanafalardeau.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${festival.name} | Saguenay`,
  description:
    "Quatre jours de compétition équestre, de musique country et de plaisirs en famille à Saint-David-de-Falardeau, au Saguenay. Entrée gratuite. Programmation, camping et infos pratiques.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: festival.name,
    title: festival.name,
    description: "Compétition de gymkhana, spectacles country et activités familiales. Entrée gratuite.",
    images: [{ url: "/images/og-festival-gymkhana.jpg", width: 1200, height: 630, alt: "Cavalière en plein virage autour d'un baril" }],
  },
  icons: { icon: "/images/logo-96.webp" },
};

export const viewport: Viewport = {
  themeColor: "#141619",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: festival.name,
  alternateName: festival.shortName,
  foundingDate: String(festival.founded),
  email: festival.contact.email,
  telephone: "+1-418-540-5700",
  sameAs: [festival.contact.facebook],
  location: {
    "@type": "Place",
    name: festival.address.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: festival.address.street,
      addressLocality: festival.address.city,
      addressRegion: "QC",
      postalCode: festival.address.postalCode,
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: festival.address.lat, longitude: festival.address.lng },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Hide the hero's animated parts until the entrance runs; never longer than 2.5 s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('hero-pending');setTimeout(function(){d.classList.remove('hero-pending')},2500)})()",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
