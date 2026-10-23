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
import QuickBar from "@/components/QuickBar";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";
import { faq } from "@/content/faq";

const TITLE = "Festival Gymkhana de Falardeau, Saguenay | Entrée gratuite";
const DESCRIPTION =
  "Festival de gymkhana gratuit à 20 min de Chicoutimi : une centaine de cavaliers en compétition, des spectacles country et des activités en famille, en août.";

export const metadata = pageMetadata({ title: TITLE, absolute: true, description: DESCRIPTION, path: "/" });

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
      <QuickBar />
      <JsonLd data={pageGraph({ path: "/", title: TITLE, description: DESCRIPTION, faq })} />
    </>
  );
}
