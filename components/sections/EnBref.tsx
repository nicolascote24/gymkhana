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

// A triptych like a rodeo poster: three tall photographs, edge to edge, one
// per side of the festival. None of them appears anywhere else on the page.
// `focus` / `zoom` frame the part of the picture that tells the panel's story.
const PANELS: {
  id: string;
  title: string;
  text: string;
  href: string;
  img: ImageId;
  alt: string;
  focus?: string;
  zoom?: number;
}[] = [
  {
    id: "competition",
    title: "Compétition",
    text: "Barils, sauvetage, slalom et relais, sanctionnés par le CBSLC. Le Grand Prix se court le samedi soir.",
    href: "#gymkhana",
    img: "baril-gradins",
    alt: "Une cavalière contourne un baril devant les gradins remplis.",
    focus: "38% 50%",
  },
  {
    id: "country",
    title: "Country",
    text: "Spectacles, soirées DJ et danse en ligne sous le chapiteau, où se trouve le bar.",
    href: "#programmation",
    img: "baril-foule",
    alt: "La foule en chapeaux de cowboy dans les gradins du manège.",
    focus: "88% 30%",
    zoom: 1.12,
  },
  {
    id: "famille",
    title: "Famille",
    text: "Zone familiale, spectacle canin, déjeuners au chalet des loisirs et camping sur place.",
    href: "#activites",
    img: "jeune-cavaliere",
    alt: "Une jeune cavalière casquée galope dans l'arène.",
    focus: "50% 40%",
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
          <p>
            {fr(
              "Le gymkhana, ce sont des courses de chevaux contre la montre, autour de barils et de piquets. Pendant quatre jours en août, une centaine de cavaliers s'affrontent dans l'arène, et tout autour : spectacles country, danse en ligne, activités pour les enfants et camping.",
            )}{" "}
            <strong>{fr("L'entrée est gratuite.")}</strong>
          </p>
          <a href="#gymkhana" className="bref__more">
            En savoir plus sur le gymkhana <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
      </div>

      <ul className="tryp">
        {PANELS.map((p, i) => (
          <li key={p.id} className="tryp__panel" data-reveal style={{ ["--d" as string]: i }}>
            <a href={p.href} className="tryp__link">
              <span className="tryp__media">
                {/* The panel is about two-thirds as wide as tall, so the photo's
                    width is driven by the panel height: 72vh x 3:2, x zoom. */}
                <Picture
                  id={p.img}
                  alt={p.alt}
                  sizes={`${Math.round(108 * (p.zoom ?? 1))}vh`}
                  style={
                    {
                      objectPosition: p.focus,
                      transformOrigin: p.focus,
                      "--zoom": p.zoom ?? 1,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span className="tryp__body">
                <span className="tryp__title">
                  {p.title}
                  <ArrowRight className="tryp__arrow" size={24} weight="bold" aria-hidden />
                </span>
                <span className="tryp__text">{fr(p.text)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
