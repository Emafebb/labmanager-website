"use client";

import { useState } from "react";
import {
  Smartphone,
  Monitor,
  Download as DownloadIcon,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DownloadItem {
  icon: LucideIcon;
  name: string;
  subtitle: string;
  label: string;
  href: string;
}

const ANDROID_APK_URL = process.env.NEXT_PUBLIC_APK_URL || "#";
const WINDOWS_INSTALLER_URL = process.env.NEXT_PUBLIC_WINDOWS_URL || "#";

const downloads: DownloadItem[] = [
  {
    icon: Smartphone,
    name: "Android",
    subtitle: "Smartphone & Tablet",
    label: "Scarica APK",
    href: ANDROID_APK_URL,
  },
  {
    icon: Monitor,
    name: "Windows",
    subtitle: "Desktop",
    label: "Scarica EXE",
    href: WINDOWS_INSTALLER_URL,
  },
];

const badges = [
  "100% Gratuito (in fase di sviluppo)",
  "Funziona Offline",
  "Multi-utente",
  "Supporto Diretto",
];

const installSteps = [
  'Quando appare "Installazione bloccata", tocca **Impostazioni**',
  'Attiva **Consenti installazione da questa fonte** per il browser',
  "Torna indietro e completa l'installazione",
  "**Dopo l'installazione**, disattiva nuovamente l'opzione",
];

function renderStepText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-amber-800">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function Download() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <section id="download-app" className="px-6 py-24" aria-labelledby="download-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
            <DownloadIcon size={16} aria-hidden="true" />
            <span>DOWNLOAD GRATUITO</span>
          </div>

          <h2 id="download-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Scarica <span className="text-primary">Gratis</span> l&apos;App per Pasticceria
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Software gestionale completo: scegli Android o Windows, funziona offline e senza abbonamento.
            Inizia subito a gestire ricette, costi ed etichette.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/10"
              >
                <span aria-hidden="true">&#10003;</span>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {downloads.map((item) => (
            <a key={item.name} href={item.href} className="group block">
              <div className="h-full bg-white rounded-xl p-8 border border-card-border-light shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center">
                <div className="bg-icon/10 rounded-xl p-4 w-fit mx-auto mb-5">
                  <item.icon size={32} className="text-icon" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{item.subtitle}</p>
                <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors duration-200">
                  <DownloadIcon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Banner collassabile: guida installazione APK */}
        <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200/60 rounded-xl p-5 sm:p-6 mt-8">
          <h3 id="installation-guide-heading" className="sr-only">Guida all&apos;installazione APK</h3>
          <button
            id="installation-guide-button"
            type="button"
            onClick={() => setGuideOpen((prev) => !prev)}
            aria-expanded={guideOpen}
            aria-controls="installation-guide-content"
            className="w-full flex items-start gap-4 text-left cursor-pointer hover:bg-amber-100/30 rounded-lg transition-colors duration-200"
          >
            <div className="bg-amber-100 text-amber-600 rounded-lg p-2 shrink-0">
              <ShieldAlert size={22} aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-amber-900 mb-1">
                Problemi con l&apos;installazione dell&apos;APK?
              </h4>
              <p className="text-sm text-amber-800/80 leading-relaxed">
                Il tuo dispositivo Android potrebbe bloccare l&apos;installazione perch&eacute;
                l&apos;app non proviene dal Play Store. &Egrave; una procedura di sicurezza normale.
              </p>
            </div>

            <ChevronDown
              size={20}
              aria-hidden="true"
              className={`text-amber-500 shrink-0 mt-1 transition-transform duration-300 ${guideOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            id="installation-guide-content"
            role="region"
            aria-labelledby="installation-guide-heading"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              guideOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-5 pl-14">
              <ol className="space-y-3">
                {installSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-amber-900/90 leading-relaxed">
                    <span className="inline-flex items-center justify-center bg-amber-200/60 text-amber-800 font-bold text-xs rounded-full w-6 h-6 shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{renderStepText(step)}</span>
                  </li>
                ))}
              </ol>

              <p className="text-xs text-amber-700/70 mt-4 italic">
                I passaggi possono variare in base al produttore.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/#contatti" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 underline underline-offset-2">
            Hai bisogno di aiuto con l&apos;installazione?
          </a>
        </div>
      </div>
    </section>
  );
}
