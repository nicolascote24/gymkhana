import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import images from "@/content/images.json";
import Picture from "@/components/Picture";
import HeroMotion from "@/components/HeroMotion";
import { festival } from "@/content/festival";

const WORD = "GYMKHANA".split("");

// Living hero. Four depth planes share one frame: the background (rider
// removed), the name, the rider cut-out, and the dust. Each plane has an
// outer wrapper driven by scroll and an inner one driven by the pointer,
// the idle drift and the entrance, so no two animations fight over a property.
const PORTRAIT = "(max-aspect-ratio: 3/4)";

export default function Hero() {
  const f = images["hero-rider"].frame;
  const plate = images["hero-clean"];
  const tall = images["hero-clean-portrait"];
  const r = tall.region;
  // The rider box, in percent of the plate it sits on: the full plate, or the
  // portrait crop (same height, narrower band).
  const geometry = {
    "--rx": `${f.x}%`,
    "--ry": `${f.y}%`,
    "--rw": `${f.w}%`,
    "--rh": `${f.h}%`,
    "--rx-p": `${(((f.x / 100) * r.plateWidth - r.left) / r.width) * 100}%`,
    "--rw-p": `${(((f.w / 100) * r.plateWidth) / r.width) * 100}%`,
    "--ratio-p": r.width / r.height,
  } as React.CSSProperties;
  const set = (list: { src: string; w: number }[]) => list.map((x) => `${x.src} ${x.w}w`).join(", ");
  return (
    <div className="hero-pin" id="top">
      <section className="hero" aria-labelledby="hero-title" data-hero style={geometry}>
        <h1 id="hero-title" className="sr-only">
          {festival.name}
        </h1>

        <div className="hero__layer" data-scroll="bg">
          <div className="hero__depth" data-depth="bg">
            <div
              className="hero__frame hero__frame--bg"
              style={{
                ["--ph" as string]: `url(${plate.placeholder})`,
                ["--ph-p" as string]: `url(${tall.placeholder})`,
              }}
            >
              {/* Portrait screens get the narrow crop; the frame geometry switches with it. */}
              <picture>
                <source media={PORTRAIT} type="image/avif" srcSet={set(tall.sources.avif)} sizes="93vh" />
                <source media={PORTRAIT} type="image/webp" srcSet={set(tall.sources.webp)} sizes="93vh" />
                <source type="image/avif" srcSet={set(plate.sources.avif)} sizes="max(120vw, 215vh)" />
                <source type="image/webp" srcSet={set(plate.sources.webp)} sizes="max(120vw, 215vh)" />
                <img
                  src={plate.fallback}
                  alt="Une cavalière en plein virage autour d'un baril, dans la poussière, au coucher du soleil."
                  width={plate.width}
                  height={plate.height}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="hero__sun" aria-hidden />
        <div className="hero__shade hero__shade--low" aria-hidden />

        <div className="hero__word" aria-hidden data-scroll="word">
          <div className="hero__word-inner" data-depth="word">
            {WORD.map((c, i) => (
              <span key={i} data-hero-letter>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__layer" data-scroll="rider" aria-hidden>
          <div className="hero__depth" data-depth="rider">
            <div className="hero__frame">
              <div className="hero__rider">
                <Picture id="hero-rider" alt="" priority sizes="(max-aspect-ratio: 3/4) 56vh, max(33vw, 58vh)" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero__shade hero__shade--high" aria-hidden />
        <div className="hero__layer hero__layer--dust" aria-hidden>
          <canvas className="hero__dust" data-depth="dust" data-hero-dust />
        </div>
        <div className="hero__veil" data-hero-veil aria-hidden />

        <div className="hero__content">
          <div className="hero__lead" data-scroll="lead">
            <div className="hero__lead-inner">
              <div className="hero__when" data-hero-in>
                <p className="hero__date">{festival.edition.label}</p>
                <p className="hero__days">
                  {festival.days} jours{festival.edition.datesKnown ? "" : ", dates à venir"}
                </p>
                <p className="hero__badge">Entrée gratuite</p>
              </div>
              <p className="hero__pitch" data-hero-in>
                Compétition équestre, musique country et plaisirs en famille, au cœur du Saguenay.
              </p>
              <a href="#programmation" className="btn hero__cta" data-hero-in>
                Voir la programmation <ArrowDownRight size={18} weight="bold" aria-hidden />
              </a>
            </div>
          </div>

          <div className="hero__names" data-scroll="name" aria-hidden>
            <p className="hero__festival" data-hero-in>
              Festival
            </p>
            <p className="hero__place" data-hero-in>
              de Saint-David-de-Falardeau
            </p>
          </div>
        </div>
      </section>
      <HeroMotion />
    </div>
  );
}
