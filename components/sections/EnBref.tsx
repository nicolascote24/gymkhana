import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Picture, { type ImageId } from "@/components/Picture";
import StatementScrub from "@/components/sections/StatementScrub";
import CourseMark from "@/components/CourseMark";
import { fr } from "@/lib/typo";

// The statement fills word by word as it is read; the emphasised words carry
// the festival's motto.
// The hero already says "compétition, country, famille": the statement keeps
// only the festival's promise, and the three rows below give the proof.
const STATEMENT: { t: string; em?: boolean }[] = [
  { t: "Depuis 2007, Saint-David-de-Falardeau accueille le public et les compétiteurs" },
  { t: "comme des membres de la famille.", em: true },
];

// One photograph per row, none repeated elsewhere on the page. `focus` and
// `zoom` frame the part of the photo that tells the row's story (the crowd in
// hats for Country, the trailers and lawn chairs for Famille).
const PILLARS: {
  id: string;
  title: string;
  text: string;
  href: string;
  img: ImageId;
  focus?: string;
  zoom?: number;
}[] = [
  {
    id: "competition",
    title: "Compétition",
    text: "Barils, sauvetage, slalom et relais, sanctionnés par le CBSLC. Le Grand Prix se court le samedi soir.",
    href: "#gymkhana",
    img: "baril-gradins",
  },
  {
    id: "country",
    title: "Country",
    text: "Spectacles, soirées DJ et danse en ligne sous le chapiteau, où se trouve le bar.",
    href: "#programmation",
    img: "baril-foule",
    focus: "100% 0%",
    zoom: 2.4,
  },
  {
    id: "famille",
    title: "Famille",
    text: "Zone familiale, spectacle canin, déjeuners au chalet des loisirs et camping sur place.",
    href: "#activites",
    img: "baril-roulottes",
    focus: "0% 55%",
    zoom: 2.2,
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
          <span className="bref__free-big">Entrée gratuite</span>
          <span className="bref__free-text">
            {fr("Compétitions, spectacles et activités : tout le site est accessible sans billet.")}
          </span>
        </div>

        <ul className="pillars">
          {PILLARS.map((p, i) => (
            <li key={p.id} className="pillar" data-reveal style={{ ["--d" as string]: i }}>
              <a href={p.href} className="pillar__link">
                <span className="pillar__title">
                  {p.title}
                  <ArrowRight className="pillar__arrow" size={28} weight="bold" aria-hidden />
                </span>
                <span className="pillar__text">{fr(p.text)}</span>
                <span className="pillar__media" aria-hidden>
                  <Picture
                    id={p.img}
                    alt=""
                    sizes={`(max-width: 1023px) ${Math.round(92 * (p.zoom ?? 1))}vw, ${Math.round(15 * (p.zoom ?? 1))}vw`}
                    style={p.zoom ? ({ "--zoom": p.zoom, transformOrigin: p.focus } as React.CSSProperties) : undefined}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
