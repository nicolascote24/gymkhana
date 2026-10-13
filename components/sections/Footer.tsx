import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { festival, mapsUrl } from "@/content/festival";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";
import CourseMark from "@/components/CourseMark";
import Tumbleweed from "@/components/Tumbleweed";

export default function Footer() {
  const a = festival.address;
  const c = festival.contact;
  return (
    <footer className="foot on-night" aria-labelledby="foot-title">
      <div className="wrap">
        <div className="foot__close">
          <p id="foot-title" className="foot__slogan" data-reveal="title">
            {fr(festival.slogans.main)}
          </p>
          <div className="foot__follow" data-reveal>
            <p>{fr("Les dates et la programmation 2027 seront annoncées sur notre page Facebook.")}</p>
            <a className="btn" href={c.facebook} target="_blank" rel="noopener noreferrer">
              Suivre sur Facebook <ArrowUpRight size={18} weight="bold" aria-hidden />
            </a>
          </div>
        </div>

        <div className="foot__cols">
          <div>
            <p className="foot__label">Le site</p>
            <p>
              {a.venue}
              <br />
              {a.street}
              <br />
              {keepPlaces(a.city)} ({a.province}) {a.postalCode}
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
                <a href="#equipe" className="foot__link">
                  L&apos;équipe
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

      <div className="wrap foot__end">
        <CourseMark label="Arrivée" />
      </div>

      <div className="foot__mark" aria-hidden>
        <span className="foot__mark-small">Festival</span>
        <span className="foot__mark-word">GYMKHANA</span>
        <span className="foot__mark-small">de Saint-David-de-Falardeau</span>
      </div>

      <Tumbleweed seed={29} className="tumble--foot" />
      <div className="wrap foot__legal">
        <p>
          © {new Date().getFullYear()} {keepPlaces(festival.name)}
        </p>
        <p>Depuis {festival.founded}</p>
      </div>
    </footer>
  );
}
