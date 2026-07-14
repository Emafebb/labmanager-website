import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Download from "@/components/Download";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";

const PAGE_URL = "https://labmanagergestionale.com/download";
const PAGE_DESCRIPTION =
  "Pagina di assistenza per gli utenti esistenti di LabManager.";

export const metadata: Metadata = {
  title: "Supporto installazioni legacy",
  description: PAGE_DESCRIPTION,
  keywords: null,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Supporto installazioni legacy | LabManager",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Supporto installazioni legacy | LabManager",
    description: PAGE_DESCRIPTION,
  },
};

export default function DownloadPage() {
  return (
    <>
      <nav aria-label="Navigazione principale" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
          >
            <BrandLogo />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                LabManager
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Torna al sito</span>
          </Link>
        </div>
      </nav>

      <main className="pt-20">
        <Download />
      </main>
      <Footer />
    </>
  );
}
