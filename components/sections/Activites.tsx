import Link from "next/link";
import { ArrowRight, Church, Coffee, Horse } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Picture, { type ImageId } from "@/components/Picture";
import { fr } from "@/lib/typo";

type Tile = {
  id: string;
  title: string;
  text: string;
  when: string;
  img?: ImageId;
  alt?: string;
  tone?: "terre" | "nuit" | "sauge" | "poussiere";
  // Phones: the pictogram that stands in for a photograph on the card.
  icon?: Icon;
  area: string;
};

// Examples from the 2024 programme. Tiles without a photograph are set as
// type on a colour field rather than with a stand-in picture.
const TILES: Tile[] = [
  {
    id: "velo",
    title: "Vélo freestyle",
    text: "Démonstrations et sauts acrobatiques au-dessus d'un coussin gonflable géant.",
    when: "Samedi",
    img: "act-bmx",
    alt: "Un cycliste en plein saut au-dessus du coussin gonflable, devant la forêt.",
    area: "a",
  },
  {
    id: "famille",
    title: "Zone familiale",
    text: "Jeux gonflables, Jumpaï, amuseurs publics et spectacle pour les enfants.",
    when: "Samedi et dimanche",
    img: "mascotte",
    alt: "La mascotte cheval du festival fait un signe aux visiteurs.",
    area: "b",
  },
  {
    id: "spectacles",
    title: "Spectacles",
    text: "Des groupes country et rock sous le chapiteau, puis un DJ.",
    when: "Jeudi, vendredi et samedi soir",
    img: "act-spectacle",
    alt: "Un groupe country sur la scène du chapiteau, sous les projecteurs, devant la foule.",
    area: "c",
  },
  {
    id: "poney",
    icon: Horse,
    title: "Tours de poney",
    text: "Un premier tour en selle pour les plus jeunes dans la zone familiale.",
    when: "Samedi et dimanche",
    tone: "sauge",
    area: "d",
  },
  {
    id: "messe",
    icon: Church,
    title: "Messe country",
    text: "Une tradition du dimanche matin, à la place des Fondateurs.",
    when: "Dimanche, 9 h 30",
    tone: "nuit",
    area: "e",
  },
  {
    id: "releve",
    icon: Horse,
    title: "La relève",
    text: "Les jeunes cavaliers ont leurs propres classes : initiation, baril jeunes et slalom jeunes.",
    when: "Pendant la compétition",
    tone: "poussiere",
    area: "f",
  },
];

export default function Activites() {
  return (
    <section id="activites" className="act" aria-labelledby="act-title">
      <div className="wrap">
        <div className="act__head">
          <h2 id="act-title" className="act__title" data-reveal="title">
            En famille
          </h2>
          <p className="act__intro" data-reveal>
            {fr("Entre deux épreuves, le site vit au rythme des familles. Exemples tirés de l'édition 2024.")}
          </p>
          <p className="act__hint" aria-hidden>
            {TILES.length} moments · faites glisser
          </p>
        </div>

        <ul className="act__grid">
          {TILES.map((t, i) => (
            <li
              key={t.id}
              className={`act__tile ${t.img ? "act__tile--photo" : `act__tile--${t.tone}`}${t.area === "a" ? " act__tile--lead" : ""}`}
              style={{ gridArea: t.area, ["--d" as string]: i % 3 }}
              data-reveal={t.img ? "image" : ""}
            >
              {t.img && (
                <div className="act__media">
                  <Picture id={t.img} alt={t.alt ?? ""} sizes="(max-width: 767px) 75vw, 45vw" />
                </div>
              )}
              {t.icon && (
                <div className="act__icon" aria-hidden>
                  <t.icon size={64} weight="light" />
                </div>
              )}
              <div className="act__body">
                <h3 className="act__name">{t.title}</h3>
                <p className="act__when">{fr(t.when)}</p>
                <p className="act__text">{fr(t.text)}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="act__more" data-reveal>
          <Link className="btn" href="/activite-festival/">
            Toutes les activités <ArrowRight size={18} weight="bold" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
