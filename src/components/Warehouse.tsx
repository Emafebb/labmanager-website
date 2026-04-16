import {
  PackagePlus,
  LayoutDashboard,
  PackageMinus,
  ArrowDownUp,
  BellRing,
  Building2,
  ArrowLeftRight,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const heroFeatures: FeatureItem[] = [
  {
    icon: PackagePlus,
    title: "Ricevimento Merci",
    description:
      "Registra ogni carico con fornitore, lotto, data di scadenza e sede di destinazione. Ogni ricevimento aggiorna automaticamente la disponibilità.",
  },
  {
    icon: LayoutDashboard,
    title: "Disponibilità in tempo reale",
    description:
      "Monitora le giacenze di materie prime, prodotti finiti e commerciali in ogni sede. Soglie di riordino configurabili per non restare mai a secco.",
  },
];

const features: FeatureItem[] = [
  {
    icon: PackageMinus,
    title: "Prelievo",
    description:
      "Scarica ingredienti dal magazzino per la produzione, manualmente o tramite bridge automatico dalla ricetta.",
  },
  {
    icon: ArrowDownUp,
    title: "Scarico FIFO automatico",
    description:
      "I lotti più vecchi vengono consumati per primi. Nessuna gestione manuale, nessun spreco nascosto.",
  },
  {
    icon: BellRing,
    title: "Alert scadenze",
    description:
      "Notifiche configurabili per i prodotti in scadenza. Intervieni prima che il problema diventi perdita.",
  },
  {
    icon: Building2,
    title: "Anagrafica Fornitori",
    description:
      "Gestisci fornitori con dati completi: IBAN, condizioni di pagamento, categorie merceologiche e scontistica.",
  },
  {
    icon: ArrowLeftRight,
    title: "Trasferimenti tra sedi",
    description:
      "Sposta merce da un magazzino all'altro con tracciabilità completa del movimento.",
  },
  {
    icon: MapPin,
    title: "Gestione multi-sede",
    description:
      "Ogni sede ha il suo magazzino con collocazioni indipendenti. Visione consolidata o per singola sede.",
  },
];

export default function Warehouse() {
  return (
    <section id="magazzino" className="py-24 bg-surface" aria-labelledby="warehouse-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">
                Nuovo modulo
              </span>
            </div>
          </div>

          <h2
            id="warehouse-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Gestione magazzino per pasticceria, panificio e ristorante
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carichi, prelevi, correggi, trasferisci. Ogni movimento è tracciato.
            Ogni scadenza è sotto controllo.
          </p>
        </div>

        {/* Hero features — 2 grandi card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {heroFeatures.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white border border-gray-100 rounded-3xl p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 pointer-events-none" />
              <div className="relative">
                <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                  <feature.icon className="text-primary" size={32} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards — grid 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                <feature.icon className="text-primary" size={22} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
