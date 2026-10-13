"use client";

import { useEffect } from "react";

// One observer for the whole page: elements marked [data-reveal] get
// `is-in` the first time they enter the viewport. Content is visible without
// JavaScript and under reduced motion (see sections.css).
export default function RevealRoot() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
