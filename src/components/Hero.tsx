import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 pt-32 pb-12 bg-[#F8F9FA]" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <div className="animate-fade-in-up lg:flex-1 text-center lg:text-left mb-16 lg:mb-0">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight mb-6 text-[var(--foreground)]">
              La tua pasticceria,{" "}
              <span className="gradient-text">sempre con te</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              LabManager è il gestionale completo per la tua pasticceria: ricette, costi,
              etichette alimentari e produzione in un&apos;unica app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <a
                href="#funzionalita"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 ease-out hover:opacity-90"
              >
                Scopri Funzionalità
              </a>
              <a
                href="#contatti"
                className="inline-flex items-center justify-center border-2 border-primary/20 bg-white text-primary px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 ease-out hover:border-primary/40"
              >
                Contattaci
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
              {["Android + Windows", "Funziona Offline", "Dati sicuri su Cloud"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-icon rounded-full" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-in lg:flex-1 flex items-end justify-center"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="hidden sm:block w-36 sm:w-40 bg-gray-900 rounded-3xl p-1.5 shadow-xl overflow-hidden relative z-10 -mr-6 mb-4">
              <Image
                src="/images/screen smartphone.jpg"
                alt="App gestione pasticceria LabManager su smartphone Android"
                width={360}
                height={640}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>

            <div className="relative z-20 flex flex-col items-center">
              <div className="w-full max-w-[320px] sm:w-[480px] sm:max-w-none lg:w-[420px] xl:w-[500px] bg-gray-900 rounded-xl p-1.5 shadow-2xl overflow-hidden">
                <Image
                  src="/images/Screenshot DESKTOP.png"
                  alt="Software gestionale pasticceria LabManager - dashboard desktop con ricette e costi"
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
              <div className="w-24 h-4 bg-gray-800 rounded-b-lg" />
              <div className="w-36 h-1.5 bg-gray-700 rounded-full" />
            </div>

            <div className="hidden sm:block w-44 sm:w-52 lg:w-44 xl:w-48 bg-gray-900 rounded-2xl p-1.5 shadow-xl overflow-hidden relative z-10 -ml-6 mb-4">
              <Image
                src="/images/Screenshot tablet.jpg"
                alt="Gestionale pasticceria LabManager su tablet in laboratorio"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
