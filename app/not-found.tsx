import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { festival } from "@/content/festival";
import CourseMark from "@/components/CourseMark";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page introuvable",
  // Not the home page's address: a 404 has no canonical of its own.
  alternates: { canonical: null },
};

// The pages people usually look for, one tap away.
const USEFUL = [
  { href: "/#programmation", label: "La programmation", text: "Les spectacles, la compétition et les activités, jour par jour." },
  { href: "/epreuves-gymkhana/", label: "Les épreuves de gymkhana", text: "Les dix épreuves de gymkhana, le règlement et comment s'inscrire." },
  { href: "/#visite", label: "Planifier ma visite", text: "L'adresse, le camping sans réservation et les règles du site." },
  { href: "/activite-festival/", label: "Les activités du festival", text: "Spectacles country, danse en ligne, zone familiale, déjeuners et camping." },
  { href: "/#visite", label: "Nous joindre", text: "Les numéros pour l'information, le camping et les kiosques." },
];

// The 404 (served by Cloudflare for any unknown address): the arena at night,
// a rider who left the course, and the two ways back.
export default function NotFound() {
  return (
    <main className="lost on-night" id="contenu">
      <div className="wrap lost__inner">
        <Link href="/" className="lost__brand" aria-label={`${festival.shortName}, accueil`}>
          <picture>
            <source type="image/avif" srcSet="/images/logo-96.avif 1x, /images/logo-192.avif 2x" />
            <img src="/images/logo-96.webp" width={44} height={44} alt="" />
          </picture>
          <span>{festival.shortName}</span>
        </Link>

        <div className="lost__body">
          <CourseMark label="Hors parcours" className="lost__mark" />
          <h1 className="lost__title">Page introuvable</h1>
          <p className="lost__text">
            Cette adresse ne mène nulle part sur le site du festival. La page a peut-être changé de place, ou
            l&apos;adresse contient une faute de frappe.
          </p>
          <div className="lost__actions">
            <Link href="/" className="btn">
              Retour à l&apos;accueil <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>
          <nav className="lost__useful" aria-labelledby="lost-useful">
            <h2 id="lost-useful" className="lost__useful-title">
              Ce que vous cherchiez peut-être
            </h2>
            <ul>
              {USEFUL.map((u) => (
                <li key={u.href}>
                  <Link href={u.href}>
                    <strong>{u.label}</strong>
                    <span>{u.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="lost__foot">
          {festival.address.venue}, {festival.address.city}
        </p>
      </div>
    </main>
  );
}
