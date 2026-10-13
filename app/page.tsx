import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EnBref from "@/components/sections/EnBref";
import Programmation from "@/components/sections/Programmation";
import Gymkhana from "@/components/sections/Gymkhana";
import Activites from "@/components/sections/Activites";
import Visite from "@/components/sections/Visite";
import Equipe from "@/components/sections/Equipe";
import Partenaires from "@/components/sections/Partenaires";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EnBref />
        <Programmation />
        <Gymkhana />
        <Activites />
        <Visite />
        <Equipe />
        <Partenaires />
      </main>
      <Footer />
    </>
  );
}
