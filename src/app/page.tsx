import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Platforms from "@/components/Platforms";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LabManager - Il tuo braccio destro in laboratorio",
  description:
    "Gestisci ricette, ingredienti, costi, etichette alimentari EU 1169/2011, produzione e vendite della tua pasticceria. App disponibile per Android e Windows.",
};

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Vai al contenuto principale
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <Platforms />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
