import { ArrowUpRight, Wine, Dog, Horse, Phone, EnvelopeSimple, Tent } from "@phosphor-icons/react/dist/ssr";
import { festival, mapsUrl } from "@/content/festival";
import { fr } from "@/lib/typo";

const RULE_ICONS = { alcool: Wine, chiens: Dog, securite: Horse } as const;

export default function Visite() {
  const a = festival.address;
  const c = festival.contact;
  return (
    <section id="visite" className="visit" aria-labelledby="visit-title">
      <div className="wrap">
        <h2 id="visit-title" className="visit__title" data-reveal="title">
          Planifier ma visite
        </h2>

        <div className="visit__grid">
          <div className="visit__where" data-reveal>
            <p className="visit__venue">{a.venue}</p>
            <p className="visit__street">{a.street}</p>
            <p className="visit__city">
              {a.city} ({a.province}) {a.postalCode}
            </p>
            <div className="visit__route" aria-label={fr(a.access)}>
              <span>Chicoutimi</span>
              <span className="visit__route-line" aria-hidden>
                <span>20 min</span>
              </span>
              <span>Falardeau</span>
            </div>
            <a className="btn" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Itinéraire <ArrowUpRight size={18} weight="bold" aria-hidden />
            </a>
          </div>

          <aside
            className="visit__camp on-night"
            data-reveal
            style={{ ["--d" as string]: 1 }}
            aria-labelledby="camp-title"
          >
            <Tent size={34} weight="light" aria-hidden />
            <h3 id="camp-title" className="visit__camp-title">
              Camping sur place
            </h3>
            <p className="visit__camp-price">
              <span className="tabular">{festival.camping.price}</span>
              <span>{festival.camping.period}</span>
            </p>
            <p className="visit__camp-terms">{fr(festival.camping.terms)}</p>
            <p className="visit__camp-phone">
              Information : <a href={c.info.href}>{c.info.phone}</a>
            </p>
            <p className="visit__camp-note">Tarif des éditions 2024 et 2025.</p>
          </aside>
        </div>

        <div className="visit__rules" data-reveal>
          <h3 className="visit__rules-title">Sur le site</h3>
          <ul>
            {festival.rules.map((r) => {
              const Icon = RULE_ICONS[r.id as keyof typeof RULE_ICONS];
              return (
                <li key={r.id}>
                  <Icon size={28} weight="light" aria-hidden />
                  <span>{fr(r.text)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="visit__contacts" data-reveal>
          <li>
            <Phone size={20} weight="regular" aria-hidden />
            <span>{c.info.label}</span>
            <a href={c.info.href}>{c.info.phone}</a>
          </li>
          <li>
            <Phone size={20} weight="regular" aria-hidden />
            <span>{c.kiosks.label}</span>
            <a href={c.kiosks.href}>{c.kiosks.phone}</a>
          </li>
          <li>
            <EnvelopeSimple size={20} weight="regular" aria-hidden />
            <span>Courriel</span>
            <a href={`mailto:${c.email}`}>{c.email}</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
