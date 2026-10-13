"use client";

import { useEffect } from "react";
import { getGsap, prefersReducedMotion, ease } from "@/lib/motion";

// Hero choreography:
// 1. on load, the plate settles, the letters run in from condensed to wide
//    (the start of a run), then the name and the pitch come in;
// 2. on scroll, the hero stays pinned while the next section slides over it:
//    the plates drift, the word rises behind the rider, the veil darkens;
// 3. ambient dust drifts in the light while the hero is visible.
export default function HeroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-hero]");
    if (!root) return;
    const html = document.documentElement;
    const reduce = prefersReducedMotion();
    if (reduce) {
      html.classList.remove("hero-pending");
      return;
    }

    const { gsap } = getGsap();
    const stages = root.querySelectorAll("[data-hero-stage]");
    const letters = root.querySelectorAll<HTMLElement>("[data-hero-letter]");
    const word = root.querySelector("[data-hero-word]");
    const ins = document.querySelectorAll("[data-hero-in]");
    const fades = root.querySelectorAll("[data-hero-fade]");
    const veil = root.querySelector("[data-hero-veil]");
    const target = parseFloat(getComputedStyle(root).getPropertyValue("--wdth")) || 125;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.set(ins, { opacity: 0 });
      html.classList.remove("hero-pending");
      const tl = gsap.timeline({ defaults: { ease: ease.out } });
      tl.fromTo(stages, { scale: 1.12 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo(
          letters,
          { "--wdth": 62, xPercent: -40, opacity: 0 },
          { "--wdth": target, xPercent: 0, opacity: 1, duration: 1.15, stagger: 0.055 },
          0.15,
        )
        .to(ins, { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" }, 0.75)
        .fromTo(fades, { y: 24 }, { y: 0, duration: 1, stagger: 0.1 }, 0.75)
        .add(() => {
          letters.forEach((l) => l.style.removeProperty("--wdth"));
        });

      // Scroll: pinned hero, next section slides over it.
      const scroll = {
        trigger: root.parentElement,
        start: "top top",
        end: () => `+=${root.offsetHeight}`,
        scrub: 0.6,
      };
      gsap.to(stages, { yPercent: 7, scale: 1.05, ease: "none", scrollTrigger: scroll });
      gsap.to(word, { yPercent: -95, ease: "none", scrollTrigger: scroll });
      gsap.to(fades, { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: () => `+=${root.offsetHeight * 0.55}` } });
      gsap.to(veil, { opacity: 0.65, ease: "none", scrollTrigger: scroll });
    }, root);

    // Ambient dust
    const stopDust = startDust(root);

    return () => {
      ctx.revert();
      stopDust();
    };
  }, []);

  return null;
}

function startDust(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>("[data-hero-dust]");
  const c = canvas?.getContext("2d");
  if (!canvas || !c) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let w = 0;
  let h = 0;
  const count = window.innerWidth < 768 ? 18 : 34;
  type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number };
  let ps: P[] = [];
  const seed = () => {
    ps = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: h * (0.55 + Math.random() * 0.45),
      r: 0.5 + Math.random() * 1.1,
      vx: -(0.06 + Math.random() * 0.22),
      vy: -(0.02 + Math.random() * 0.08),
      a: 0.08 + Math.random() * 0.22,
      t: Math.random() * Math.PI * 2,
    }));
  };
  const resize = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  };
  resize();
  let raf = 0;
  let running = false;
  const draw = () => {
    c.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.t += 0.01;
      p.x += p.vx + Math.sin(p.t) * 0.08;
      p.y += p.vy;
      if (p.x < -4) p.x = w + 4;
      if (p.y < h * 0.5) p.y = h + 4;
      c.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 1.7));
      c.fillStyle = "#f3dfb6";
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      c.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  const play = () => {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(draw);
    }
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  // Run only while the hero is actually visible (it stays pinned under the next section).
  const { ScrollTrigger } = getGsap();
  let visible = true;
  const st = ScrollTrigger.create({
    trigger: root.parentElement,
    start: "top top",
    end: () => `+=${root.offsetHeight}`,
    onToggle: (self) => {
      visible = self.isActive || self.progress === 0;
      if (visible && !document.hidden) play();
      else pause();
    },
  });
  if (window.scrollY < root.offsetHeight) play();
  const onVis = () => (document.hidden || !visible ? pause() : play());
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  return () => {
    pause();
    st.kill();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
  };
}
