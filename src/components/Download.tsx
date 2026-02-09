import { Smartphone, Monitor, Download as DownloadIcon } from "lucide-react";

export default function Download() {
  // Sostituisci questi URL con i link reali di Supabase Storage
  const ANDROID_APK_URL = process.env.NEXT_PUBLIC_APK_URL || "#";
  const WINDOWS_INSTALLER_URL = process.env.NEXT_PUBLIC_WINDOWS_URL || "#";

  return (
    <section id="download" className="px-6 py-24 bg-gradient-to-br from-primary to-primary-light text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Scarica LabManager Gratis
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
          Inizia subito a gestire la tua pasticceria in modo professionale.
          Scarica l&apos;app per il tuo dispositivo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Android Download */}
          <a
            href={ANDROID_APK_URL}
            className="group flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:-translate-y-1"
          >
            <Smartphone size={48} className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm text-white/70 mb-1">Scarica per</p>
              <p className="text-2xl font-bold">Android</p>
              <p className="text-xs text-white/60 mt-1">APK - Smartphone & Tablet</p>
            </div>
            <span className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-lg font-semibold text-sm group-hover:shadow-lg transition-shadow">
              <DownloadIcon size={16} />
              Download APK
            </span>
          </a>

          {/* Windows Download */}
          <a
            href={WINDOWS_INSTALLER_URL}
            className="group flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:-translate-y-1"
          >
            <Monitor size={48} className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm text-white/70 mb-1">Scarica per</p>
              <p className="text-2xl font-bold">Windows</p>
              <p className="text-xs text-white/60 mt-1">Installer - Desktop</p>
            </div>
            <span className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-lg font-semibold text-sm group-hover:shadow-lg transition-shadow">
              <DownloadIcon size={16} />
              Download EXE
            </span>
          </a>
        </div>

        <p className="text-sm text-white/50 mt-8">
          Versione 0.0.3 &middot; Richiede Android 8.0+ o Windows 10+
        </p>
      </div>
    </section>
  );
}
