"use client";

import { useEffect } from "react";

// One observer for the whole page: elements marked [data-reveal] get `is-in`
// the first time they enter the viewport. Content is visible without
// JavaScript and under reduced motion (see sections.css).
//
// Titles and images start fully clipped (clip-path), and Chromium counts the
// target's own clip-path when computing intersection, so a fully clipped
// element never "enters". Those are observed through their parent instead.
export default function RevealRoot() {
  useEffect(() => {
    const groups = new Map<Element, HTMLElement[]>();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const clipped = el.dataset.reveal === "title" || el.dataset.reveal === "image";
      // A parent laid out with display: contents has no box and never
      // intersects: watch the first ancestor that has one.
      let target: HTMLElement = el;
      if (clipped) {
        let p = el.parentElement;
        while (p && getComputedStyle(p).display === "contents") p = p.parentElement;
        if (p) target = p;
      }
      const list = groups.get(target) ?? [];
      list.push(el);
      groups.set(target, list);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          groups.get(e.target)?.forEach((el) => el.classList.add("is-in"));
          io.unobserve(e.target);
        }
      },
      // Phones: a fast flick must never land on blank space, so elements
      // start revealing a little before they reach the screen.
      { rootMargin: window.matchMedia("(max-width: 767px)").matches ? "0px 0px 12% 0px" : "0px 0px -6% 0px", threshold: 0 },
    );
    groups.forEach((_, target) => io.observe(target));
    return () => io.disconnect();
  }, []);
  return null;
}
