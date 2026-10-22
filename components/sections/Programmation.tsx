"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoonStars } from "@phosphor-icons/react";
import { programme, type Jour } from "@/content/programmation";
import { festival } from "@/content/festival";
import { withGsap, scrollToY, whenIdle } from "@/lib/motion";
import { fr } from "@/lib/typo";

const HIGHLIGHT = "Grand Prix barils et sauvetage";

// The programme reads like a show bill. The section is sand by day; when the
// selected day reaches its evening events, the whole section turns to night.
// Each day has its own address (#jour-samedi) so it can be shared or bookmarked.
export default function Programmation() {
  const jours = programme.jours as Jour[];
  const [active, setActive] = useState("samedi");
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  // Set when the reader switches day from below the top of the list.
  const keepPlace = useRef(false);
  const jour = jours.find((j) => j.id === active) ?? jours[0];
  const firstEvening = jour.evenements.findIndex((e) => e.soir);

  // #jour-samedi opens that day and brings its list into view. The address
  // matches no element, so the browser leaves the scrolling to us.
  useEffect(() => {
    const fromHash = (jump: boolean) => {
      const id = window.location.hash.match(/^#jour-([a-z]+)$/)?.[1];
      if (!id || !jours.some((j) => j.id === id)) return;
      setActive(id);
      requestAnimationFrame(() => {
        const grid = sectionRef.current?.querySelector(".prog__grid");
        const nav = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
        if (grid) scrollToY(grid.getBoundingClientRect().top + window.scrollY - nav - 24, jump);
      });
    };
    fromHash(true);
    const onHash = () => fromHash(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [jours]);

  const select = (id: string) => {
    if (id === active) return;
    const panel = document.getElementById("prog-panel");
    keepPlace.current = !!panel && panel.getBoundingClientRect().top < stickyOffset();
    window.history.replaceState(null, "", `#jour-${id}`);
    setActive(id);
  };

  // Day to night, driven by the evening marker of the selected day.
  const mounted = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return withGsap(({ gsap, ScrollTrigger }) => {
      const marker = section.querySelector("[data-evening]");
      let ctx: ReturnType<typeof gsap.context> | undefined;
      const setup = () => {
        ctx = gsap.context(() => {
          const night = section.querySelector("[data-night]");
          gsap.set(night, { opacity: 0 });
          section.classList.remove("is-night");
          // A switch, not a scrub: the evening marker must reach the upper
          // third of the screen, then day turns to night in one short move, so
          // a reader who stops scrolling is never left between the two.
          if (marker) {
            const turn = (on: boolean) => {
              section.classList.toggle("is-night", on);
              gsap.to(night, { opacity: on ? 1 : 0, duration: 0.7, ease: "power2.inOut", overwrite: true });
            };
            ScrollTrigger.create({
              trigger: marker,
              start: "top 35%",
              onEnter: () => turn(true),
              onLeaveBack: () => turn(false),
              onRefresh: (self) => {
                const on = self.progress > 0 || self.scroll() > self.start;
                section.classList.toggle("is-night", on);
                gsap.set(night, { opacity: on ? 1 : 0 });
              },
            });
          }
        }, section);
      };
      let cancel = () => {};
      if (mounted.current) {
        setup();
        ScrollTrigger.refresh();
        // A shorter or longer day must not leave the reader outside the list.
        if (keepPlace.current) {
          keepPlace.current = false;
          const panel = document.getElementById("prog-panel");
          if (panel) scrollToY(panel.getBoundingClientRect().top + window.scrollY - stickyOffset());
        }
      } else {
        mounted.current = true;
        cancel = whenIdle(setup);
      }
      return () => {
        cancel();
        ctx?.revert();
      };
    });
  }, [active]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = jours.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      select(jours[next].id);
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <section id="programmation" className="prog" ref={sectionRef} aria-labelledby="prog-title">
      <div className="prog__night" data-night aria-hidden />
      <div className="wrap">
        <h2 id="prog-title" className="prog__title" data-reveal="title">
          Programmation
        </h2>

        <div className="prog__grid">
          <div className="prog__side">
            <p className="prog__edition">
              <span className="prog__tag">Aperçu</span>
              {programme.edition}, {fr(programme.dates)}
            </p>
            <div className="prog__tabs" role="tablist" aria-label="Jours de l'édition 2024">
              {jours.map((j, i) => {
                const [num] = j.date.split(" ");
                return (
                  <button
                    key={j.id}
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${j.id}`}
                    aria-selected={j.id === active}
                    aria-controls="prog-panel"
                    tabIndex={j.id === active ? 0 : -1}
                    className="prog__tab"
                    onClick={() => select(j.id)}
                    onKeyDown={(e) => onKey(e, i)}
                  >
                    <span className="prog__tab-day">{j.nom}</span> <span className="prog__tab-num tabular">{num}</span>
                  </button>
                );
              })}
            </div>
            <p className="prog__note">
              {fr(programme.note)}{" "}
              <a href={festival.contact.facebook} target="_blank" rel="noopener noreferrer" className="prog__follow">
                Suivre la page <ArrowUpRight size={14} weight="bold" aria-hidden />
              </a>
            </p>
          </div>

          <div id="prog-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className="prog__panel">
            <ol className="prog__list" key={active}>
              {jour.evenements.map((e, i) => {
                const hl = e.titre === HIGHLIGHT;
                return (
                  <li key={`${e.heure}-${e.titre}`} className="prog__item" style={{ ["--i" as string]: i }}>
                    {i === firstEvening && (
                      <div className="prog__evening" data-evening aria-hidden>
                        <MoonStars size={22} weight="regular" />
                        <span>En soirée</span>
                      </div>
                    )}
                    <div className={hl ? "prog__row prog__row--hl" : "prog__row"}>
                      <p className="prog__time tabular">
                        {e.heure}
                        {e.fin && <span className="prog__end"> à {e.fin}</span>}
                      </p>
                      <div className="prog__what">
                        <h3 className="prog__name">{fr(e.titre)}</h3>
                        {hl && <span className="prog__flag">Moment fort</span>}
                        {e.detail && <p className="prog__detail">{fr(e.detail)}</p>}
                      </div>
                      <p className="prog__where">{e.lieu}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// Height of what stays pinned above the list: the menu bar, plus the day
// tabs on narrow screens where they stick under it.
function stickyOffset() {
  const nav = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
  const side = window.matchMedia("(max-width: 1023px)").matches
    ? (document.querySelector<HTMLElement>(".prog__side")?.offsetHeight ?? 0)
    : 0;
  return nav + side + 12;
}
