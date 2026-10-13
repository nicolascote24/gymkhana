import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Picture, { type ImageId } from "@/components/Picture";
import StatementScrub from "@/components/sections/StatementScrub";
import { fr } from "@/lib/typo";

// The statement fills word by word as it is read; the emphasised words carry
// the festival's motto.
const STATEMENT: { t: string; em?: boolean }[] = [
  { t: "Depuis 2007, Saint-David-de-Falardeau accueille le public et les compétiteurs" },
  { t: "comme des membres de la famille.", em: true },
  { t: "Quatre jours de gymkhana, de musique country et de plaisirs en famille, au cœur du Saguenay." },
];

const PILLARS: { id: string; title: string; text: string; href: string; img: ImageId; alt: string }[] = [
  {
    id: "competition",
    title: "Compétition",
    text: "Barils, sauvetage, slalom et relais : une compétition officielle de gymkhana, sanctionnée par le CBSLC.",
    href: "#gymkhana",
    img: "baril-gradins",
    alt: "Une cavalière contourne un baril devant les gradins remplis.",
  },
  {
    id: "country",
    title: "Country",
    text: "Spectacles sous le chapiteau, danse en ligne et soirées DJ.",
    href: "#programmation",
    img: "baril-foule",
    alt: "La foule en chapeaux de cowboy dans les gradins du manège.",
  },
  {
    id: "famille",
    title: "Famille",
    text: "Jeux gonflables, spectacle canin, déjeuners communautaires et camping sur place.",
    href: "#activites",
    img: "mascotte",
    alt: "La mascotte du festival, un cheval en costume, pose avec un visiteur.",
  },
];

export default function EnBref() {
  return (
    <section id="contenu" className="bref" aria-labelledby="bref-title">
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
                <span className="pillar__title">{p.title}</span>
                <span className="pillar__text">{fr(p.text)}</span>
                <span className="pillar__arrow" aria-hidden>
                  <ArrowRight size={28} weight="bold" />
                </span>
                <span className="pillar__media" aria-hidden>
                  <Picture id={p.img} alt="" sizes="(max-width: 767px) 92vw, 30vw" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
