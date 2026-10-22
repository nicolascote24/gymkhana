import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { festival } from "@/content/festival";
import { siteUrl } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import RevealRoot from "@/components/RevealRoot";
import Consent from "@/components/Consent";
import "./globals.css";
import "./sections.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Site-wide defaults. Each page sets its own title, description, canonical and
// Open Graph card through pageMetadata() (lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Page names come first; the brand closes the title, kept short so titles
  // stay near 60 characters.
  title: { default: festival.shortName, template: "%s | Gymkhana de Falardeau" },
  applicationName: festival.shortName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#141619",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Marks that scripts run, before the first paint: scroll reveals only
            hide content when something will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SmoothScroll />
        {children}
        <RevealRoot />
        <Consent />
      </body>
    </html>
  );
}
