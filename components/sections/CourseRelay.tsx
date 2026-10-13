"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// The event cards run as a relay: one course at a time redraws, a red dot
// (the horse) travelling its line, then hands over to the next card. Every
// course stays fully drawn at rest, so nothing depends on the animation.
// The loop runs only while the cards are on screen and the tab is visible;
// pointing at a card hands the relay to it straight away.
const DRAW = 1700; // ms to run one course
const HOLD = 650; // ms before the next card takes over

// Same curve as --ease-in-out-strong: a run starts and finishes deliberately.
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CourseRelay() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-relay]");
    if (!root || prefersReducedMotion()) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-relay-card]")];
    const runs = cards.map((card) => {
      const path = card.querySelector<SVGPathElement>(".course__path")!;
      const dot = card.querySelector<SVGCircleElement>(".course__rider")!;
      return { card, path, dot, length: path.getTotalLength() };
    });
    if (!runs.length) return;

    let index = 0;
    let startedAt = 0;
    let raf = 0;
    let onScreen = false;

    const place = (i: number, p: number) => {
      const r = runs[i];
      r.path.style.strokeDashoffset = String(1 - p);
      const pt = r.path.getPointAtLength(r.length * p);
      r.dot.setAttribute("cx", pt.x.toFixed(2));
      r.dot.setAttribute("cy", pt.y.toFixed(2));
    };
    const rest = (i: number) => {
      const r = runs[i];
      r.card.removeAttribute("data-running");
      r.path.style.strokeDashoffset = "0";
    };
    const begin = (i: number, now: number) => {
      rest(index);
      index = i;
      startedAt = now;
      runs[i].card.setAttribute("data-running", "");
      place(i, 0);
    };

    const frame = (now: number) => {
      const t = now - startedAt;
      if (t <= DRAW) place(index, easeInOut(t / DRAW));
      else if (t > DRAW + HOLD) begin((index + 1) % runs.length, now);
      else place(index, 1);
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (raf || !onScreen || document.hidden) return;
      begin(index, performance.now());
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      rest(index);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) play();
        else pause();
      },
      { threshold: 0.2 },
    );
    io.observe(root);
    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    const handovers = runs.map((r, i) => {
      const take = () => {
        if (raf && i !== index) begin(i, performance.now());
      };
      r.card.addEventListener("pointerenter", take);
      return () => r.card.removeEventListener("pointerenter", take);
    });

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      handovers.forEach((off) => off());
    };
  }, []);
  return null;
}
