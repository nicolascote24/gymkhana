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
  const [current, setCurrent] = useState("");
  const last = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  // Closing by choosing a link hands focus to the page, not back to the button.
  const followedLink = useRef(false);

  // Solid once the hero is covered; hide on the way down, return on the way up.
  // The state is read from the real scroll position, and recomputed after a
  // ScrollTrigger refresh (which briefly measures the page from the top).
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const isSolid = () => window.scrollY >= (hero ? hero.offsetHeight - 1 : window.innerHeight);
    let refreshing = false;
    const onRefreshInit = () => {
      refreshing = true;
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (refreshing) return;
        const y = window.scrollY;
        setSolid(isSolid());
        if (Math.abs(y - last.current) > 6) {
          setHidden(self.direction === 1 && y > window.innerHeight * 0.6);
          last.current = y;
        }
      },
    });
    const onRefresh = () => {
      refreshing = false;
      setSolid(isSolid());
      last.current = window.scrollY;
    };
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    ScrollTrigger.addEventListener("refresh", onRefresh);
    // The link of the section on screen is marked, so the reader knows where they are.
    const sections = links.map((l) =>
      ScrollTrigger.create({
        trigger: l.href,
        start: "top 50%",
        end: "bottom 50%",
        // Measured after the pinned scenes further down the page add their length.
        refreshPriority: -1,
        onToggle: (self) => setCurrent((c) => (self.isActive ? l.href : c === l.href ? "" : c)),
      }),
    );
    return () => {
      st.kill();
      sections.forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, []);

  // The menu is a modal sheet: focus moves in, Tab stays inside, the page
  // behind is inert, Escape closes it and focus returns to the menu button.
  useEffect(() => {
    const behind = document.querySelectorAll<HTMLElement>("main, footer, .quickbar, .nav__bar");
    document.documentElement.style.overflow = open ? "hidden" : "";
    behind.forEach((el) => {
      if (el.closest("#menu")) return;
      el.inert = open;
    });
    const menu = menuRef.current;
    if (open && menu) {
      menu.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasOpen.current && !followedLink.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = open;
    followedLink.current = false;
    const onKey = (e: KeyboardEvent) => {
      if (!open || !menu) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items = [...menu.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };
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
              <a key={l.href} href={l.href} data-current={current === l.href || undefined}>
                {l.label}
              </a>
            ))}
            <a href="#visite" className="btn btn--ghost">
              Planifier ma visite
            </a>
          </nav>
          <button
            ref={toggleRef}
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

      <div
        id="menu"
        ref={menuRef}
        className="menu"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
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
          {[...links, { href: "#visite", label: "Planifier ma visite" }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ ["--i" as string]: i }}
              onClick={() => {
                followedLink.current = true;
                setOpen(false);
              }}
            >
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
