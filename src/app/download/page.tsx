import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Download from "@/components/Download";

export const metadata: Metadata = {
  title: "Download - LabManager",
  description:
    "Scarica LabManager per Android o Windows. L'app completa per gestire la tua pasticceria.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadPage() {
  return (
    <>
      <nav aria-label="Navigazione principale" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ease-out">
              <Image
                src="/images/logo.png"
                alt="LabManager"
                width={28}
                height={28}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                LabManager
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest -mt-1">
                PASTICCERIA
              </span>
            </div>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all duration-200 ease-out"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Torna al sito</span>
          </a>
        </div>
      </nav>

      <main className="pt-20">
        <Download />
      </main>
    </>
  );
}
