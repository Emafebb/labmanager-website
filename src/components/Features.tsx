import {
  ChefHat,
  Scale,
  Package,
  Layers,
  Wrench,
  FileText,
  Tag,
  BarChart3,
  DollarSign,
  Wifi,
  Calculator,
  Printer,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Ricette",
    description:
      "Crea, modifica e organizza tutte le tue preparazioni con ingredienti, procedimenti e rese. Gestisci formule e varianti in un archivio digitale completo.",
  },
  {
    icon: DollarSign,
    title: "Calcolo Costi Ricette",
    description:
      "Calcola automaticamente i costi di ogni ricetta con analisi dettagliata di materie prime, manodopera e costi strutturali. Monitora i margini di guadagno.",
  },
  {
    icon: Scale,
    title: "Bilanciamento",
    description:
      "Analisi composizione ricetta: zuccheri, grassi, proteine, lattosio, solidi e acqua. Categorie di riferimento personalizzabili con range target per ogni preparazione.",
  },
  {
    icon: Package,
    title: "Ingredienti & Semilavorati",
    description:
      "Gestisci l'inventario del laboratorio con costi al kg, valori nutrizionali e semilavorati riutilizzabili. Tracciabilità ingredienti sempre sotto controllo.",
  },
  {
    icon: Layers,
    title: "Assemblaggi",
    description:
      "Combina più ricette e semilavorati per creare il prodotto finito (es. torta = pan di spagna + crema + glassa)",
  },
  {
    icon: Wrench,
    title: "Tools",
    description:
      "Calcolatori specifici per il laboratorio: bagne, calcolo W, gelato, impasto, rinfresco lievito madre, stampi, tempistiche",
  },
  {
    icon: FileText,
    title: "Tabella Nutrizionale",
    description:
      "Calcola automaticamente i valori nutrizionali di ogni ricetta e prodotto finito, pronti per etichette e documentazione.",
  },
  {
    icon: Tag,
    title: "Etichette alimentari",
    description:
      "Genera etichette alimentari con allergeni evidenziati e tabella nutrizionale. Scegli il formato desiderato, pronte per la stampa.",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description:
      "Monitora produzione, vendite, lotti e tracciabilità con grafici e statistiche. Tieni sotto controllo le performance del tuo laboratorio.",
  },
];

const advantages = [
  {
    icon: Wifi,
    title: "Funziona Offline",
    description: "Sincronizzazione automatica tra i dispositivi quando torni online",
  },
  {
    icon: Calculator,
    title: "Gratuito",
    description: "Software free per la tua attività, nessun abbonamento richiesto",
  },
  {
    icon: Printer,
    title: "Stampa & Esporta PDF",
    description: "Ricette, etichette, report pronti per la stampa",
  },
  {
    icon: Sparkles,
    title: "Aggiornamenti Costanti",
    description: "Nuove funzionalità e miglioramenti rilasciati regolarmente",
  },
];

export default function Features() {
  return (
    <section id="funzionalita" className="py-24 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Funzionalità
          </p>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tutto ciò che serve al tuo laboratorio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Software gestionale per pasticceria con strumenti professionali,
            dalla ricetta al prodotto finito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="app-card bg-white border border-card-border-light rounded-xl p-6 shadow-sm"
            >
              <div className="bg-icon/10 rounded-xl p-3 w-fit mb-4">
                <feature.icon className="text-icon" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-card-border-light rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="flex items-start gap-4">
                <div className="bg-icon/10 rounded-xl p-3 shrink-0">
                  <advantage.icon className="text-icon" size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {advantage.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
