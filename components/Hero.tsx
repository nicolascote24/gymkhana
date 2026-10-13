import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import images from "@/content/images.json";
import Picture from "@/components/Picture";
import HeroMotion from "@/components/HeroMotion";
import { festival } from "@/content/festival";

const WORD = "GYMKHANA".split("");

export default function Hero() {
  const f = images["hero-rider"].frame;
  return (
    <div className="hero-pin" id="top">
      <section className="hero" aria-labelledby="hero-title" data-hero>
        <h1 id="hero-title" className="sr-only">
          {festival.name}
        </h1>

        {/* Back plate */}
        <div className="hero__layer" data-hero-stage>
          <div className="hero__frame">
            <Picture
              id="hero"
              priority
              alt="Une cavalière en plein virage autour d'un baril, dans la poussière, au coucher du soleil."
              sizes="(max-aspect-ratio: 3/4) 180svh, max(100vw, 180svh)"
            />
          </div>
        </div>

        <div className="hero__shade hero__shade--low" />

        {/* The name, between the plate and the cut-out */}
        <div className="hero__word" aria-hidden data-hero-word>
          {WORD.map((c, i) => (
            <span key={i} data-hero-letter>
              {c}
            </span>
          ))}
        </div>

        {/* Front plate: rider, horse and barrel, aligned on the same frame */}
        <div className="hero__layer" data-hero-stage aria-hidden>
          <div className="hero__frame">
            <div
              className="hero__rider"
              style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, height: `${f.h}%` }}
            >
              <Picture id="hero-rider" alt="" priority sizes="(max-aspect-ratio: 3/4) 49svh, max(27vw, 49svh)" />
            </div>
          </div>
        </div>

        <div className="hero__shade hero__shade--high" />
        <canvas className="hero__dust" data-hero-dust aria-hidden />
        <div className="hero__veil" data-hero-veil />

        <div className="hero__content">
          <div className="hero__lead">
            <div className="hero__when" data-hero-in data-hero-fade>
              <p className="hero__date">{festival.edition.label}</p>
              <p className="hero__meta">
                {festival.days} jours de festival <span aria-hidden>/</span> Entrée gratuite
              </p>
            </div>
            <a href="#programmation" className="btn hero__cta" data-hero-in data-hero-fade>
              Voir la programmation <ArrowDownRight size={18} weight="bold" aria-hidden />
            </a>
          </div>

          <p className="hero__festival" aria-hidden data-hero-in>
            Festival
          </p>
          <p className="hero__place" aria-hidden data-hero-in>
            de Saint-David-de-Falardeau
          </p>
        </div>
      </section>
      <HeroMotion />
    </div>
  );
}
