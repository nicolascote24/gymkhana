import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Picture from "@/components/Picture";
import { programme } from "@/content/programmation";
import { fr } from "@/lib/typo";

// The evening highlight, the one full-frame photograph of the page. The time
// comes from the 2024 programme and is labelled as such; the 2025 line-up
// from the former site (references/brief.md, section 6).
export default function GrandPrix() {
  return (
    <section id="grand-prix" className="ep-gp" aria-labelledby="gp-title">
      <div className="ep-gp__photo" data-reveal="image">
        <Picture
          id="sauvetage"
          alt="Grand Prix sauvetage : le cavalier se jette sur la croupe du cheval de son coéquipier dans un nuage de sable."
          sizes="100vw"
        />
      </div>
      <div className="wrap ep-gp__grid">
        <div className="ep-gp__copy">
          <h2 id="gp-title" className="ep-gp__title" data-reveal="title">
            Le Grand Prix
          </h2>
          <p className="ep-gp__when" data-reveal>
            {fr("Barils et sauvetage, le samedi à 19 h")}
          </p>
          <p className="ep-gp__tag" data-reveal>
            <span>Aperçu</span>
            {programme.edition}
          </p>
          <p className="ep-gp__text" data-reveal>
            {fr(
              "Le moment fort de la fin de semaine, au manège, le samedi soir. En 2025, il réunissait le Grand Prix baril 3D et 4D et le Grand Prix sauvetage.",
            )}
          </p>
          <a href="/#jour-samedi" className="btn btn--ghost ep-gp__cta" data-reveal>
            Le samedi au programme <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
