import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { grandGalop, medias, partenaires } from "@/content/partenaires";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";
import PartnerWall from "@/components/sections/PartnerWall";

// Logo files are not available yet: partners are set as typographic marks.
export default function Partenaires() {
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
          <p className="part__tier-name">Au grand galop</p>
          <ul className="part__major">
            {grandGalop.map((p) => (
              <li key={p}>
                <span>{keepPlaces(p)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="part__tier part__tier--media" data-reveal>
          <p className="part__tier-name">Médias</p>
          <ul className="part__media">
            {medias.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <PartnerWall names={partenaires} />

      <div className="wrap part__cta" data-reveal>
        <p>{fr("Votre entreprise veut appuyer le festival ?")}</p>
        <a className="btn" href={`mailto:${festival.contact.email}?subject=Partenariat`}>
          Devenir partenaire <ArrowRight size={18} weight="bold" aria-hidden />
        </a>
      </div>
    </section>
  );
}
