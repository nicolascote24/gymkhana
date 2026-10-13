"use client";

import { useEffect, useState } from "react";
import { CalendarBlank, NavigationArrow } from "@phosphor-icons/react";
import { getGsap } from "@/lib/motion";
import { mapsUrl } from "@/content/festival";

// Phones only (see .quickbar): one shortcut for the thumb, shown once the hero
// is covered and hidden while the programme or the footer is visible. It
// leads to the programme, except in the visit section where the route is
// what the visitor needs next.
export default function QuickBar() {
  const [show, setShow] = useState(false);
  const [route, setRoute] = useState(false);
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const prog = document.getElementById("programmation");
    const visit = document.getElementById("visite");
    const foot = document.querySelector("footer.foot");
    let pastHero = false;
    let inProg = false;
    let inFoot = false;
    const sync = () => setShow(pastHero && !inProg && !inFoot);
    const triggers = [
      ScrollTrigger.create({
        start: () => (hero ? hero.offsetHeight : window.innerHeight),
        end: "max",
        onToggle: (s) => ((pastHero = s.isActive), sync()),
      }),
      prog &&
        ScrollTrigger.create({
          trigger: prog,
          start: "top bottom",
          end: "bottom top",
          onToggle: (s) => ((inProg = s.isActive), sync()),
        }),
      visit &&
        ScrollTrigger.create({
          trigger: visit,
          start: "top 60%",
          end: "bottom 40%",
          refreshPriority: -1,
          onToggle: (s) => setRoute(s.isActive),
        }),
      foot &&
        ScrollTrigger.create({
          trigger: foot,
          start: "top bottom",
          refreshPriority: -1,
          onToggle: (s) => ((inFoot = s.isActive), sync()),
        }),
    ];
    return () => triggers.forEach((t) => t && t.kill());
  }, []);
  return (
    <div className="quickbar" data-show={show} aria-hidden={!show}>
      {route ? (
        <a href={mapsUrl} className="btn" target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1}>
          <NavigationArrow size={18} weight="bold" aria-hidden /> Itinéraire vers le site
        </a>
      ) : (
        <a href="#programmation" className="btn" tabIndex={show ? 0 : -1}>
          <CalendarBlank size={18} weight="bold" aria-hidden /> Voir la programmation
        </a>
      )}
    </div>
  );
}
