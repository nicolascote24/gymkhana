import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="contenu" className="relative z-10 -mt-[100svh] min-h-[100svh] bg-sable" />
      </main>
    </>
  );
}
