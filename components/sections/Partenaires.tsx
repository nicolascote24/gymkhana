import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { grandGalop } from "@/content/partenaires";
import { festival } from "@/content/festival";
import { fr } from "@/lib/typo";
import images from "@/content/images.json";
import Picture from "@/components/Picture";
// Partenaires majeurs et appel aux nouveaux partenaires

// Major partners by their logo; every other partner as a typographic mark.
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

        <div className="part__tier part__tier--logos">
          <p className="part__tier-name" data-reveal>
            Au grand galop
          </p>
          {/* The arena's sponsor boards: each logo at the same optical
              weight, sized from its trimmed shape (--k = sqrt of its ratio). */}
          <ul className="part__logos">
            {grandGalop.map((p, i) => {
              const img = images[p.logo];
              const k = Math.sqrt(img.width / img.height) * (p.optic ?? 1);
              const logo = (
                <Picture id={p.logo} alt={p.name} sizes="240px" className="part__logo" />
              );
              return (
                <li
                  key={p.name}
                  className={p.night ? "part__plate on-night" : "part__plate"}
                  style={{ ["--k" as string]: k.toFixed(3), ["--i" as string]: i }}
                  data-reveal
                >
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {logo}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  ) : (
                    logo
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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
