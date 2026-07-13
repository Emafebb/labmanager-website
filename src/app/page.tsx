import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OrdersPreview from "@/components/OrdersPreview";
import Warehouse from "@/components/Warehouse";
import WhyLabManager from "@/components/WhyLabManager";
import Platforms from "@/components/Platforms";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
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
        <WhyLabManager />
        <Platforms />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
import type { Metadata } from "next";
