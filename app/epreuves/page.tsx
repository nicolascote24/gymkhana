import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickBar from "@/components/QuickBar";
import CourseRun from "@/components/CourseRun";
import EpHero from "@/components/epreuves/EpHero";
import Famille from "@/components/epreuves/Famille";
import GrandPrix from "@/components/epreuves/GrandPrix";
import Reglement from "@/components/epreuves/Reglement";
import Participer from "@/components/epreuves/Participer";
import EpreuvesMotion from "@/components/epreuves/EpreuvesMotion";
import { familles, jugement, articleUrl } from "@/content/epreuves";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";
import "./epreuves.css";

const title = "Épreuves de gymkhana, règlement et inscription";
const description =
  "Les dix épreuves de gymkhana du festival : barils, slalom, sauvetage, relais, poney express et plus. Règlement officiel de Cheval Québec, exigences et inscription par courriel.";

export const metadata: Metadata = {
  title: `${title} | ${festival.shortName}`,
  description,
  alternates: { canonical: "/epreuves/" },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: festival.name,
    url: "/epreuves/",
    title,
    description,
    images: [
      {
        url: "/images/og-festival-gymkhana.jpg",
        width: 1200,
        height: 630,
        alt: "Cavalière en plein virage autour d'un baril",
      },
    ],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://festivalgymkhanafalardeau.ca";
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Épreuves", item: `${siteUrl}/epreuves/` },
  ],
};

// Phones: the four chapters stay one tap away under the menu bar.
const CHAPTERS = [
  { href: "#jeux-de-centre", label: "Centre" },
  { href: "#jeux-de-tour", label: "Tour" },
  { href: "#reglement", label: "Règlement" },
  { href: "#inscription", label: "Inscription" },
];

export default function Epreuves() {
  const [centre, tour] = familles;
  return (
    <>
      <Nav page="epreuves" />
      <main id="contenu" className="ep">
        <EpHero />

        <nav className="ep-chap" data-chap aria-label="Chapitres">
          {CHAPTERS.map((c) => (
            <a key={c.href} href={c.href}>
              {c.label}
            </a>
          ))}
        </nav>

        <section className="ep-judge" aria-labelledby="judge-title">
          <div className="wrap ep-judge__grid">
            <h2 id="judge-title" className="ep-judge__title" data-reveal="title">
              Comment ça se juge
            </h2>
            <dl className="ep-judge__list">
              {jugement.map((j, i) => (
                <div key={j.terme} data-reveal style={{ ["--d" as string]: i }}>
                  <dt>{fr(j.terme)}</dt>
                  <dd>
                    {fr(j.texte)}{" "}
                    <a href={articleUrl(j.article.page)} target="_blank" rel="noopener noreferrer">
                      Art. {j.article.num}
                      <span className="sr-only"> du règlement (PDF, nouvel onglet)</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Famille f={centre} />

        <div className="ep-soir" data-soir>
          <div className="ep-soir__night" data-soir-night aria-hidden />
          <Famille f={tour} />
          <GrandPrix />
          <Reglement />
        </div>

        <Participer />
      </main>
      <Footer page="epreuves" />
      <QuickBar page="epreuves" />
      <CourseRun selector="[data-run]" />
      <EpreuvesMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
