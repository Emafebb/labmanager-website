import {
  Smartphone,
  ChefHat,
  ArrowDown,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-24 bg-gradient-to-br from-gray-50 to-white text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-6">
          <Smartphone size={14} />
          NUOVA APP ANDROID DISPONIBILE
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          La tua pasticceria,{" "}
          <span className="text-primary">sempre con te</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
          LabManager &egrave; l&apos;app completa per gestire ricette, ingredienti,
          costi e produzione della tua pasticceria. Ora disponibile su{" "}
          <strong className="text-gray-700">Android smartphone e tablet</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#download"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-dark transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/30"
          >
            <Smartphone size={20} />
            Scarica per Android
          </a>
          <a
            href="#funzionalita"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-base font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-all"
          >
            <ChefHat size={20} />
            Scopri le Funzionalit&agrave;
          </a>
        </div>

        {/* App mockup placeholder */}
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-black/10 p-8 min-h-[350px] flex flex-col items-center justify-center gap-4">
            <div className="flex gap-6 items-end">
              {/* Phone mockup */}
              <div className="w-36 h-64 bg-gray-900 rounded-2xl p-1.5 shadow-xl">
                <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 rounded-xl flex flex-col items-center justify-center gap-2">
                  <ChefHat size={32} className="text-primary" />
                  <span className="text-[10px] font-bold text-primary">LABMANAGER</span>
                  <div className="w-16 h-1.5 bg-primary/20 rounded-full" />
                  <div className="w-12 h-1.5 bg-primary/20 rounded-full" />
                  <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
                </div>
              </div>
              {/* Tablet mockup */}
              <div className="hidden sm:block w-64 h-44 bg-gray-900 rounded-xl p-1.5 shadow-xl">
                <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 rounded-lg flex flex-col items-center justify-center gap-2">
                  <ChefHat size={28} className="text-primary" />
                  <span className="text-xs font-bold text-primary">LABMANAGER TABLET</span>
                  <div className="flex gap-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg" />
                    <div className="w-16 h-16 bg-primary/10 rounded-lg" />
                    <div className="w-16 h-16 bg-primary/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Sostituisci con screenshot reali della tua app
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 animate-bounce">
          <ArrowDown size={24} className="text-gray-300" />
        </div>
      </div>
    </section>
  );
}
