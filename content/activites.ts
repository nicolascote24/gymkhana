// What there is to do at the festival, in the order of a day on the site
// (/activite-festival/). Sources: the 2024 programme (content/programmation.ts),
// references/brief.md (2025 edition) and the client's answers of October 2026.
// No hours or prices here: the programme on the home page carries them.

import type { ImageId } from "@/components/Picture";

export type Activite = { name: string; text: string };

export type Figure = { img: ImageId; alt: string };

export type Chapitre = {
  id: string;
  no: string;
  moment: "Matin" | "Jour" | "Soir";
  title: string;
  intro: string;
  items: Activite[];
  figures: Figure[];
};

export const chapitres: Chapitre[] = [
  {
    id: "matin",
    no: "01",
    moment: "Matin",
    title: "Traditions et repas",
    intro:
      "La journée commence autour d'une table. Ici, on accueille le public et les compétiteurs comme des membres de la famille.",
    items: [
      {
        name: "Déjeuner communautaire",
        text: "Le samedi et le dimanche matin, au chalet des loisirs, avant les premières courses.",
      },
      { name: "Messe country", text: "Une tradition du dimanche matin, sous le chapiteau." },
      {
        name: "Cuisine de rue",
        text: "Des camions de cuisine de rue et une cantine nourrissent le site pendant tout le festival.",
      },
    ],
    figures: [{ img: "act-cantine", alt: "Des festivaliers commandent au camion de cuisine de rue Le Churros et Le Tacos." }],
  },
  {
    id: "manege",
    no: "02",
    moment: "Jour",
    title: "Les spectacles du manège",
    intro: "Entre les courses, le sable du manège accueille d'autres spectacles, devant les mêmes gradins.",
    items: [
      { name: "Spectacle canin", text: "Les chiens d'Agilité Sag-Lac font leur démonstration d'agilité." },
      { name: "Derby d'attelage", text: "Avec l'Association des meneurs du Saguenay–Lac-Saint-Jean." },
      { name: "Course de relais à pied", text: "Une course en équipes, dans le sable du manège." },
      { name: "BMX et vélo de montagne", text: "Des sauts acrobatiques au-dessus d'un coussin gonflable géant." },
    ],
    figures: [{ img: "act-bmx", alt: "Un cycliste en plein saut au-dessus du coussin gonflable, devant la forêt." }],
  },
  {
    id: "famille",
    no: "03",
    moment: "Jour",
    title: "En famille",
    intro: "La zone familiale ouvre le samedi et le dimanche. Tout y est gratuit.",
    items: [
      { name: "Jeux gonflables", text: "Châteaux et glissades, au milieu de la zone familiale." },
      { name: "Jumpaï", text: "Le trampoline à élastiques. Même la mascotte s'y essaie." },
      { name: "Théâtre", text: "Une pièce pour les petits et les grands." },
      { name: "Amuseurs publics", text: "Des artistes de rue animent la zone." },
      { name: "Tours de poney", text: "Un premier tour pour les plus jeunes." },
    ],
    figures: [
      { img: "act-jumpai", alt: "La mascotte cheval du festival saute au Jumpaï, retenue par ses élastiques." },
      { img: "act-gonflables", alt: "Des enfants jouent devant un château gonflable en forme de carrosse, dans la zone familiale." },
    ],
  },
  {
    id: "competition",
    no: "04",
    moment: "Jour",
    title: "La compétition",
    intro:
      "Le cœur du festival : une compétition officielle de gymkhana, sanctionnée par le CBSLC, qu'on regarde gratuitement depuis les gradins.",
    items: [
      { name: "Une centaine de cavaliers", text: "Contre la montre, autour des barils et des piquets." },
      { name: "Grand Prix barils et sauvetage", text: "Le samedi soir, le moment fort de la fin de semaine." },
      { name: "La relève", text: "Les jeunes cavaliers ont leurs propres classes." },
    ],
    figures: [{ img: "act-releve", alt: "Une jeune cavalière casquée, au pas sur un cheval palomino, devant les spectateurs." }],
  },
  {
    id: "kiosques",
    no: "05",
    moment: "Jour",
    title: "Kiosques et boutiques",
    intro: "Des exposants s'installent autour du site : de quoi repartir chaussé, coiffé et habillé en vrai cowboy.",
    items: [
      { name: "Bottes et chapeaux", text: "Bottes de cuir, chapeaux de cowboy et accessoires, à essayer sur place." },
      { name: "Vêtements et équitation", text: "Vêtements western, licous, brides et articles pour le cheval." },
    ],
    figures: [
      { img: "act-bottes", alt: "Un kiosque de bottes et de chapeaux western sous un abri." },
      { img: "act-vetements", alt: "L'intérieur d'une remorque-boutique de vêtements western et d'articles d'équitation." },
    ],
  },
  {
    id: "chapiteau",
    no: "06",
    moment: "Soir",
    title: "Le chapiteau",
    intro: "Chaque soir, des groupes country et rock en spectacle sous le grand chapiteau, puis un DJ.",
    items: [
      { name: "5 à 7 d'ouverture", text: "Le festival s'ouvre avec des bouchées et des cocktails offerts par le comité." },
      {
        name: "Spectacles country et rock",
        text: "Aux éditions récentes : Les Johnnys, MGM Band et Rock Story (2024) ; Boogie Wonder Band, Blueberry Country Band, Jeffos et Brisson (2025).",
      },
      { name: "DJ Jello Musique", text: "La soirée continue après le spectacle." },
      { name: "Danse en ligne", text: "Cours et après-midi de danse avec les écoles Pascale Dufour et Nathalie Paquet." },
      {
        name: "Le bar",
        text: "Le seul endroit pour prendre un verre : l'alcool et le verre apportés ne sont pas permis sur le site.",
      },
    ],
    figures: [
      { img: "act-spectacle", alt: "Un groupe country en spectacle sous le chapiteau, devant la foule, sous les projecteurs." },
      { img: "act-enseigne", alt: "L'enseigne lumineuse « Gymkhana Falardeau » sous le chapiteau, le soir." },
      { img: "act-dj", alt: "Un DJ fait lever les bras de la foule sous des lumières orangées." },
    ],
  },
];
