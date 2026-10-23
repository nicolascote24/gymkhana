// Programme shown on the page. Until the 2027 programme is announced the page
// shows the full 2026 programme (17th edition, 6-9 August 2026), labelled as
// a preview of the last edition. Source: the official 2026 programme poster.

export type Lieu = "Chapiteau" | "Manège" | "Chalet des loisirs" | "Zone familiale";
export type Genre = "compétition" | "spectacle" | "danse" | "famille" | "repas" | "rencontre";

export type Evenement = {
  heure: string; // display form, French style: "9 h 30"
  fin?: string;
  titre: string;
  detail?: string;
  lieu?: Lieu; // absent when the programme does not say where
  genre: Genre;
  soir?: boolean; // 19 h and later: drives the day-to-night shift
};

export type Jour = { id: string; nom: string; court: string; date: string; evenements: Evenement[] };

export const programme = {
  apercu: true,
  edition: "Édition 2026",
  dates: "du 6 au 9 août 2026",
  note: "La programmation 2027 sera annoncée sur notre page Facebook.",
  jours: [
    {
      id: "jeudi",
      nom: "Jeudi",
      court: "Jeu",
      date: "6 août 2026",
      evenements: [
        {
          heure: "13 h",
          fin: "16 h",
          titre: "Danse en ligne",
          detail: "Écoles de danse en alternance",
          lieu: "Chapiteau",
          genre: "danse",
        },
        {
          heure: "17 h",
          fin: "19 h",
          titre: "5 à 7 d'ouverture",
          detail: "Sous la présidence d'honneur de Mme Priscilla Nemey. Bouchées et cocktails offerts par le comité",
          lieu: "Chapiteau",
          genre: "rencontre",
        },
        { heure: "19 h", titre: "Cours de danse en ligne", lieu: "Chapiteau", genre: "danse", soir: true },
        { heure: "20 h", titre: "Rick Duff", detail: "Spectacle", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "vendredi",
      nom: "Vendredi",
      court: "Ven",
      date: "7 août 2026",
      evenements: [
        {
          heure: "13 h",
          fin: "21 h",
          titre: "Danse en ligne",
          detail: "Écoles de danse en alternance",
          lieu: "Chapiteau",
          genre: "danse",
        },
        { heure: "14 h", fin: "17 h", titre: "Pratique de barils", lieu: "Manège", genre: "compétition" },
        {
          heure: "19 h",
          titre: "Spectacle de vélo freestyle",
          detail: "Showjam St-Ho",
          lieu: "Manège",
          genre: "spectacle",
          soir: true,
        },
        { heure: "20 h 30", titre: "Course à relais à pied", lieu: "Manège", genre: "famille", soir: true },
        {
          heure: "21 h 30",
          titre: "All Access Country Glam",
          detail: "Spectacle présenté par les fêtes du 350e de Chicoutimi",
          lieu: "Chapiteau",
          genre: "spectacle",
          soir: true,
        },
        { heure: "23 h", titre: "DJ Jello Musique", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "samedi",
      nom: "Samedi",
      court: "Sam",
      date: "8 août 2026",
      evenements: [
        {
          heure: "9 h 30",
          fin: "16 h",
          titre: "Compétition officielle de gymkhana",
          detail: "Sanctionnée par le CBSLC",
          lieu: "Manège",
          genre: "compétition",
        },
        {
          heure: "10 h",
          fin: "21 h",
          titre: "Danse en ligne",
          detail: "Écoles de danse en alternance",
          lieu: "Chapiteau",
          genre: "danse",
        },
        {
          heure: "11 h",
          fin: "16 h",
          titre: "Jeux gonflables, trampolines acrobatiques, amuseurs publics et tours de poney",
          lieu: "Zone familiale",
          genre: "famille",
        },
        {
          heure: "17 h",
          titre: "Spectacle de vélo freestyle",
          detail: "Showjam St-Ho",
          lieu: "Manège",
          genre: "spectacle",
        },
        { heure: "19 h", titre: "Grand Prix barils et sauvetage", lieu: "Manège", genre: "compétition", soir: true },
        { heure: "21 h 30", titre: "Alter Ego", detail: "Spectacle", lieu: "Chapiteau", genre: "spectacle", soir: true },
        { heure: "23 h", titre: "DJ Jello Musique", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "dimanche",
      nom: "Dimanche",
      court: "Dim",
      date: "9 août 2026",
      evenements: [
        { heure: "9 h 30", titre: "Messe", lieu: "Chapiteau", genre: "rencontre" },
        {
          heure: "9 h 30",
          fin: "15 h",
          titre: "Compétition de gymkhana",
          detail: "Sanctionnée par le CBSLC",
          lieu: "Manège",
          genre: "compétition",
        },
        {
          heure: "11 h",
          fin: "15 h",
          titre: "Jeux gonflables, trampoline acrobatique, amuseurs publics et tours de poney",
          lieu: "Zone familiale",
          genre: "famille",
        },
        { heure: "13 h", titre: "Achoum", detail: "Spectacle", lieu: "Chapiteau", genre: "spectacle" },
        { heure: "15 h", titre: "Clôture de la 17ᵉ édition", genre: "rencontre" },
      ],
    },
  ] satisfies Jour[],
};
