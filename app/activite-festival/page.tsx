import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, Tent } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import Picture from "@/components/Picture";
import CourseMark from "@/components/CourseMark";
import HeroLoop from "@/components/HeroLoop";
import images from "@/content/images.json";
import { chapitres, type Chapitre } from "@/content/activites";
import { festival, mapsUrl } from "@/content/festival";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";
import "./activites.css";

const TITLE = "Activités du festival, Saguenay";
const H1 = "Les activités du festival";
const PATH = "/activite-festival/";
const DESCRIPTION =
  "Les activités du festival, en août à 20 min de Chicoutimi. Entrée gratuite. Gymkhana, spectacles country, danse en ligne, zone familiale et kiosques.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: {
    url: "/images/og-activites.jpg",
    width: 1200,
    height: 630,
    alt: "Une cavalière au manège du Festival Gymkhana de Falardeau, devant les gradins pleins, en plein jour",
  },
});

const ch = Object.fromEntries(chapitres.map((c) => [c.id, c])) as Record<string, Chapitre>;

// The page's own facts, all confirmed by the client (October 2026). The
// free entry is the one figure set in red.
const FACTS = [
  { value: "0 $", label: "Entrée, compétition et spectacles", key: true },
  { value: "4 jours", label: "En août, du jeudi au dimanche" },
  { value: "20 000+", label: "Visiteurs à l'édition 2026" },
  { value: "20 min", label: "Au nord de Chicoutimi" },
];

type Img = { sources: Record<"avif" | "webp", { src: string; w: number }[]> };
const srcSet = (id: keyof typeof images, type: "avif" | "webp") =>
  (images[id] as Img).sources[type].map((x) => `${x.src} ${x.w}w`).join(", ");

// An activities page shaped like a day on the site: a day at the arena in
// full bleed, then the morning and the day on sand (the competition and the
// kiosks on the paler sand), the lit arena at dusk, the marquee at night, the
// visit on sand. It details the home page's « En famille » summary without
// repeating it, and leaves the rules of the competition to /epreuves-gymkhana/.
export default function ActiviteFestival() {
  // No visible breadcrumb on this page, so no BreadcrumbList either (seo_rule.md, rule 6).
  const graph = pageGraph({ path: PATH, title: H1, description: DESCRIPTION });
  const { matin, manege, competition, famille, kiosques, chapiteau } = ch;
  return (
    <>
      <Nav page="activites" />
      <main id="contenu" className="pg ac">
        {/* ---------------- hero: a day at the arena, full bleed ---------------- */}
        <header className="ac-hero">
          <div className="ac-hero__media" aria-hidden>
            {/* The page's largest paint: phones get a portrait crop around the rider. */}
            <picture>
              <source media="(max-width: 767px)" type="image/avif" srcSet={srcSet("act-hero-portrait", "avif")} sizes="100vw" />
              <source media="(max-width: 767px)" type="image/webp" srcSet={srcSet("act-hero-portrait", "webp")} sizes="100vw" />
              <source type="image/avif" srcSet={srcSet("act-hero", "avif")} sizes="100vw" />
              <source type="image/webp" srcSet={srcSet("act-hero", "webp")} sizes="100vw" />
              <img
                src={images["act-hero"].fallback}
                alt=""
                width={images["act-hero"].width}
                height={images["act-hero"].height}
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />
            </picture>
            <HeroLoop className="ac-hero__video" />
          </div>
          {/* An inner page's opening: shorter and quieter than the home hero.
              The title on two wide lines at the foot, then one ruled bar with
              a single sentence and the camping stub. */}
          <div className="wrap ac-hero__inner">
            <p className="ac-hero__eyebrow" data-enter>
              {keepPlaces("Saint-David-de-Falardeau")}
              <span className="ac-hero__tag"> · Du matin au dernier set</span>
            </p>
            <h1 className="ac-hero__title" data-enter="title" style={{ ["--d" as string]: 1 }}>
              <span>Les activités</span> <span>du festival</span>
            </h1>
            <div className="ac-hero__bar" data-enter style={{ ["--d" as string]: 2 }}>
              <p className="ac-hero__lead">
                {fr("Un festival de gymkhana et de musique country, quatre jours en août, à 20 minutes de Chicoutimi. Entrée gratuite pour tout le monde.")}
              </p>
              <a className="ac-ticket" href="#planifier">
                <span className="ac-ticket__main">Camping sans réservation</span>
                <span className="ac-ticket__stub">
                  {festival.camping.price} <ArrowRight size={16} weight="bold" aria-hidden />
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* ---------------- the day at a glance, on sand ---------------- */}
        <div className="ac-brief wrap">
          <dl className="ac-facts" data-reveal>
            {FACTS.map((f) => (
              <div key={f.value} className={f.key ? "is-key" : undefined}>
                <dt>{fr(f.label)}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <nav className="ac-index" aria-label="Les moments de la journée" data-reveal>
            <CourseMark label="La journée" className="ac-index__mark" />
            <ol>
              {chapitres.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="ac-index__no">{c.no}</span>
                    <span className="ac-index__title">{c.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* ---------------- 01 morning: photo beside the list ---------------- */}
        <section id={matin.id} className="ch ch--split wrap" aria-labelledby={`${matin.id}-titre`}>
          <Head c={matin} />
          <figure className="ch__fig ch__media" data-reveal="image">
            <Picture id={matin.figures[0].img} alt={matin.figures[0].alt} sizes="(max-width: 1023px) 92vw, 55vw" />
          </figure>
          <List c={matin} className="ch__list" />
        </section>

        {/* ---------------- 02 arena shows: one wide frame, four acts ---------------- */}
        <section id={manege.id} className="ch ch--wide wrap" aria-labelledby={`${manege.id}-titre`}>
          <Head c={manege} />
          <figure className="ch__fig ch__cinema" data-reveal="image">
            <Picture id={manege.figures[0].img} alt={manege.figures[0].alt} sizes="(max-width: 1023px) 92vw, 90vw" />
          </figure>
          <List c={manege} className="acts--4" />
        </section>

        {/* ---------------- 03 family: a spread, edges aligned ---------------- */}
        <section id={famille.id} className="ch ch--spread wrap" aria-labelledby={`${famille.id}-titre`}>
          <Head c={famille} />
          <figure className="ch__fig ch__tall" data-reveal="image">
            <Picture id={famille.figures[0].img} alt={famille.figures[0].alt} sizes="(max-width: 1023px) 46vw, 38vw" />
          </figure>
          <figure className="ch__fig ch__band" data-reveal="image" style={{ ["--d" as string]: 1 }}>
            <Picture id={famille.figures[1].img} alt={famille.figures[1].alt} sizes="(max-width: 1023px) 46vw, 55vw" />
          </figure>
          <List c={famille} className="acts--2 ch__list" />
        </section>

        {/* ---------------- 04 competition: short, on the paler sand ---------------- */}
        <section id={competition.id} className="ac-pale" aria-labelledby={`${competition.id}-titre`}>
          <div className="ch ch--arena wrap">
            <Head c={competition} />
            <figure className="ch__fig ch__media" data-reveal="image">
              <Picture id={competition.figures[0].img} alt={competition.figures[0].alt} sizes="(max-width: 1023px) 92vw, 50vw" />
            </figure>
            <div className="ch__side">
              <ul className="acts">
                {competition.items.map((a, i) => (
                  <li key={a.name} className={`acts__item${i === 1 ? " is-key" : ""}`} data-reveal style={{ ["--d" as string]: i }}>
                    <h3 className="acts__name">{fr(a.name)}</h3>
                    <p className="acts__text">{fr(a.text)}</p>
                  </li>
                ))}
              </ul>
              <Link className="btn" href="/epreuves-gymkhana/">
                Les épreuves de gymkhana <ArrowRight size={18} weight="bold" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- 05 kiosks: on the paler sand ---------------- */}
        <section id={kiosques.id} className="ac-pale" aria-labelledby={`${kiosques.id}-titre`}>
          <div className="ch ch--duo wrap">
            <Head c={kiosques} />
            <div className="ch__side">
              <List c={kiosques} />
              <p className="ch__contact">
                {fr("Vous voulez tenir un kiosque ?")}{" "}
                <a href={festival.contact.kiosks.href}>
                  <Phone size={16} weight="bold" aria-hidden /> {festival.contact.kiosks.phone}
                </a>
              </p>
            </div>
            <div className="ch__pair">
              {kiosques.figures.map((f, i) => (
                <figure key={f.img} className="ch__fig" data-reveal="image" style={{ ["--d" as string]: i }}>
                  <Picture id={f.img} alt={f.alt} sizes="(max-width: 1023px) 46vw, 30vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- dusk: the lit arena turns the page to night ---------------- */}
        <figure className="ac-dusk">
          <Picture
            id="act-arene-nuit"
            alt="Le manège éclairé, vu du ciel, entouré de spectateurs, la nuit."
            sizes="100vw"
          />
          <figcaption className="ac-dusk__text wrap">
            <span data-reveal>
              Le soir, le manège s&apos;allume pour le <em>Grand Prix</em>. Puis tout le monde se retrouve sous le
              chapiteau.
            </span>
          </figcaption>
        </figure>

        {/* ---------------- 06 the marquee ---------------- */}
        <div className="ac-night on-night">
          <section id={chapiteau.id} className="ch ch--night wrap" aria-labelledby={`${chapiteau.id}-titre`}>
            <Head c={chapiteau} />
            <figure className="ch__fig ch__fig--lead" data-reveal="image">
              <Picture id={chapiteau.figures[0].img} alt={chapiteau.figures[0].alt} sizes="(max-width: 1023px) 92vw, 90vw" />
            </figure>
            {chapiteau.figures.slice(1).map((f, i) => (
              <figure key={f.img} className="ch__fig ch__side-fig" data-reveal="image" style={{ ["--d" as string]: i + 1 }}>
                <Picture id={f.img} alt={f.alt} sizes="(max-width: 1023px) 46vw, 30vw" />
              </figure>
            ))}
            <List c={chapiteau} className="ch__list" />
          </section>
        </div>

        {/* ---------------- the visit: the camping ticket first ---------------- */}
        <section id="planifier" className="ac-plan" aria-labelledby="planifier-titre">
          <div className="wrap">
            <h2 id="planifier-titre" className="ac-plan__title" data-reveal="title">
              Planifier ma visite
            </h2>
            <div className="ac-plan__grid">
              <div className="ac-camp">
                <figure className="ac-camp__fig" data-reveal="image">
                  <Picture
                    id="act-camping"
                    alt="Le camping temporaire du festival vu du ciel : des roulottes alignées en bordure de la forêt."
                    sizes="(max-width: 1023px) 92vw, 58vw"
                  />
                </figure>
                {/* A festival ticket laid on the photograph: the main part says
                    what campers must not miss, the stub past the perforation
                    holds the price. */}
                <article className="ac-pass" aria-labelledby="camp-titre" data-reveal>
                  <div className="ac-pass__main">
                    <p className="ac-pass__label">
                      <Tent size={22} weight="light" aria-hidden /> Camping sur place
                    </p>
                    <h3 id="camp-titre" className="ac-pass__title">
                      {festival.camping.ticket}
                    </h3>
                    <p className="ac-pass__rule">{fr(festival.camping.stub)}</p>
                  </div>
                  <div className="ac-pass__stub">
                    <strong className="ac-pass__price">{festival.camping.price}</strong>
                    <span>{fr(festival.camping.period)}</span>
                  </div>
                </article>
                <p className="ac-camp__terms">
                  {fr(`Tarif des éditions 2024 et 2025. ${festival.camping.terms}`)} Information :{" "}
                  <a href={festival.contact.info.href}>{festival.contact.info.phone}</a>
                </p>
              </div>

              <div className="ac-plan__info" data-reveal style={{ ["--d" as string]: 1 }}>
                <dl className="ac-rules">
                  <div>
                    <dt>Entrée</dt>
                    <dd>{fr("Gratuite, comme la compétition et les spectacles.")}</dd>
                  </div>
                  <div>
                    <dt>Adresse</dt>
                    <dd>
                      {festival.address.venue}, {festival.address.street}, {keepPlaces(festival.address.city)}
                    </dd>
                  </div>
                  <div>
                    <dt>Sur place</dt>
                    <dd>{fr("Stationnement, cantine et bar sous le chapiteau.")}</dd>
                  </div>
                  {festival.rules.slice(0, 2).map((r) => (
                    <div key={r.id}>
                      <dt>{r.id === "alcool" ? "Alcool" : "Chiens"}</dt>
                      <dd>{fr(r.text)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="ac-plan__actions">
                  <a className="btn" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Itinéraire <ArrowUpRight size={18} weight="bold" aria-hidden />
                  </a>
                  <Link className="btn btn--ghost" href="/#programmation">
                    La programmation <ArrowRight size={18} weight="bold" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer page="activites" />
      <JsonLd data={graph} />
    </>
  );
}

// A chapter's head: the outlined numeral, the moment in red, the title and
// the line that sets it.
function Head({ c }: { c: Chapitre }) {
  return (
    <header className="ch__head">
      <p className="ch__no" aria-hidden>
        {c.no}
      </p>
      <p className="ch__moment">{c.moment}</p>
      <h2 id={`${c.id}-titre`} className="ch__title" data-reveal="title">
        {c.title}
      </h2>
      <p className="ch__intro" data-reveal>
        {fr(c.intro)}
      </p>
    </header>
  );
}

// The chapter's activities, one per ruled line: name, then one sentence.
function List({ c, className }: { c: Chapitre; className?: string }) {
  return (
    <ul className={`acts${className ? ` ${className}` : ""}`}>
      {c.items.map((a, i) => (
        <li key={a.name} className="acts__item" data-reveal style={{ ["--d" as string]: i % 4 }}>
          <h3 className="acts__name">{fr(a.name)}</h3>
          <p className="acts__text">{keepPlaces(fr(a.text))}</p>
        </li>
      ))}
    </ul>
  );
}
