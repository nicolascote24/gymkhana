import Picture from "@/components/Picture";
import GymkhanaScene from "@/components/sections/GymkhanaScene";
import { epreuves, definition, sanction, type Epreuve } from "@/content/epreuves";
import { fr } from "@/lib/typo";
import { keepPlaces } from "@/lib/places";

const STEPS = [
  { title: "Le départ", text: "Le cheval franchit la ligne au galop : le chronomètre démarre." },
  { title: "Le trèfle", text: "Trois barils à contourner en trèfle, au plus près, sans les renverser." },
  { title: "Le retour", text: "Un sprint jusqu'à la ligne. Ici, chaque centième compte." },
];

function Course({ e }: { e: Epreuve }) {
  return (
    <svg viewBox="0 0 100 100" className="course" aria-hidden>
      <path className="course__path" d={e.trace} pathLength={1} />
      {e.marks.map((m, i) =>
        m.kind === "cercle" ? (
          <circle key={i} cx={m.x} cy={m.y} r={11} className="course__ring" />
        ) : m.kind === "relais" ? (
          <g key={i} className="course__mark">
            <rect x={m.x - 7} y={m.y - 6} width={14} height={3} />
            <rect x={m.x - 7} y={m.y + 3} width={14} height={3} />
          </g>
        ) : m.kind === "fleche" ? (
          <path
            key={i}
            d={`M${m.x - 6} ${m.y} L${m.x + 3} ${m.y - 5.5} L${m.x + 3} ${m.y + 5.5} Z`}
            className="course__mark"
          />
        ) : m.kind === "piquet" ? (
          <rect key={i} x={m.x - 1.5} y={m.y - 4} width={3} height={8} className="course__mark" />
        ) : (
          <circle key={i} cx={m.x} cy={m.y} r={m.kind === "drapeau" ? 3 : 4.5} className="course__mark" />
        ),
      )}
    </svg>
  );
}

export default function Gymkhana() {
  const centre = epreuves.filter((e) => e.famille === "centre");
  const tour = epreuves.filter((e) => e.famille === "tour");
  return (
    <section id="gymkhana" className="gym on-night" aria-labelledby="gym-title">
      <GymkhanaScene steps={STEPS.map((s) => ({ title: s.title, text: fr(s.text) }))} definition={fr(definition)} />

      <div className="wrap gym__events">
        <h3 className="gym__events-title" data-reveal="title">
          Les épreuves
        </h3>
        <div className="gym__families">
          {[
            { name: "Jeux de centre", list: centre },
            { name: "Jeux de tour", list: tour },
          ].map((fam) => (
            <div key={fam.name} className="gym__family">
              <p className="gym__family-name" data-reveal>
                {fam.name}
              </p>
              <ul className="gym__cards">
                {fam.list.map((e, i) => (
                  <li key={e.id} className="gym__card" data-reveal style={{ ["--d" as string]: i }}>
                    <Course e={e} />
                    <h4 className="gym__card-title">{e.nom}</h4>
                    <p className="gym__card-text">{fr(e.description)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap gym__photos">
        <figure className="gym__photo gym__photo--wide" data-reveal="image">
          <div className="gym__photo-img">
            <Picture
              id="relais"
              alt="Deux cavaliers au galop se passent le témoin pendant la course de relais, devant les gradins."
              sizes="(max-width: 767px) 92vw, 62vw"
            />
          </div>
          <figcaption>Course de relais, devant les gradins du manège.</figcaption>
        </figure>
        <figure className="gym__photo gym__photo--tall" data-reveal="image" style={{ ["--d" as string]: 2 }}>
          <div className="gym__photo-img">
            <Picture
              id="sauvetage"
              alt="Un cavalier saute de sa selle dans un nuage de poussière, au milieu de l'arène."
              sizes="(max-width: 767px) 92vw, 34vw"
            />
          </div>
          <figcaption>Dans l'arène de sable, à Falardeau.</figcaption>
        </figure>
      </div>

      <div className="wrap">
        <p className="gym__sanction" data-reveal>
          {keepPlaces(fr(sanction))}
        </p>
      </div>
    </section>
  );
}
