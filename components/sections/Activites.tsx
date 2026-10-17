import { Church, Coffee, Horse, MusicNotes } from "@phosphor-icons/react/dist/ssr";
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
    id: "canin",
    title: "Spectacle canin",
    text: "Les chiens d'Agilité Sag-Lac font leur démonstration dans le manège.",
    when: "Samedi, 17 h",
    img: "chien",
    alt: "Un border collie sort d'un tunnel d'agilité à toute vitesse.",
    area: "a",
  },
  {
    id: "famille",
    title: "Zone familiale",
    text: "Jeux gonflables, Jumpaï, amuseurs publics et théâtre pour les enfants.",
    when: "Samedi et dimanche",
    img: "mascotte",
    alt: "La mascotte cheval du festival fait un signe aux visiteurs.",
    area: "b",
  },
  {
    id: "danse",
    icon: MusicNotes,
    title: "Danse en ligne",
    text: "Avec les écoles Pascale Dufour et Nathalie Paquet, sous le chapiteau.",
    when: "Du jeudi au dimanche",
    tone: "terre",
    area: "c",
  },
  {
    id: "dejeuner",
    icon: Coffee,
    title: "Déjeuner communautaire",
    text: "Pour bien commencer la journée, au chalet des loisirs.",
    when: "Samedi et dimanche, 8 h à 11 h",
    tone: "sauge",
    area: "d",
  },
  {
    id: "messe",
    icon: Church,
    title: "Messe country",
    text: "Une tradition du dimanche matin, sous le chapiteau.",
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
      </div>
    </section>
  );
}
