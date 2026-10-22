import GymkhanaScene from "@/components/sections/GymkhanaScene";
import PhotoBand from "@/components/sections/PhotoBand";
import { definition } from "@/content/epreuves";
import { fr } from "@/lib/typo";

const STEPS = [
  { title: "Le départ", text: "Le cheval franchit la ligne au galop : le chronomètre démarre." },
  { title: "Le trèfle", text: "Trois barils à contourner en trèfle, au plus près, sans les renverser." },
  { title: "Le retour", text: "Un sprint jusqu'à la ligne. Ici, chaque centième compte." },
];

// What gymkhana is, for everyone. The events, their rules and registration
// are for competitors: they live on the events page, which the scene leads to.
export default function Gymkhana() {
  return (
    <section id="gymkhana" className="gym on-night" aria-labelledby="gym-title">
      <GymkhanaScene steps={STEPS.map((s) => ({ title: s.title, text: fr(s.text) }))} definition={fr(definition)} />

      <PhotoBand />
    </section>
  );
}
