"use client";

import { useEffect, useRef, useState } from "react";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { festival } from "@/content/festival";
import { getGsap } from "@/lib/motion";

const links = [
  { href: "#programmation", label: "Programmation" },
  { href: "#gymkhana", label: "Le gymkhana" },
  { href: "#activites", label: "Activités" },
  { href: "#equipe", label: "L'équipe" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  // Solid once the hero is covered; hide on the way down, return on the way up.
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        const heroEnd = hero ? hero.offsetHeight - 1 : window.innerHeight;
        setSolid(y >= heroEnd);
        if (Math.abs(y - last.current) > 6) {
          setHidden(self.direction === 1 && y > window.innerHeight * 0.6);
          last.current = y;
        }
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-solid={solid} data-hidden={hidden && !open} data-hero-in>
        <div className="wrap nav__bar">
          <a href="#top" className="nav__brand" aria-label="Festival Gymkhana de Falardeau, retour en haut">
            <picture>
              <source type="image/avif" srcSet="/images/logo-96.avif 1x, /images/logo-192.avif 2x" />
              <img src="/images/logo-96.webp" width={44} height={44} alt="" />
            </picture>
            <span>
              Festival Gymkhana
              <br />
              de Falardeau
            </span>
          </a>
          <nav aria-label="Navigation principale" className="nav__links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href="#visite" className="btn btn--ghost">
              Planifier ma visite
            </a>
          </nav>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            Menu <List size={26} weight="bold" aria-hidden />
          </button>
        </div>
      </header>

      <div id="menu" className="menu" data-open={open} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="nav__bar">
          <span className="label">{festival.shortName}</span>
          <button
            type="button"
            className="nav__toggle"
            style={{ display: "inline-flex" }}
            onClick={() => setOpen(false)}
          >
            Fermer <X size={26} weight="bold" aria-hidden />
          </button>
        </div>
        <nav className="menu__links" aria-label="Menu mobile">
          {[...links, { href: "#visite", label: "Ma visite" }].map((l, i) => (
            <a key={l.href} href={l.href} style={{ ["--i" as string]: i }} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <span>{festival.edition.label}, entrée gratuite</span>
          <span>
            {festival.address.street}, {festival.address.city}
          </span>
          <a
            href={festival.contact.facebook}
            className="label"
            style={{
              display: "inline-flex",
              gap: ".5rem",
              alignItems: "center",
              marginTop: ".75rem",
              color: "var(--color-sable)",
            }}
          >
            Suivre sur Facebook <ArrowRight size={16} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </>
  );
}
