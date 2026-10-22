"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { festival } from "@/content/festival";
import { withGsap } from "@/lib/motion";

export type Page = "accueil" | "epreuves" | "activites" | "confidentialite";

// The menu sheet is a native popover: the Menu and Fermer buttons open and
// close it from the first paint, before this script runs, and Escape works
// natively. The script adds what HTML cannot: focus moved in and kept inside,
// the page behind made inert, the sheet closed after following a link.
// Browsers without popovers (before 2023-24) fall back to the script alone.
const hasPopover = () => typeof HTMLElement !== "undefined" && "popover" in HTMLElement.prototype;

// Three links, the same on every page, in the order visitors need them: when
// and what (the programme), what there is to do (the activities page), the
// sport (straight to the events page, one click less than the home section
// that only introduces it). The visit is the red action beside them; the
// rest (partners, team, contact) lives in the footer. Away from the home page
// its sections are reached at /#…. A page marks the link it belongs to.
const LINKS: { href: string; label: string; parentOf?: Page[] }[] = [
  { href: "#programmation", label: "Programmation" },
  { href: "/activite-festival/", label: "Activités", parentOf: ["activites"] },
  { href: "/epreuves-gymkhana/", label: "Le gymkhana", parentOf: ["epreuves"] },
];

// The action of the plaque: plan the visit, or register on the events page.
const VISIT = { href: "/#visite", label: "Planifier ma visite" };
const ACTION: Record<Page, { href: string; label: string }> = {
  accueil: { href: "#visite", label: "Planifier ma visite" },
  epreuves: { href: "#inscription", label: "S'inscrire" },
  activites: VISIT,
  confidentialite: VISIT,
};

// A link to another page (or to a home section from elsewhere) is a client
// navigation; an in-page anchor stays a plain link.
function SmartLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return href.startsWith("#") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

export default function Nav({ page = "accueil" }: { page?: Page }) {
  const home = page === "accueil";
  const links = LINKS.map((l) => ({ ...l, href: !home && l.href.startsWith("#") ? `/${l.href}` : l.href }));
  const action = ACTION[page];
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!home);
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
    return withGsap(({ ScrollTrigger }) => {
      // Only the home hero is a photograph the plaque can sit on, clear.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const isSolid = () => !home || window.scrollY >= (hero ? hero.offsetHeight - 1 : window.innerHeight);
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
      // Only the home page has sections to follow.
      const sections = links
        .filter((l) => l.href.startsWith("#"))
        .map((l) =>
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
    });
    // Once per page: the Nav mounts with each page, and its links are fixed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The menu is a modal sheet: focus moves in, Tab stays inside, the page
  // behind is inert, Escape closes it and focus returns to the menu button.
  // It may already be open when the script arrives (opened natively).
  useEffect(() => {
    if (menuRef.current?.matches(":popover-open")) setOpen(true);
  }, []);
  const close = () => {
    if (hasPopover()) menuRef.current?.hidePopover();
    setOpen(false);
  };
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
      if (e.key === "Escape") close();
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
          <SmartLink
            href={home ? "#top" : "/"}
            className="nav__brand"
            aria-label={
              home ? "Festival Gymkhana de Falardeau, retour en haut" : "Festival Gymkhana de Falardeau, accueil"
            }
          >
            <picture>
              <source type="image/avif" srcSet="/images/logo-96.avif 1x, /images/logo-192.avif 2x" />
              <img src="/images/logo-96.webp" width={36} height={36} alt="" />
            </picture>
            <span>
              Festival Gymkhana
              <br />
              de Falardeau
            </span>
          </SmartLink>
          <nav aria-label="Navigation principale" className="nav__links">
            {links.map((l) => (
              <SmartLink
                key={l.href}
                href={l.href}
                data-current={current === l.href || l.parentOf?.includes(page) || undefined}
              >
                {l.label}
              </SmartLink>
            ))}
            <SmartLink href={action.href} className="btn">
              {action.label}
            </SmartLink>
          </nav>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            popoverTarget="menu"
            popoverTargetAction="show"
            onClick={() => !hasPopover() && setOpen(true)}
          >
            Menu <List size={26} weight="bold" aria-hidden />
          </button>
        </div>
      </header>

      <div
        id="menu"
        ref={menuRef}
        className="menu"
        popover="auto"
        onToggle={(e) => setOpen((e.nativeEvent as ToggleEvent).newState === "open")}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="nav__bar">
          <span className="label">{festival.shortName}</span>
          <button
            type="button"
            className="nav__toggle"
            style={{ display: "inline-flex" }}
            popoverTarget="menu"
            popoverTargetAction="hide"
            onClick={() => !hasPopover() && setOpen(false)}
          >
            Fermer <X size={26} weight="bold" aria-hidden />
          </button>
        </div>
        <nav className="menu__links" aria-label="Menu mobile">
          {[...links, action].map((l, i) => (
            <SmartLink
              key={l.href}
              href={l.href}
              style={{ ["--i" as string]: i }}
              onClick={() => {
                followedLink.current = true;
                close();
              }}
            >
              {l.label}
            </SmartLink>
          ))}
        </nav>
        <div className="menu__foot">
          <span>{festival.edition.label}, entrée gratuite</span>
          <span>
            {festival.address.street}, {festival.address.city}
          </span>
          {/* Competitors mostly arrive on a phone: registration is one tap away
              (on the events page, the plaque's action already is). */}
          {page !== "epreuves" && (
            <Link href="/epreuves-gymkhana/#inscription" className="label menu__more" onClick={close}>
              S&apos;inscrire aux épreuves <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          )}
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
