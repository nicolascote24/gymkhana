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
      const target = clipped && el.parentElement ? el.parentElement : el;
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
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    groups.forEach((_, target) => io.observe(target));
    return () => io.disconnect();
  }, []);
  return null;
}
