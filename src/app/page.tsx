import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Platforms from "@/components/Platforms";
import Download from "@/components/Download";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Platforms />
      <Download />
      <ContactForm />
      <Footer />
    </>
  );
}
