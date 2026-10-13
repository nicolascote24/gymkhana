import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Picture from "@/components/Picture";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";

const COMITE = [
  { role: "Présidente", name: "Ann-Frédérick Lavoie" },
  { role: "Trésorière", name: "Andréanne Lessard" },
  { role: "Secrétaire", name: "Juliette Tremblay" },
  { role: "Directeurs", name: "Serge Lavoie, Éric Tremblay, Pierre Rousseau, Nicolas Dionne" },
];

export default function Equipe() {
  return (
    <section id="equipe" className="team" aria-labelledby="team-title">
      <div className="wrap team__grid">
        <figure className="team__photo" data-reveal="image">
          <Picture
            id="equipe"
            alt="Le comité organisateur et des bénévoles en chemises et chapeaux western, réunis sous les arbres."
            sizes="(max-width: 1023px) 92vw, 56vw"
          />
        </figure>

        <div className="team__text">
          <h2 id="team-title" className="team__title" data-reveal="title">
            Comme la famille
          </h2>
          <blockquote className="team__quote" data-reveal>
            <p>
              {fr(
                "« Comme quoi il n'y a pas que les chevaux qui trottent pendant une randonnée, les idées du cavalier aussi ! »",
              )}
            </p>
            <footer>{festival.founder}, fondatrice du festival</footer>
          </blockquote>
          <p className="team__story" data-reveal>
            {keepPlaces(
              fr(
                `Le festival est né en ${festival.founded} de la passion de sa fondatrice, rejointe par deux amies. Aujourd'hui, un comité et une soixantaine de bénévoles le font vivre chaque été, avec l'appui de la municipalité et des organismes de Saint-David-de-Falardeau.`,
              ),
            )}
          </p>
          <dl className="team__comite" data-reveal>
            {COMITE.map((m) => (
              <div key={m.role}>
                <dt>{m.role}</dt>
                <dd>{m.name}</dd>
              </div>
            ))}
          </dl>
          <a className="btn btn--ghost team__cta" href={`mailto:${festival.contact.email}?subject=B%C3%A9n%C3%A9volat`}>
            Devenir bénévole <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
