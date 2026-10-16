import GymkhanaScene from "@/components/sections/GymkhanaScene";
import CourseRelay from "@/components/sections/CourseRelay";
import PhotoBand from "@/components/sections/PhotoBand";
import { epreuves, definition, type Epreuve } from "@/content/epreuves";
import { fr } from "@/lib/typo";

const STEPS = [
  { title: "Le départ", text: "Le cheval franchit la ligne au galop : le chronomètre démarre." },
  { title: "Le trèfle", text: "Trois barils à contourner en trèfle, au plus près, sans les renverser." },
  { title: "Le retour", text: "Un sprint jusqu'à la ligne. Ici, chaque centième compte." },
];

function Course({ e }: { e: Epreuve }) {
  return (
    <svg viewBox="0 0 100 100" className="course" aria-hidden>
      <path className="course__ghost" d={e.trace} />
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
      <circle className="course__rider" r={3.6} />
    </svg>
  );
}

export default function Gymkhana() {
  const centre = epreuves.filter((e) => e.famille === "centre");
  const tour = epreuves.filter((e) => e.famille === "tour");
  return (
    <section id="gymkhana" className="gym on-night" aria-labelledby="gym-title">
      <GymkhanaScene steps={STEPS.map((s) => ({ title: s.title, text: fr(s.text) }))} definition={fr(definition)} />

      <div className="wrap gym__events" data-relay>
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
                  <li key={e.id} className="gym__card" data-reveal data-relay-card style={{ ["--d" as string]: i }}>
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

      <CourseRelay />

      <PhotoBand />
    </section>
  );
}
