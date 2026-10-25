import Link from "next/link";
import Nav, { type Page } from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import "@/app/pages.css";

export type Crumb = { label: string; href: string };

type Props = {
  page: Page;
  // The trail after « Accueil », shown above the title and given to search
  // engines as BreadcrumbList (the same trail, so the two always match).
  crumbs: Crumb[];
  title: string;
  // The page's meta description, repeated in its structured data.
  description: string;
  // Width of the title's longest word in em at wdth 125, so it fits a phone.
  fp: number;
  lead: React.ReactNode;
  updated?: string; // ISO date, shown on guides and articles
  children: React.ReactNode;
};

const dateFr = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" });

// A content page: the site's menu and footer around a header (visible
// breadcrumb, one H1, the lead that answers who, what, where) and the page's
// sections. Everything is rendered on the server.
export default function PageShell({ page, crumbs, title, description, fp, lead, updated, children }: Props) {
  const trail = [{ label: "Accueil", href: "/" }, ...crumbs];
  const graph = pageGraph({ path: crumbs[crumbs.length - 1].href, title, description, breadcrumb: crumbs, updated });
  return (
    <>
      <Nav page={page} />
      <main id="contenu" className="pg">
        <div className="wrap">
          <nav className="pg-crumbs" aria-label="Fil d'Ariane">
            <ol>
              {trail.map((c, i) =>
                i < trail.length - 1 ? (
                  <li key={c.href}>
                    <Link href={c.href}>{c.label}</Link>
                  </li>
                ) : (
                  <li key={c.href} aria-current="page">
                    {c.label}
                  </li>
                ),
              )}
            </ol>
          </nav>
          <h1 className="pg-title" style={{ ["--fp" as string]: fp }}>
            {title}
          </h1>
          <div className="pg-lead">{lead}</div>
          {updated && (
            <p className="pg-updated">
              Mis à jour le <time dateTime={updated}>{dateFr(updated)}</time>
            </p>
          )}
          <div className="pg-body">{children}</div>
        </div>
      </main>
      <Footer page={page} />
      <JsonLd data={graph} />
    </>
  );
}

// One section of a content page: a question or topic as H2, then its answer.
export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  const headingId = `${id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-titre`;
  return (
    <section id={id} className="pg-sec" aria-labelledby={headingId}>
      <h2 id={headingId} className="pg-sec__title">
        {title}
      </h2>
      <div className="pg-sec__body">{children}</div>
    </section>
  );
}

// What the client still has to provide; visible until it is confirmed.
export function Todo({ children }: { children: React.ReactNode }) {
  return <p className="pg-todo">À CONFIRMER : {children}</p>;
}
