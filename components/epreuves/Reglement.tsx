import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { articleUrl, avantArene, reglement, sanction } from "@/content/epreuves";
import { fr } from "@/lib/typo";

// The rule book, at night in the arena. The document itself first, set as
// type rather than shown as a cover; then what every rider must have settled
// before entering the arena, each point with its article.
export default function Reglement() {
  return (
    <section id="reglement" className="ep-reg" aria-labelledby="reg-title">
      <div className="wrap ep-reg__grid">
        <div className="ep-reg__main">
          <h2 id="reg-title" className="ep-reg__title" data-reveal="title">
            Le règlement officiel
          </h2>
          <p className="ep-reg__intro" data-reveal>
            {fr(
              "Les épreuves du festival suivent le livre des règlements en équitation western de Cheval Québec. Les fiches de cette page le résument : seul le texte officiel fait foi.",
            )}
          </p>

          <div className="ep-doc" data-reveal>
            <span className="ep-doc__section" aria-hidden>
              IV
            </span>
            <div className="ep-doc__body">
              <p className="ep-doc__title">{reglement.titre}</p>
              <p className="ep-doc__by">
                {reglement.editeur}, édition {reglement.edition}
              </p>
              <p className="ep-doc__where">{fr(reglement.section)}</p>
              <p className="ep-doc__file">
                {reglement.pages} · {reglement.format}
              </p>
              <div className="ep-doc__actions">
                <a className="btn" href={articleUrl(213)} target="_blank" rel="noopener noreferrer">
                  Ouvrir le règlement <ArrowUpRight size={18} weight="bold" aria-hidden />
                  <span className="sr-only"> (PDF, nouvel onglet)</span>
                </a>
                <a className="ep-doc__more" href={reglement.ressources} target="_blank" rel="noopener noreferrer">
                  Toutes les publications de Cheval Québec
                  <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="ep-reg__side">
          <h3 className="ep-reg__sub" data-reveal>
            {fr("Avant d'entrer dans l'arène")}
          </h3>
          <dl className="ep-rules">
            {avantArene.map((r, i) => (
              <div key={r.terme} data-reveal style={{ ["--d" as string]: i }}>
                <dt>{r.terme}</dt>
                <dd>
                  {fr(r.texte)}{" "}
                  <a href={articleUrl(r.article.page)} target="_blank" rel="noopener noreferrer">
                    Art. {r.article.num}
                    <span className="sr-only"> du règlement (PDF, nouvel onglet)</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <p className="ep-reg__sanction" data-reveal>
            {fr(sanction)}
          </p>
        </div>
      </div>
    </section>
  );
}
