import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
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
import { fr } from "@/lib/typo";
import "./epreuves.css";

const TITLE = "Épreuves de gymkhana et inscription";
const DESCRIPTION =
    "Barils, slalom, sauvetage, relais : les dix épreuves du gymkhana de Falardeau, sanctionné par le CBSLC. Règles de Cheval Québec et inscription.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/epreuves-gymkhana/",
  image: {
    url: "/images/og-epreuves.jpg",
    width: 1200,
    height: 630,
    alt: "Épreuve de sauvetage au gymkhana de Falardeau : un cavalier saute en croupe d'un cheval au galop",
  },
});

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
      <JsonLd data={pageGraph({ path: "/epreuves-gymkhana/", title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
