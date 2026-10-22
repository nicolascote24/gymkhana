import { festival } from "@/content/festival";
import { siteUrl } from "@/lib/site";

// One JSON-LD graph per page, its nodes linked by @id. Everything in it is
// visible on the site (seo_rule.md, rule 6).
//
// The festival is described as an Organization tied to a Place, not as a
// LocalBusiness: it is a volunteer-run event organiser with no storefront and
// no opening hours, and LocalBusiness would claim both. An Event node is
// added only once the 2027 dates are confirmed (festival.edition.datesKnown).

const ORG = `${siteUrl}/#organisation`;
const PLACE = `${siteUrl}/#lieu`;
const SITE = `${siteUrl}/#site`;

const a = festival.address;
const c = festival.contact;

const organization = {
  "@type": "Organization",
  "@id": ORG,
  name: festival.name,
  alternateName: [festival.shortName, "FGF"],
  url: `${siteUrl}/`,
  logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
  image: `${siteUrl}/images/og-festival-gymkhana.jpg`,
  description:
    "Festival country gratuit organisé chaque août par des bénévoles, autour d'une compétition de gymkhana sanctionnée par le CBSLC.",
  foundingDate: String(festival.founded),
  founder: { "@type": "Person", name: festival.founder },
  email: c.email,
  telephone: "+1-418-540-5700",
  address: {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: "QC",
    postalCode: a.postalCode,
    addressCountry: "CA",
  },
  location: { "@id": PLACE },
  areaServed: [
    { "@type": "City", name: "Saint-David-de-Falardeau", sameAs: "https://www.wikidata.org/wiki/Q3462046" },
    { "@type": "City", name: "Saguenay", sameAs: "https://www.wikidata.org/wiki/Q139229" },
    {
      "@type": "AdministrativeArea",
      name: "Saguenay–Lac-Saint-Jean",
      sameAs: "https://www.wikidata.org/wiki/Q615914",
    },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+1-418-540-5700", contactType: "information et camping", availableLanguage: "fr" },
    { "@type": "ContactPoint", telephone: "+1-418-820-6134", contactType: "kiosques et exposants", availableLanguage: "fr" },
  ],
  sameAs: [c.facebook],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ce que propose le festival",
    itemListElement: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CAD",
        itemOffered: { "@type": "Service", name: "Entrée au festival : site, compétition et spectacles" },
      },
      {
        "@type": "Offer",
        price: "40",
        priceCurrency: "CAD",
        description: "Tarif des éditions 2024 et 2025, sans réservation",
        itemOffered: { "@type": "Service", name: "Camping temporaire pour la fin de semaine" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inscription aux épreuves de gymkhana" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kiosques et exposants" } },
    ],
  },
};

const place = {
  "@type": "Place",
  "@id": PLACE,
  name: a.venue,
  address: organization.address,
  geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
};

const website = {
  "@type": "WebSite",
  "@id": SITE,
  url: `${siteUrl}/`,
  name: festival.shortName,
  inLanguage: "fr-CA",
  publisher: { "@id": ORG },
};

type PageGraph = {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage";
  // Only when the same trail is visible on the page.
  breadcrumb?: { label: string; href: string }[];
};

export function pageGraph(p: PageGraph) {
  const url = `${siteUrl}${p.path}`;
  const crumbs = p.breadcrumb ? [{ label: "Accueil", href: "/" }, ...p.breadcrumb] : null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      place,
      website,
      {
        "@type": p.type ?? "WebPage",
        "@id": `${url}#page`,
        url,
        name: p.title,
        description: p.description,
        inLanguage: "fr-CA",
        isPartOf: { "@id": SITE },
        about: { "@id": ORG },
        ...(crumbs ? { breadcrumb: { "@id": `${url}#fil` } } : {}),
      },
      ...(crumbs
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#fil`,
              itemListElement: crumbs.map((cr, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: cr.label,
                item: `${siteUrl}${cr.href}`,
              })),
            },
          ]
        : []),
    ],
  };
}
