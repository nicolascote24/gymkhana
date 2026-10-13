import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { grandGalop, medias, partenaires } from "@/content/partenaires";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";

// Logo files are not available yet: partners are set as typographic marks.
export default function Partenaires() {
  const loop = [...partenaires, ...partenaires];
  return (
    <section id="partenaires" className="part" aria-labelledby="part-title">
      <div className="wrap">
        <div className="part__head">
          <h2 id="part-title" className="part__title" data-reveal="title">
            Partenaires
          </h2>
          <p className="part__intro" data-reveal>
            {fr("Un festival gratuit, rendu possible par plus de 70 partenaires de la région. Merci !")}
          </p>
        </div>

        <div className="part__tier" data-reveal>
          <h3 className="part__tier-name">Au grand galop</h3>
          <ul className="part__major">
            {grandGalop.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="part__tier part__tier--media" data-reveal>
          <h3 className="part__tier-name">Médias</h3>
          <ul className="part__media">
            {medias.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="part__marquee" aria-label="Autres partenaires">
        <ul className="part__track">
          {loop.map((p, i) => (
            <li key={`${p}-${i}`} aria-hidden={i >= partenaires.length}>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap part__cta" data-reveal>
        <p>{fr("Votre entreprise veut appuyer le festival ?")}</p>
        <a className="btn" href={`mailto:${festival.contact.email}?subject=Partenariat`}>
          Devenir partenaire <ArrowRight size={18} weight="bold" aria-hidden />
        </a>
      </div>
    </section>
  );
}
