"use client";

import { useEffect } from "react";
import { getGsap, prefersReducedMotion, whenIdle } from "@/lib/motion";

// The page's two scroll behaviours.
// 1. Day to night: the evening part of the page ([data-soir]: the tour games,
//    the Grand Prix, the rule book) is night. Arriving from the day part, it
//    stays sand until the tour games reach the upper part of the screen, then
//    turns to night in one short move (and back when scrolling up), like the
//    programme on the home page. Without script or under reduced motion it is
//    simply night.
// 2. Where am I: the chapter bar (phones) and each family's index mark the
//    chapter and the event on screen.
export default function EpreuvesMotion() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const soir = document.querySelector<HTMLElement>("[data-soir]");
    const night = soir?.querySelector<HTMLElement>("[data-soir-night]");
    let ctx: ReturnType<typeof gsap.context> | undefined;

    const cancel = whenIdle(() => {
      ctx = gsap.context(() => {
        if (soir && night && !prefersReducedMotion()) {
          const turn = (on: boolean, now = false) => {
            soir.classList.toggle("is-day", !on);
            gsap.to(night, { opacity: on ? 1 : 0, duration: now ? 0 : 0.7, ease: "power2.inOut", overwrite: true });
          };
          ScrollTrigger.create({
            trigger: soir,
            start: "top 45%",
            onEnter: () => turn(true),
            onLeaveBack: () => turn(false),
            onRefresh: (self) => turn(self.scroll() > self.start, true),
          });
        }

        // Chapters: the link of the one on screen is marked.
        const chapLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-chap] a")];
        chapLinks.forEach((a) => {
          const target = document.querySelector(a.hash);
          if (!target) return;
          ScrollTrigger.create({
            trigger: target,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
              if (self.isActive) chapLinks.forEach((l) => l.toggleAttribute("aria-current", l === a));
              else if (a.hasAttribute("aria-current")) a.removeAttribute("aria-current");
            },
          });
        });

        // Each family's index: the event on screen.
        document.querySelectorAll<HTMLElement>("[data-fam-index]").forEach((index) => {
          const links = [...index.querySelectorAll<HTMLAnchorElement>("a")];
          links.forEach((a) => {
            const target = document.querySelector(a.hash);
            if (!target) return;
            ScrollTrigger.create({
              trigger: target,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => a.toggleAttribute("data-current", self.isActive),
            });
          });
        });
      });
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);
  return null;
}
