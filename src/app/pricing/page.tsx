import type { Metadata } from "next";
import { ChefHat, FileCheck, Users, Warehouse, Download, UserPlus, PlayCircle, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRICING } from "@/lib/pricing";
import PricingFAQ from "./pricing-faq";

export const metadata: Metadata = {
  title: "Prezzi",
  description:
    "Un solo piano, tutto incluso. LabManager ti aiuta a gestire ricette, costi, magazzino, etichette e team a €44,99/mese o €480/anno. Prova gratis 14 giorni.",
  alternates: {
    canonical: "https://pastrylabmanager.com/pricing",
    languages: {
      it: "https://pastrylabmanager.com/pricing",
    },
  },
  openGraph: {
    title: "Prezzi | LabManager",
    description:
      "Tutto quello che ti serve in un solo piano: €44,99/mese o €480/anno. Prova gratis 14 giorni, senza carta richiesta.",
    url: "https://pastrylabmanager.com/pricing",
    images: [
      {
        url: "https://pastrylabmanager.com/images/pricing-og-image.png",
        secureUrl: "https://pastrylabmanager.com/images/pricing-og-image.png",
        width: 1200,
        height: 630,
        alt: "LabManager - Un solo piano tutto incluso con prova gratis di 14 giorni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prezzi | LabManager",
    description:
      "Tutto quello che ti serve in un solo piano: €44,99/mese o €480/anno. Prova gratis 14 giorni, senza carta richiesta.",
    images: ["https://pastrylabmanager.com/images/pricing-og-image.png"],
  },
};

const FEATURES = [
  {
    icon: ChefHat,
    title: "Tieni ricette, costi e produzione sotto controllo",
    summary:
      "Ricette, quantità e costi restano allineati, così decidi meglio e sprechi meno.",
    items: [
      "Ricette con costi aggiornati automaticamente",
      "Food cost su ogni preparazione",
      "Calcolatori dedicati per gelato, pasticceria, pane e lievito madre",
      "Produzione giornaliera più facile da pianificare",
    ],
  },
  {
    icon: Warehouse,
    title: "Hai il magazzino sotto controllo",
    summary:
      "Vedi cosa entra, cosa esce e cosa sta finendo senza rincorrere fogli o appunti sparsi.",
    items: [
      "Magazzino sempre aggiornato, anche su più sedi",
      "Scadenze e movimenti facili da consultare",
      "Entrata merce più veloce con barcode",
      "Storico disponibile quando ti serve",
    ],
  },
  {
    icon: FileCheck,
    title: "Dalle ricette alle etichette, senza rifare il lavoro",
    summary:
      "Parti dalle tue ricette e ottieni subito quello che ti serve, senza rifare il lavoro da zero.",
    items: [
      "Etichette pronte in pochi clic",
      "Allergeni evidenziati automaticamente",
      "PDF e report sempre disponibili",
      "Scegli il formato più adatto al tuo lavoro",
    ],
  },
  {
    icon: Users,
    title: "Il team lavora bene anche offline",
    summary:
      "Il laboratorio continua a lavorare, i dati si allineano da soli e ognuno vede solo quello che serve.",
    items: [
      "Accesso da Android e Windows",
      "Funziona offline - sincronizzazione automatica",
      "2 dispositivi simultanei inclusi",
      "Ogni membro del team ha il suo profilo con accessi personalizzabili",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        <section className="px-6 text-center mb-20">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
              <span>Prezzi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Un solo piano. Tutto incluso.{" "}
              <span className="gradient-text">Nessuna sorpresa.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Con un solo piano hai tutto quello che serve per lavorare meglio
              ogni giorno: ricette, costi, magazzino, etichette e team, senza
              moduli extra o versioni ridotte.
            </p>
          </div>
        </section>

        {/* Come funziona — roadmap */}
        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in-up">
              Come iniziare
            </h2>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-stretch gap-0">
              {/* linea connettore orizzontale (desktop) */}
              <div className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />

              {[
                {
                  icon: Download,
                  step: "1",
                  title: "Scarica l'app",
                  desc: "Disponibile su Android e Windows. Installa LabManager sul tuo dispositivo.",
                },
                {
                  icon: UserPlus,
                  step: "2",
                  title: "Registrati",
                  desc: "Crea il tuo account in pochi secondi. Nessuna carta richiesta.",
                },
                {
                  icon: PlayCircle,
                  step: "3",
                  title: "Prova gratis",
                  desc: "14 giorni di accesso completo a tutte le funzionalità, senza impegni.",
                },
                {
                  icon: CheckCircle,
                  step: "4",
                  title: "Scegli il piano",
                  desc: "Al termine della prova attivi mensile o annuale direttamente nell'app.",
                },
              ].map(({ icon: Icon, step, title, desc }, i, arr) => (
                <div
                  key={step}
                  className="relative z-10 flex-1 flex flex-col sm:items-center sm:text-center animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {/* layout mobile: icona + freccia in riga, testo a destra */}
                  <div className="flex sm:flex-col sm:items-center gap-4 sm:gap-0 px-4">
                    <div className="flex flex-col items-center sm:hidden">
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center shadow-sm relative flex-shrink-0">
                        <Icon size={24} className="text-primary" aria-hidden="true" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
                          {step}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 mt-2" />
                      )}
                    </div>
                    {/* cerchio desktop */}
                    <div className="hidden sm:flex w-16 h-16 rounded-full bg-white border-2 border-primary/20 items-center justify-center mb-4 shadow-sm relative">
                      <Icon size={26} className="text-primary" aria-hidden="true" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
                        {step}
                      </span>
                    </div>
                    <div className="pb-6 sm:pb-0">
                      <p className="text-base font-bold text-gray-900 mb-1">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-stretch animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 text-center flex flex-col">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Prova gratuita
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-1">
                  14 giorni
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Gratis - nessuna carta richiesta
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
                  Accesso completo a tutte le funzionalità.
                </p>
                <a
                  href={`https://wa.me/393806540619?text=Ciao!%20Vorrei%20provare%20LabManager%20gratuitamente%20per%20${PRICING.trialDays}%20giorni.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-900 text-white text-sm font-semibold py-3 px-6 rounded-xl hover:bg-gray-700 transition-colors duration-200"
                >
                  Inizia la prova gratis
                </a>
              </div>

              <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 text-center flex flex-col">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Mensile
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-1">
                  €{PRICING.monthly.price.toFixed(2).replace(".", ",")}
                  <span className="text-lg font-normal text-gray-500">
                    /mese
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Puoi disdire quando vuoi
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
                  Ideale se vuoi iniziare senza impegni. Tutte le funzionalità
                  incluse.
                </p>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    Scelta piano direttamente in app
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">
                    Dopo la prova gratuita,per continuare ad usare LabManager,
                    puoi attivare il piano che preferisci.
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-2xl border-2 border-primary p-8 text-center relative flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  Più scelto
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                  Annuale
                </div>
                <div className="text-lg text-gray-400 line-through mb-1">
                  €{PRICING.monthly.price.toFixed(2).replace(".", ",")}/mese
                </div>
                <div className="text-5xl font-bold text-primary mb-1">
                  €{PRICING.yearly.monthlyEquivalent}
                  <span className="text-lg font-normal text-gray-500">
                    /mese
                  </span>
                </div>
                <div className="text-sm font-semibold text-primary mb-6">
                  €{PRICING.yearly.price}/anno - risparmi €
                  {PRICING.yearly.saving}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  Pagamento unico anticipato. La scelta di chi usa LabManager
                  tutto l&apos;anno.
                </p>
                <ul className="space-y-2 mb-8 text-left">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      className="text-primary font-bold mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <span>
                      <strong>2 sessioni private 1:1</strong> - onboarding e
                      revisione con il team
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      className="text-primary font-bold mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <span>
                      <strong>Supporto prioritario</strong>
                    </span>
                  </li>
                </ul>
                <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-4 text-left">
                  <p className="text-sm font-semibold text-primary">
                    Scelta piano direttamente in app
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">
                    Dopo la prova gratuita,per continuare ad usare LabManager,
                    puoi attivare il piano che preferisci.
                  </p>
                </div>
              </div>
            </div>

            <p
              className="text-center text-sm text-gray-500 mt-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Nessun costo di attivazione
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div
            className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-3xl p-10 sm:p-14 text-center animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              Meno di €{PRICING.dailyCost} al giorno.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
              Meno di un caffè al bar.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
              Tieni sotto controllo ricette, costi e magazzino - tutto per meno
              di €{PRICING.dailyCost} al giorno.
            </p>
          </div>
        </section>

        {/*
        <section className="px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
                { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
                { quote: "Recensione...", name: "Nome", role: "Ruolo / Attività" },
              ].map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-card-border/25 p-8 shadow-sm"
                >
                  <p className="text-gray-600 leading-relaxed mb-6 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        <section className="px-6 py-20 bg-surface">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Tutto quello che ti serve, dal primo giorno
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl border border-card-border/25 p-8 shadow-sm animate-fade-in-up"
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon
                      size={24}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {feature.summary}
                  </p>
                  <ul className="space-y-2.5">
                    {feature.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                      >
                        <span
                          className="text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingFAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
