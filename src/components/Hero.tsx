import Image from "next/image";
import { ArrowRight, Monitor, WifiOff, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFBFE]" aria-labelledby="hero-heading">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.04] to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-icon/[0.06] to-transparent blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-36 lg:pb-20">
        {/* Top badge */}
        <div className="animate-fade-in flex justify-center lg:justify-start mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-gray-600">
              Richiedi una prova gratuita
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
          {/* Left column - Text content */}
          <div className="animate-fade-in-up lg:flex-1 text-center lg:text-left mb-16 lg:mb-0 max-w-2xl mx-auto lg:mx-0">
            <h1
              id="hero-heading"
              className="font-display font-bold leading-[1.08] mb-4 text-foreground tracking-tight"
            >
              <span className="block text-[2.5rem] sm:text-[3.25rem] xl:text-[3.75rem]">
                Il gestionale per
              </span>
              <span className="block text-[2.5rem] sm:text-[3.25rem] xl:text-[3.75rem] gradient-text">
                la tua pasticceria
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              Gestisci ricette, costi, etichette alimentari e produzione del tuo laboratorio di pasticceria,paninifio o ristorante.
              <span className="text-gray-700 font-medium"> Tutto in un&apos;unica app</span>,
              su Android e Windows.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
              <a
                href="#funzionalita"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Scopri Funzionalità
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contatti"
                className="inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Contattaci
              </a>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { icon: Monitor, label: "Android + Windows" },
                { icon: WifiOff, label: "Funziona Offline" },
                { icon: Shield, label: "Dati sicuri su Cloud" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-gray-100 shadow-sm text-sm text-gray-600"
                >
                  <Icon size={15} className="text-icon" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Device mockups */}
          <div
            className="animate-fade-in lg:flex-1 flex justify-center lg:justify-end"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative w-full max-w-[540px] pb-16 sm:pb-20">
              {/* Desktop monitor - hero piece */}
              <div className="relative z-20 hero-device-desktop mx-6">
                <div className="bg-gray-900 rounded-xl p-1.5 shadow-2xl overflow-hidden">
                  <Image
                    src="/images/screenshot-desktop.png"
                    alt="Software gestionale pasticceria LabManager - dashboard desktop con ricette e costi"
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                </div>
                {/* Monitor stand */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-4 bg-gray-800 rounded-b-md" />
                  <div className="w-32 h-1.5 bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* Tablet - overlapping bottom-left */}
              <div
                className="hidden sm:block absolute bottom-0 left-0 z-30 w-[160px] lg:w-[175px] hero-device-tablet"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="bg-gray-900 rounded-2xl p-1.5 shadow-xl overflow-hidden ring-1 ring-white/20">
                  <Image
                    src="/images/screenshot-tablet.jpg"
                    alt="Gestionale pasticceria LabManager su tablet in laboratorio"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Phone - overlapping bottom-right */}
              <div
                className="hidden sm:block absolute bottom-0 right-4 z-30 w-[100px] lg:w-[110px] hero-device-phone"
                style={{ animationDelay: "0.45s" }}
              >
                <div className="bg-gray-900 rounded-3xl p-1.5 shadow-xl overflow-hidden ring-1 ring-white/20">
                  <Image
                    src="/images/screen-smartphone.jpg"
                    alt="App gestione pasticceria LabManager su smartphone Android"
                    width={360}
                    height={640}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
