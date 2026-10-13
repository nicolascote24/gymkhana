import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import images from "@/content/images.json";
import Picture from "@/components/Picture";
import HeroMotion from "@/components/HeroMotion";
import { festival } from "@/content/festival";

const WORD = "GYMKHANA".split("");

// Living hero. Four depth planes share one frame: the background (rider
// removed), the rider cut-out, the name, and the dust. Each plane has an
// outer wrapper driven by scroll and an inner one driven by the pointer,
// the idle drift and the entrance, so no two animations fight over a property.
export default function Hero() {
  const f = images["hero-rider"].frame;
  const riderBox = { left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, height: `${f.h}%` };
  return (
    <div className="hero-pin" id="top">
      <section className="hero" aria-labelledby="hero-title" data-hero>
        <h1 id="hero-title" className="sr-only">
          {festival.name}
        </h1>

        <div className="hero__layer" data-scroll="bg">
          <div className="hero__depth" data-depth="bg">
            <div className="hero__frame">
              <Picture
                id="hero-clean"
                priority
                alt="Une cavalière en plein virage autour d'un baril, dans la poussière, au coucher du soleil."
                sizes="(max-aspect-ratio: 3/4) 210svh, max(120vw, 215svh)"
              />
            </div>
          </div>
        </div>

        <div className="hero__sun" aria-hidden />
        <div className="hero__shade hero__shade--low" aria-hidden />

        <div className="hero__layer" data-scroll="rider" aria-hidden>
          <div className="hero__depth" data-depth="rider">
            <div className="hero__frame">
              <div className="hero__rider" style={riderBox}>
                <Picture id="hero-rider" alt="" priority sizes="(max-aspect-ratio: 3/4) 57svh, max(33vw, 58svh)" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero__word" aria-hidden data-scroll="word">
          <div className="hero__word-inner" data-depth="word">
            {WORD.map((c, i) => (
              <span key={i} data-hero-letter>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__shade hero__shade--high" aria-hidden />
        <div className="hero__layer hero__layer--dust" aria-hidden>
          <canvas className="hero__dust" data-depth="dust" data-hero-dust />
        </div>
        <div className="hero__veil" data-hero-veil aria-hidden />

        <div className="hero__content">
          <div className="hero__lead" data-scroll="lead">
            <div className="hero__when" data-hero-in>
              <p className="hero__date">{festival.edition.label}</p>
              <p className="hero__meta">
                {festival.days} jours de festival <span aria-hidden>/</span> Entrée gratuite
              </p>
            </div>
            <a href="#programmation" className="btn hero__cta" data-hero-in>
              Voir la programmation <ArrowDownRight size={18} weight="bold" aria-hidden />
            </a>
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
