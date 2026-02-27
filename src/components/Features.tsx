import {
  ChefHat,
  Scale,
  Package,
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

const heroFeatures = [
  {
    icon: ChefHat,
    title: "Ricette & Assemblaggi",
    description:
      "Crea e organizza ricette con ingredienti, procedimenti e rese. Combina più preparazioni e semilavorati per comporre il prodotto finito.",
    accent: "from-primary/10 to-icon/10",
  },
  {
    icon: DollarSign,
    title: "Calcolo Costi & Margini",
    description:
      "Calcola automaticamente i costi di ogni ricetta: materie prime, manodopera e costi strutturali. Monitora i margini di guadagno.",
    accent: "from-amber-50 to-orange-50",
  },
];

const features = [
  {
    icon: Scale,
    title: "Bilanciamento Composizione",
    description:
      "Analisi zuccheri, grassi, proteine, lattosio, solidi e acqua con range target personalizzabili.",
  },
  {
    icon: Package,
    title: "Gestione Ingredienti",
    description:
      "Inventario del laboratorio con costi al kg, valori nutrizionali e semilavorati riutilizzabili.",
  },
  {
    icon: Wrench,
    title: "Tools Laboratorio",
    description:
      "Calcolatori professionali: bagne, calcolo W, gelato, impasto, lievito madre, stampi.",
  },
  {
    icon: FileText,
    title: "Tabelle Nutrizionali",
    description:
      "Valori nutrizionali calcolati automaticamente per ogni ricetta e prodotto finito.",
  },
  {
    icon: Tag,
    title: "Etichette con Allergeni",
    description:
      "Etichette alimentari con allergeni evidenziati e tabella nutrizionale, pronte per la stampa.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Vendite",
    description:
      "Produzione, vendite, lotti e tracciabilità con grafici e statistiche in tempo reale.",
  },
];

const advantages = [
  {
    icon: Wifi,
    title: "Funziona Offline",
    description: "Sincronizzazione automatica quando torni online",
  },
  {
    icon: Calculator,
    title: "Prova Gratuita",
    description: "Richiedi l'accesso gratuito, nessun abbonamento",
  },
  {
    icon: Printer,
    title: "Stampa & Esporta PDF",
    description: "Ricette, etichette e report pronti per la stampa",
  },
  {
    icon: Sparkles,
    title: "Aggiornamenti Costanti",
    description: "Nuove funzionalità rilasciate regolarmente",
  },
];

export default function Features() {
  return (
    <section id="funzionalita" className="py-24 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Funzionalità
          </p>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tutto ciò che serve al tuo laboratorio di pasticceria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            LabManager offre strumenti professionali per gestire ogni fase del laboratorio
            di pasticceria, dalla creazione della ricetta al prodotto finito. Include
            calcolo costi, etichette con allergeni, bilanciamento composizione e
            funzionamento offline su Android e Windows.
          </p>
        </div>

        {/* Hidden ordered list for search engine featured snippets */}
        <div className="sr-only">
          <h3>Lista completa funzionalità LabManager:</h3>
          <ol>
            <li><strong>Ricette e Assemblaggi</strong>: Crea e organizza ricette con ingredienti, procedimenti e rese. Combina più preparazioni e semilavorati per comporre il prodotto finito.</li>
            <li><strong>Calcolo Costi e Margini</strong>: Calcola automaticamente i costi di ogni ricetta: materie prime, manodopera e costi strutturali. Monitora i margini di guadagno.</li>
            <li><strong>Bilanciamento Composizione</strong>: Analisi zuccheri, grassi, proteine, lattosio, solidi e acqua con range target personalizzabili.</li>
            <li><strong>Gestione Ingredienti</strong>: Inventario del laboratorio con costi al kg, valori nutrizionali e semilavorati riutilizzabili.</li>
            <li><strong>Tools Laboratorio</strong>: Calcolatori professionali per bagne, calcolo W, gelato, impasto, lievito madre, stampi.</li>
            <li><strong>Tabelle Nutrizionali</strong>: Valori nutrizionali calcolati automaticamente per ogni ricetta e prodotto finito.</li>
            <li><strong>Etichette con Allergeni</strong>: Etichette alimentari con allergeni evidenziati e tabella nutrizionale, pronte per la stampa.</li>
            <li><strong>Dashboard e Vendite</strong>: Produzione, vendite, lotti e tracciabilità con grafici e statistiche in tempo reale.</li>
            <li><strong>Funziona Offline</strong>: Sincronizzazione automatica quando torni online, lavora senza connessione.</li>
          </ol>
        </div>

        {/* Hero features - 2 large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {heroFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Subtle gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-40 pointer-events-none`} />
              <div className="relative">
                <div className="bg-white rounded-xl p-3 w-fit mb-5 shadow-sm border border-gray-100">
                  <feature.icon className="text-primary" size={28} aria-hidden="true" />
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

        {/* Secondary features - 3x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="bg-icon/8 rounded-xl p-3 w-fit mb-4">
                <feature.icon className="text-icon" size={22} aria-hidden="true" />
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

        {/* Advantages bar */}
        <div className="bg-surface border border-gray-100 rounded-2xl p-6">
          <h3 className="sr-only">Vantaggi Principali</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="flex items-start gap-3">
                <div className="bg-icon/8 rounded-lg p-2.5 shrink-0">
                  <advantage.icon className="text-icon" size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-0.5">
                    {advantage.title}
                  </h4>
                  <p className="text-xs text-gray-500">
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
