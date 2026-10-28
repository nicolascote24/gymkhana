// Festival facts. Source: references/brief.md (archives of the former site
// and the 2023-2024 programme leaflets). Values marked PROVISOIRE are waiting
// for the 2027 announcement.

const nbsp = " ";

export const festival = {
  name: "Festival Gymkhana de Saint-David-de-Falardeau",
  shortName: "Festival Gymkhana de Falardeau",
  place: "Saint-David-de-Falardeau",
  region: "Saguenay–Lac-Saint-Jean",
  founded: 2007,
  founder: "Suzie Gauthier",
  volunteers: 100,
  competitors: 150,
  days: 4,
  edition: {
    label: `Août${nbsp}2027`,
    datesKnown: true,
    datesLabel: `12 au 15 août`,
    startDate: "2027-08-12T09:00:00-04:00",
    endDate: "2027-08-15T23:59:59-04:00",
  },
  slogans: {
    main: `Au triple galop vers Falardeau${nbsp}!`,
    saddle: `En selle vers Falardeau${nbsp}!`,
    meet: `C'est un rendez-vous${nbsp}!`,
  },
  motto: "Accueillir les visiteurs et les compétiteurs comme des membres de la famille.",
  address: {
    venue: "Site événementiel",
    street: "51, rue du Chalet",
    city: "Saint-David-de-Falardeau",
    province: "Québec",
    postalCode: "G0V 1C0",
    lat: 48.620091,
    lng: -71.106986,
    access: "À 20 minutes au nord de Chicoutimi",
  },
  contact: {
    info: { label: "Information et camping", phone: "418-540-5700", href: "tel:+14185405700" },
    kiosks: {
      label: "Kiosques et exposants",
      phone: "418-820-6134",
      href: "tel:+14188206134",
      email: "w.harvey@icloud.com",
    },
    email: "festivalfalardeau@gmail.com",
    facebook: "https://www.facebook.com/FGF2015",
  },
  camping: {
    price: `50${nbsp}$`,
    period: "pour la fin de semaine (4 jours)",
    // No reservation is the one thing campers must know: it gets the ticket.
    ticket: "Sans réservation",
    stub: "Premier arrivé, premier servi",
    terms: "Terrains sans service.",
  },
  rules: [
    {
      id: "alcool",
      text: "N'apportez ni alcool ni bouteilles de verre : des bars sont à votre disposition sous le chapiteau et aux estrades.",
    },
    { id: "chiens", text: "Chiens en laisse en tout temps, interdits dans les gradins." },
    { id: "securite", text: "Respect des consignes de sécurité équestre aux abords de l'arène." },
  ],
  // What visitors find on site (the temporary camping has its own card).
  amenities: [
    { id: "gradins", text: "Manège de compétition avec gradins" },
    { id: "chapiteau", text: "Chapiteau des spectacles et de la danse, avec bar" },
    { id: "famille", text: "Zone familiale" },
    { id: "stationnement", text: "Stationnement sur place" },
  ],
} as const;

export const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${festival.address.lat},${festival.address.lng}`;

// Organising committee (2025 official version, references/brief.md section 3).
export const comite = [
  { role: "Présidente", name: "Ann-Frédérick Lavoie" },
  { role: "Trésorière", name: "Andréanne Lessard" },
  { role: "Secrétaire", name: "Juliette Tremblay" },
  { role: "Directeurs", name: "Serge Lavoie, Éric Tremblay, Pierre Rousseau, Nicolas Dionne" },
];
