"use client";

import { useEffect } from "react";
import { getGsap, prefersReducedMotion, ease } from "@/lib/motion";

// Hero choreography (first-visit moment, so it may take its time):
// 1. entrance: a dolly-in where each depth plane settles at its own pace
//    (the rider travels further than the background), the letters run in
//    from condensed to wide, then the name lines, date and action arrive;
// 2. living photo: planes follow the pointer at their own depth, and drift
//    slowly on their own when nobody moves, so the still image breathes;
// 3. scroll: the hero stays pinned while the next section slides over it,
//    the word sinks behind the rider and the veil darkens.
const DEPTH = { bg: 9, word: 16, rider: 26, dust: 38 }; // px at full deflection

export default function HeroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-hero]");
    if (!root) return;
    const html = document.documentElement;
    if (prefersReducedMotion()) {
      html.classList.remove("hero-pending");
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const q = (s: string) => root.querySelector<HTMLElement>(s);
    const qa = (s: string) => root.querySelectorAll<HTMLElement>(s);
    const planes = {
      bg: q('[data-depth="bg"]'),
      word: q('[data-depth="word"]'),
      rider: q('[data-depth="rider"]'),
      dust: q('[data-depth="dust"]'),
    };
    const letters = qa("[data-hero-letter]");
    const ins = document.querySelectorAll("[data-hero-in]");
    const target = parseFloat(getComputedStyle(root).getPropertyValue("--wdth")) || 125;

    const ctx = gsap.context(() => {
      // 1. Entrance
      gsap.set(ins, { opacity: 0 });
      html.classList.remove("hero-pending");
      const tl = gsap.timeline({ defaults: { ease: ease.out } });
      tl.fromTo(planes.bg, { scale: 1.16 }, { scale: 1, duration: 2.6 }, 0)
        .fromTo(planes.rider, { scale: 1.3, yPercent: 4 }, { scale: 1, yPercent: 0, duration: 2.4 }, 0)
        .fromTo(planes.dust, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power1.out" }, 0.6)
        .fromTo(
          letters,
          { "--wdth": 62, xPercent: -40, opacity: 0 },
          { "--wdth": target, xPercent: 0, opacity: 1, duration: 1.15, stagger: 0.055 },
          0.3,
        )
        .fromTo(ins, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.95)
        .add(() => letters.forEach((l) => l.style.removeProperty("--wdth")));

      // 3. Scroll: pinned hero, the next section slides over it.
      const scroll = {
        trigger: root.parentElement,
        start: "top top",
        end: () => `+=${root.offsetHeight}`,
        scrub: 0.6,
      };
      gsap.to(qa('[data-scroll="bg"], [data-scroll="rider"]'), { yPercent: 6, ease: "none", scrollTrigger: scroll });
      gsap.to(q('[data-scroll="word"]'), { yPercent: -110, ease: "none", scrollTrigger: scroll });
      // autoAlpha: once faded out, the action is hidden from pointer and keyboard too.
      gsap.to(qa('[data-scroll="lead"], [data-scroll="name"]'), {
        yPercent: -30,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { ...scroll, end: () => `+=${root.offsetHeight * 0.5}` },
      });
      gsap.to(q("[data-hero-veil]"), { opacity: 0.7, ease: "none", scrollTrigger: scroll });
    }, root);

    // 2. Living photo: pointer + idle drift, smoothed with quickTo.
    const movers = (Object.keys(DEPTH) as (keyof typeof DEPTH)[])
      .filter((k) => planes[k])
      .map((k) => ({
        depth: DEPTH[k],
        x: gsap.quickTo(planes[k]!, "x", { duration: 1.4, ease: "power3.out" }),
        y: gsap.quickTo(planes[k]!, "y", { duration: 1.4, ease: "power3.out" }),
      }));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: 0, y: 0, active: 0 };
    let lastMove = -1e9;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      lastMove = performance.now();
    };
    if (finePointer) root.addEventListener("pointermove", onMove);

    let visible = true;
    const tick = (time: number) => {
      if (!visible) return;
      // Pointer weight eases out after 2.5 s without movement, handing back to the drift.
      const since = performance.now() - lastMove;
      const want = finePointer && since < 2500 ? 1 : 0;
      pointer.active += (want - pointer.active) * 0.04;
      const ix = Math.sin((time / 13) * Math.PI * 2) * 0.45 + Math.sin((time / 5.3) * Math.PI * 2) * 0.08;
      const iy = Math.sin((time / 9.7) * Math.PI * 2) * 0.3;
      const nx = pointer.x * pointer.active + ix * (1 - pointer.active * 0.6);
      const ny = pointer.y * pointer.active + iy * (1 - pointer.active * 0.6);
      for (const m of movers) {
        m.x(-nx * m.depth);
        m.y(-ny * m.depth * 0.6);
      }
    };
    gsap.ticker.add(tick);

    const dust = startDust(root);
    const st = ScrollTrigger.create({
      trigger: root.parentElement,
      start: "top top",
      end: () => `+=${root.offsetHeight}`,
      onToggle: (self) => {
        visible = self.isActive || self.progress === 0;
        dust.toggle(visible);
      },
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      root.removeEventListener("pointermove", onMove);
      st.kill();
      dust.stop();
    };
  }, []);

  return null;
}

function startDust(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>("[data-hero-dust]");
  const c = canvas?.getContext("2d");
  const noop = { stop: () => {}, toggle: (_on: boolean) => {} };
  if (!canvas || !c) return noop;
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
  let wanted = true;
  // Dust takes the palette's pale sand, read once from the tokens.
  const dustColor = getComputedStyle(root).getPropertyValue("--color-sable-clair").trim() || "#efdfc0";
  const draw = () => {
    c.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.t += 0.01;
      p.x += p.vx + Math.sin(p.t) * 0.08;
      p.y += p.vy;
      if (p.x < -4) p.x = w + 4;
      if (p.y < h * 0.5) p.y = h + 4;
      c.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 1.7));
      c.fillStyle = dustColor;
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      c.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  const play = () => {
    if (!running && wanted && !document.hidden) {
      running = true;
      raf = requestAnimationFrame(draw);
    }
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  play();
  return {
    toggle: (on: boolean) => {
      wanted = on;
      if (on) play();
      else pause();
    },
    stop: () => {
      pause();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    },
  };
}
