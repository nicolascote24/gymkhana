"use client";

import { useEffect, useState } from "react";
import { CalendarBlank } from "@phosphor-icons/react";
import { getGsap } from "@/lib/motion";

// Phones only (see .quickbar): a single shortcut to the programme, shown once
// the hero is covered and hidden while the programme or the footer is visible.
export default function QuickBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const prog = document.getElementById("programmation");
    const foot = document.querySelector("footer");
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
      foot &&
        ScrollTrigger.create({
          trigger: foot,
          start: "top bottom",
          onToggle: (s) => ((inFoot = s.isActive), sync()),
        }),
    ];
    return () => triggers.forEach((t) => t && t.kill());
  }, []);
  return (
    <div className="quickbar" data-show={show} aria-hidden={!show}>
      <a href="#programmation" className="btn" tabIndex={show ? 0 : -1}>
        <CalendarBlank size={18} weight="bold" aria-hidden /> Voir la programmation
      </a>
    </div>
  );
}
