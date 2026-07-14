import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OrdersPreview from "@/components/OrdersPreview";
import Warehouse from "@/components/Warehouse";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    absolute: "Gestionale per pasticcerie, panifici e gelaterie | LabManager",
  },
  alternates: {
    canonical: "https://labmanagergestionale.com",
    languages: {
      it: "https://labmanagergestionale.com",
    },
  },
};

export default function Home() {
  return (
    <>
      <NewsletterPopup />

      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <OrdersPreview />
        <Warehouse />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
