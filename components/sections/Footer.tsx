import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { festival, mapsUrl } from "@/content/festival";
import { fr } from "@/lib/typo";

export default function Footer() {
  const a = festival.address;
  const c = festival.contact;
  return (
    <footer className="foot on-night" aria-labelledby="foot-title">
      <div className="wrap">
        <p id="foot-title" className="foot__slogan" data-reveal="title">
          {fr(festival.slogans.main)}
        </p>

        <div className="foot__cols">
          <div>
            <p className="foot__label">Le site</p>
            <p>
              {a.venue}
              <br />
              {a.street}
              <br />
              {a.city} ({a.province}) {a.postalCode}
            </p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="foot__link">
              Itinéraire
            </a>
          </div>
          <div>
            <p className="foot__label">Nous joindre</p>
            <p>
              {c.info.label}
              <br />
              <a href={c.info.href} className="foot__link">
                {c.info.phone}
              </a>
            </p>
            <p>
              {c.kiosks.label}
              <br />
              <a href={c.kiosks.href} className="foot__link">
                {c.kiosks.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${c.email}`} className="foot__link">
                {c.email}
              </a>
            </p>
          </div>
          <div>
            <p className="foot__label">Suivre</p>
            <a href={c.facebook} target="_blank" rel="noopener noreferrer" className="foot__social">
              <FacebookLogo size={22} weight="fill" aria-hidden /> Facebook
            </a>
            <p className="foot__note">{fr("La programmation 2027 y sera annoncée en premier.")}</p>
          </div>
          <nav aria-label="Pied de page">
            <p className="foot__label">Sur cette page</p>
            <ul>
              <li>
                <a href="#programmation" className="foot__link">
                  Programmation
                </a>
              </li>
              <li>
                <a href="#gymkhana" className="foot__link">
                  Le gymkhana
                </a>
              </li>
              <li>
                <a href="#activites" className="foot__link">
                  Activités
                </a>
              </li>
              <li>
                <a href="#visite" className="foot__link">
                  Planifier ma visite
                </a>
              </li>
              <li>
                <a href="#partenaires" className="foot__link">
                  Partenaires
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="foot__mark" aria-hidden>
        <span className="foot__mark-small">Festival</span>
        <span className="foot__mark-word">GYMKHANA</span>
        <span className="foot__mark-small">de Saint-David-de-Falardeau</span>
      </div>

      <div className="wrap foot__legal">
        <p>
          © {new Date().getFullYear()} {festival.name}
        </p>
        <p>Depuis {festival.founded}</p>
      </div>
    </footer>
  );
}
