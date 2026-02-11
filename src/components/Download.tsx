import { Smartphone, Monitor, Download as DownloadIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ANDROID_APK_URL = process.env.NEXT_PUBLIC_APK_URL || "#";
const WINDOWS_INSTALLER_URL = process.env.NEXT_PUBLIC_WINDOWS_URL || "#";

const downloads: { icon: LucideIcon; name: string; subtitle: string; label: string; href: string }[] = [
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
  "100% Gratuito",
  "Funziona Offline",
  "Nessun Abbonamento",
  "Made in Italy",
];

export default function Download() {
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

        <div className="text-center mt-10">
          <a href="/#contatti" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 underline underline-offset-2">
            Hai bisogno di aiuto con l&apos;installazione?
          </a>
        </div>
      </div>
    </section>
  );
}
