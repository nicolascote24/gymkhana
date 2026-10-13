// Programme shown on the page. Until the 2027 programme is announced the page
// shows the full 2024 programme (15th edition, 8-11 August 2024), labelled as
// a preview of a previous edition. Source: references/brief.md, section 6.

export type Lieu = "Chapiteau" | "Manège" | "Chalet des loisirs" | "Zone familiale";
export type Genre = "compétition" | "spectacle" | "danse" | "famille" | "repas" | "rencontre";

export type Evenement = {
  heure: string; // display form, French style: "9 h 30"
  fin?: string;
  titre: string;
  detail?: string;
  lieu: Lieu;
  genre: Genre;
  soir?: boolean; // 19 h and later: drives the day-to-night shift
};

export type Jour = { id: string; nom: string; court: string; date: string; evenements: Evenement[] };

export const programme = {
  apercu: true,
  edition: "Édition 2024",
  dates: "du 8 au 11 août 2024",
  note: "La programmation 2027 sera annoncée sur notre page Facebook.",
  jours: [
    {
      id: "jeudi",
      nom: "Jeudi",
      court: "Jeu",
      date: "8 août 2024",
      evenements: [
        {
          heure: "13 h",
          fin: "16 h",
          titre: "Danse en ligne",
          detail: "École de danse Pascale Dufour",
          lieu: "Chapiteau",
          genre: "danse",
        },
        {
          heure: "17 h",
          fin: "19 h",
          titre: "5 à 7 d'ouverture",
          detail: "Bouchées et cocktails offerts par le comité",
          lieu: "Chapiteau",
          genre: "rencontre",
        },
        {
          heure: "19 h",
          titre: "Cours de danse en ligne",
          detail: "École Pascale Dufour",
          lieu: "Chapiteau",
          genre: "danse",
          soir: true,
        },
        { heure: "20 h", titre: "Les Johnnys", detail: "Spectacle", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "vendredi",
      nom: "Vendredi",
      court: "Ven",
      date: "9 août 2024",
      evenements: [
        {
          heure: "13 h",
          fin: "16 h",
          titre: "Danse en ligne",
          detail: "Écoles Pascale Dufour et Nathalie Paquet",
          lieu: "Chapiteau",
          genre: "danse",
        },
        { heure: "14 h", fin: "17 h", titre: "Pratique libre de barils", lieu: "Manège", genre: "compétition" },
        {
          heure: "19 h",
          titre: "Derby d'attelage",
          detail: "Association des meneurs du Saguenay–Lac-Saint-Jean",
          lieu: "Manège",
          genre: "compétition",
          soir: true,
        },
        { heure: "20 h 30", titre: "Course de relais à pied", lieu: "Manège", genre: "famille", soir: true },
        { heure: "21 h 30", titre: "MGM Band", detail: "Spectacle", lieu: "Chapiteau", genre: "spectacle", soir: true },
        { heure: "23 h", titre: "DJ Jello Musique", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "samedi",
      nom: "Samedi",
      court: "Sam",
      date: "10 août 2024",
      evenements: [
        { heure: "8 h", fin: "11 h", titre: "Déjeuner communautaire", lieu: "Chalet des loisirs", genre: "repas" },
        {
          heure: "9 h 30",
          fin: "16 h",
          titre: "Compétition officielle de gymkhana",
          detail: "Sanctionnée par le CBSLC",
          lieu: "Manège",
          genre: "compétition",
        },
        { heure: "11 h", titre: "Théâtre pour la famille", lieu: "Zone familiale", genre: "famille" },
        {
          heure: "11 h",
          fin: "16 h",
          titre: "Jeux gonflables, Jumpaï et amuseurs publics",
          lieu: "Zone familiale",
          genre: "famille",
        },
        {
          heure: "13 h",
          fin: "16 h",
          titre: "Danse en ligne",
          detail: "Écoles Pascale Dufour et Nathalie Paquet",
          lieu: "Chapiteau",
          genre: "danse",
        },
        { heure: "17 h", titre: "Spectacle canin", detail: "Agilité Sag-Lac", lieu: "Manège", genre: "famille" },
        { heure: "19 h", titre: "Grand Prix barils et sauvetage", lieu: "Manège", genre: "compétition", soir: true },
        {
          heure: "21 h 30",
          titre: "Rock Story",
          detail: "Spectacle",
          lieu: "Chapiteau",
          genre: "spectacle",
          soir: true,
        },
        { heure: "23 h", titre: "DJ Jello Musique", lieu: "Chapiteau", genre: "spectacle", soir: true },
      ],
    },
    {
      id: "dimanche",
      nom: "Dimanche",
      court: "Dim",
      date: "11 août 2024",
      evenements: [
        { heure: "8 h", fin: "11 h", titre: "Déjeuner communautaire", lieu: "Chalet des loisirs", genre: "repas" },
        { heure: "9 h 30", titre: "Messe country", lieu: "Chapiteau", genre: "rencontre" },
        {
          heure: "9 h 30",
          fin: "16 h",
          titre: "Compétition de gymkhana, finales",
          detail: "Sanctionnée par le CBSLC",
          lieu: "Manège",
          genre: "compétition",
        },
        {
          heure: "11 h",
          fin: "16 h",
          titre: "Jeux gonflables et amuseurs publics",
          lieu: "Zone familiale",
          genre: "famille",
        },
        {
          heure: "12 h",
          fin: "15 h",
          titre: "Danse en ligne",
          detail: "Écoles Pascale Dufour et Nathalie Paquet",
          lieu: "Chapiteau",
          genre: "danse",
        },
      ],
    },
  ] satisfies Jour[],
};
