import {
  ArrowUpRight,
  Balloon,
  Car,
  Chair,
  Coffee,
  Dog,
  EnvelopeSimple,
  Horse,
  MicrophoneStage,
  Phone,
  Plus,
  Tent,
  Wine,
} from "@phosphor-icons/react/dist/ssr";
import { festival, mapsUrl } from "@/content/festival";
import { faq } from "@/content/faq";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";
import RouteMap from "@/components/sections/RouteMap";
import Tumbleweed from "@/components/Tumbleweed";
import MobileFold from "@/components/MobileFold";

const RULE_ICONS = { alcool: Wine, chiens: Dog, securite: Horse } as const;
const AMENITY_ICONS = {
  gradins: Chair,
  chapiteau: MicrophoneStage,
  chalet: Coffee,
  famille: Balloon,
  stationnement: Car,
} as const;

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
          <RouteMap access={fr(a.access)} />

          <div className="visit__side">
            <div className="visit__where" data-reveal>
              <p className="visit__venue">{a.venue}</p>
              <p className="visit__street">{a.street}</p>
              <p className="visit__city">
                {keepPlaces(a.city)} ({a.province}) <span className="place">{a.postalCode}</span>
              </p>
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
              <h3 id="camp-title" className="visit__camp-title">
                <Tent size={30} weight="light" aria-hidden />
                Camping sur place
              </h3>
              {/* The ticket carries the whole offer: no reservation, what
                  campers must not miss, is its loudest line; the stub below
                  the perforation holds the rule and the price. */}
              <div className="visit__ticket">
                <p className="visit__ticket-main">
                  <strong>{festival.camping.ticket}</strong>
                </p>
                <div className="visit__ticket-stub">
                  <p className="visit__ticket-rule">{fr(festival.camping.stub)}</p>
                  <p className="visit__ticket-price">
                    <span className="tabular">{festival.camping.price}</span>
                    <span>{festival.camping.period}</span>
                  </p>
                </div>
              </div>
              <p className="visit__camp-terms">
                {fr(festival.camping.terms)} Pour information seulement :{" "}
                <a href={c.info.href}>{c.info.phone}</a>
              </p>
              <p className="visit__camp-note">Tarif des éditions 2024 et 2025.</p>
            </aside>
          </div>
        </div>

        <div className="visit__rules" data-reveal>
          <h3 className="visit__rules-title">Sur le site</h3>
          <MobileFold label={`Voir les ${festival.amenities.length} installations`}>
            <ul>
              {festival.amenities.map((a) => {
                const Icon = AMENITY_ICONS[a.id];
                return (
                  <li key={a.id}>
                    <Icon size={28} weight="light" aria-hidden />
                    <span>{fr(a.text)}</span>
                  </li>
                );
              })}
            </ul>
          </MobileFold>
        </div>

        <div className="visit__rules" data-reveal>
          <h3 className="visit__rules-title">À savoir</h3>
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

        {/* Short answers, folded to one line each so the page barely grows;
            the text is in the HTML for search engines and AI answers. */}
        <div className="visit__rules visit__faq" data-reveal>
          <h3 className="visit__rules-title">Questions fréquentes</h3>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.q} className="faq__item">
                <summary className="faq__q">
                  {fr(item.q)}
                  <Plus className="faq__icon" size={16} weight="bold" aria-hidden />
                </summary>
                <p className="faq__a">{fr(item.a)}</p>
              </details>
            ))}
          </div>
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
      <Tumbleweed seed={11} className="tumble--visit" />
    </section>
  );
}
