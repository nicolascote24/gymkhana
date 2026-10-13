"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Motion tokens shared by every animation on the page.
export const ease = {
  out: "expo.out", // entrances: fast start, long settle
  outSoft: "power3.out",
  inOut: "power2.inOut", // scrubbed and state transitions
};

export const dur = {
  micro: 0.18,
  reveal: 0.9,
  hero: 1.6,
};
