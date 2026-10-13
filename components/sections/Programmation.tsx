"use client";

import { useEffect, useRef, useState } from "react";
import { MoonStars } from "@phosphor-icons/react";
import { programme, type Jour } from "@/content/programmation";
import { getGsap, whenIdle } from "@/lib/motion";
import { fr } from "@/lib/typo";

const HIGHLIGHT = "Grand Prix barils et sauvetage";

// The programme reads like a show bill. The section is sand by day; when the
// selected day reaches its evening events, the whole section turns to night.
export default function Programmation() {
  const jours = programme.jours as Jour[];
  const [active, setActive] = useState("samedi");
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const jour = jours.find((j) => j.id === active) ?? jours[0];
  const firstEvening = jour.evenements.findIndex((e) => e.soir);

  // Day to night, driven by the evening marker of the selected day.
  const mounted = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap, ScrollTrigger } = getGsap();
    const marker = section.querySelector("[data-evening]");
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const setup = () => {
      ctx = gsap.context(() => {
        const night = section.querySelector("[data-night]");
        gsap.set(night, { opacity: 0 });
        section.classList.remove("is-night");
        if (marker) {
          gsap.to(night, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: marker,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.5,
              onUpdate: (self) => section.classList.toggle("is-night", self.progress > 0.5),
            },
          });
        }
      }, section);
    };
    let cancel = () => {};
    if (mounted.current) {
      setup();
      ScrollTrigger.refresh();
    } else {
      mounted.current = true;
      cancel = whenIdle(setup);
    }
    return () => {
      cancel();
      ctx?.revert();
    };
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
      setActive(jours[next].id);
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
            <div className="prog__tabs" role="tablist" aria-label="Jours du festival">
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
                    onClick={() => setActive(j.id)}
                    onKeyDown={(e) => onKey(e, i)}
                  >
                    <span className="prog__tab-day">{j.nom}</span> <span className="prog__tab-num tabular">{num}</span>
                  </button>
                );
              })}
            </div>
            <p className="prog__note">
              {fr(programme.note)}
              <br />
              <strong>{programme.edition}</strong>, du 8 au 11 août.
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
