import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import StatementScrub from "@/components/sections/StatementScrub";
import CourseMark from "@/components/CourseMark";
import Film from "@/components/sections/Film";
import { fr } from "@/lib/typo";

// The statement fills word by word as it is read; the emphasised words carry
// the festival's motto.
// The hero already says "compétition, country, famille": the statement keeps
// only the festival's promise, and the three rows below give the proof.
const STATEMENT: { t: string; em?: boolean }[] = [
  { t: "Depuis 2007, Saint-David-de-Falardeau accueille le public et les compétiteurs" },
  { t: "comme des membres de la famille.", em: true },
];

// The three ways into the page, laid over the festival film.
const CHAPTERS = [
  {
    id: "competition",
    title: "Compétition",
    text: "Barils, sauvetage, slalom et relais, sanctionnés par le CBSLC. Le Grand Prix se court le samedi soir.",
    href: "#gymkhana",
  },
  {
    id: "country",
    title: "Country",
    text: "Spectacles, soirées DJ et danse en ligne sous le chapiteau, où se trouve le bar.",
    href: "#programmation",
  },
  {
    id: "famille",
    title: "Famille",
    text: "Zone familiale, spectacle canin, déjeuners au chalet des loisirs et camping sur place.",
    href: "#activites",
  },
];

export default function EnBref() {
  return (
    <section id="contenu" className="bref" aria-labelledby="bref-title">
      <CourseMark label="Départ" className="bref__start" />
      <div className="wrap">
        <h2 id="bref-title" className="sr-only">
          Le festival en bref
        </h2>
        <StatementScrub>
          <p className="bref__statement" data-scrub>
            {STATEMENT.map((part, i) =>
              fr(part.t)
                .split(" ")
                .map((w, j) => (
                  <span key={`${i}-${j}`} className={part.em ? "w em" : "w"}>
                    {w}{" "}
                  </span>
                )),
            )}
          </p>
        </StatementScrub>

        <div className="bref__free" data-reveal>
          <p className="bref__copy">
            {fr(
              "Le gymkhana, ce sont des courses de chevaux contre la montre, autour de barils et de piquets. Pendant quatre jours en août, une centaine de cavaliers s'affrontent dans l'arène, et tout autour : spectacles country, danse en ligne, activités pour les enfants et camping.",
            )}{" "}
            <strong>{fr("L'entrée est gratuite.")}</strong>
          </p>
          {/* Phones: the hero just above already gives the month, the four
              days and the free entry, so the short version keeps only what
              the hero does not say. */}
          <p className="bref__copy bref__copy--short">
            {fr(
              "Le gymkhana, ce sont des courses de chevaux contre la montre, autour de barils et de piquets. Une centaine de cavaliers s'affrontent dans l'arène ; tout autour, spectacles country, danse en ligne, activités pour les enfants et camping.",
            )}
          </p>
          <div className="bref__links">
            <a href="#gymkhana" className="bref__more">
              En savoir plus sur le gymkhana <ArrowRight size={18} weight="bold" aria-hidden />
            </a>
            <a href="#visite" className="bref__more">
              Accès et camping <ArrowRight size={18} weight="bold" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <Film chapters={CHAPTERS.map((c) => ({ ...c, text: fr(c.text) }))} />
    </section>
  );
}
