import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import Course from "@/components/Course";
import { epreuves, familles } from "@/content/epreuves";
import { fr } from "@/lib/typo";

// Sand, the competition by day. The title and the way into the page on the
// left; on the right, the "feuille de parcours": the ten courses as they are
// posted at the arena gate, each one a link to its sheet. The tour games sit
// on a night band, the evening the page turns to further down.
const WAYS = [
  { href: "#jeux-de-centre", label: "Les dix épreuves" },
  { href: "#reglement", label: "Le règlement officiel" },
  { href: "#inscription", label: "S'inscrire" },
];

export default function EpHero() {
  return (
    <section className="ep-hero" data-hero aria-labelledby="ep-title">
      <div className="wrap ep-hero__grid">
        <div className="ep-hero__text">
          <h1 id="ep-title" className="ep-hero__title" data-enter="title">
            <span className="ep-hero__kicker">Les épreuves de</span> <span className="ep-hero__word">gymkhana</span>
          </h1>
          <p className="ep-hero__lead" data-enter style={{ ["--d" as string]: 1 }}>
            {fr(
              "Dix épreuves chronométrées, courues selon le règlement de Cheval Québec et sanctionnées par le CBSLC. Voici en quoi consiste chacune, les règles à connaître et comment s'inscrire.",
            )}
          </p>
          <nav aria-label="Sur cette page" className="ep-hero__ways" data-enter style={{ ["--d" as string]: 2 }}>
            <ul>
              {WAYS.map((w) => (
                <li key={w.href}>
                  <a href={w.href}>
                    {fr(w.label)}
                    <ArrowDown size={18} weight="bold" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav className="ep-plate" aria-label="Les dix épreuves">
          {familles.map((f, fi) => (
            <div key={f.id} className={`ep-plate__row ep-plate__row--${f.famille}`}>
              <p className="ep-plate__name">{f.court}</p>
              <ul className="ep-plate__list">
                {epreuves
                  .filter((e) => e.famille === f.famille)
                  .map((e, i) => (
                    <li key={e.id}>
                      <a
                        href={`#${e.id}`}
                        className="ep-plate__item"
                        data-run
                        data-reveal="course"
                        style={{ ["--d" as string]: fi * 5 + i }}
                      >
                        <Course e={e} />
                        <span>{e.nom}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
