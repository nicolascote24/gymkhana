import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Course from "@/components/Course";
import Picture from "@/components/Picture";
import MobileFold from "@/components/MobileFold";
import { epreuves, articleUrl, familles, type Epreuve } from "@/content/epreuves";
import { fr } from "@/lib/typo";

type Fam = (typeof familles)[number];

// One family of events: a photograph opens it, then the sheets. On wide
// screens the family's index stays beside the sheets and marks the one on
// screen.
export default function Famille({ f }: { f: Fam }) {
  const list = epreuves.filter((e) => e.famille === f.famille);
  return (
    <section id={f.id} className={`ep-fam ep-fam--${f.famille}`} aria-labelledby={`${f.id}-title`}>
      <div className="ep-fam__opener">
        <div className="ep-fam__photo" data-reveal="image">
          <Picture id={f.photo.id} alt={f.photo.alt} sizes="100vw" />
        </div>
        <div className="wrap ep-fam__head">
          <h2 id={`${f.id}-title`} className="ep-fam__title" data-reveal="title">
            {f.nom}
          </h2>
        </div>
      </div>

      <div className="wrap ep-fam__grid">
        <aside className="ep-fam__side">
          <p className="ep-fam__intro" data-reveal>
            {fr(f.intro)}
          </p>
          <nav className="ep-fam__index" data-fam-index aria-label={f.court}>
            <ol>
              {list.map((e) => (
                <li key={e.id}>
                  <a href={`#${e.id}`}>{e.nom}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="ep-fam__list">
          {list.map((e) => (
            <Fiche key={e.id} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Fiche({ e }: { e: Epreuve }) {
  return (
    <article id={e.id} className="ep-fiche" data-run aria-labelledby={`${e.id}-nom`}>
      <div className="ep-fiche__course" data-reveal="course">
        <Course e={e} />
      </div>
      <div className="ep-fiche__body">
        <h3 id={`${e.id}-nom`} className="ep-fiche__title" data-reveal>
          {e.nom}
        </h3>
        {(e.equipe || e.article) && (
          <p className="ep-fiche__meta" data-reveal>
            {e.equipe && <span>{e.equipe}</span>}
            {e.article && (
              <a href={articleUrl(e.article.page)} target="_blank" rel="noopener noreferrer">
                Article {e.article.num} du règlement
                <ArrowUpRight size={14} weight="bold" aria-hidden />
                <span className="sr-only"> (PDF de Cheval Québec, nouvel onglet)</span>
              </a>
            )}
          </p>
        )}
        <p className="ep-fiche__desc" data-reveal>
          {fr(e.description)}
        </p>
        {/* On phones the rules fold behind one button, so the ten sheets stay a
            quick read; everywhere else they are open. */}
        {(e.points.length > 0 || e.disqualif.length > 0) && (
          <MobileFold label="Les règles de l'épreuve" className="ep-fiche__fold">
            {e.points.length > 0 && (
              <ul className="ep-fiche__points">
                {e.points.map((p) => (
                  <li key={p}>{fr(p)}</li>
                ))}
              </ul>
            )}
            {e.disqualif.length > 0 && (
              <details className="ep-fiche__dq">
                <summary>Ce qui disqualifie</summary>
                <ul>
                  {e.disqualif.map((d) => (
                    <li key={d}>{fr(d)}</li>
                  ))}
                </ul>
              </details>
            )}
          </MobileFold>
        )}
        {e.note && (
          <p className="ep-fiche__note" data-reveal>
            {fr(e.note)}
          </p>
        )}
      </div>
    </article>
  );
}
