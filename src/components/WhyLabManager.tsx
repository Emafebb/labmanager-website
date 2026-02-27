import {
  ChefHat,
  Scale,
  WifiOff,
  Gift,
  Check,
  X,
  Minus,
} from "lucide-react";

const differentiators = [
  {
    icon: ChefHat,
    title: "Pensato per il Laboratorio e Cucine",
    description:
      "Non un gestionale generico adattato, ma un software progettato specificamente per pasticcerie, panifici e ristoranti: dalla ricetta al prodotto finito.",
  },
  {
    icon: Scale,
    title: "Bilanciamento Composizione Integrato",
    description:
      "Analisi in tempo reale di zuccheri, grassi, proteine, lattosio, solidi e acqua con range target personalizzabili per ogni tipo di preparazione.",
  },
  {
    icon: WifiOff,
    title: "Funziona Completamente Offline",
    description:
      "Tutte le funzionalità disponibili senza connessione internet. Ideale per i laboratori dove il WiFi non arriva. Sincronizzazione automatica quando torni online.",
  },
  {
    icon: Gift,
    title: "Gratuito e Senza Abbonamento",
    description:
      "LabManager è gratuito durante la fase di lancio. Nessun abbonamento mensile, nessun costo nascosto. Richiedi l'accesso e inizia subito.",
  },
];

const comparisonRows = [
  {
    feature: "Bilanciamento composizione ricette",
    labmanager: true,
    generic: false,
    other: "partial" as const,
  },
  {
    feature: "Funzionamento offline completo",
    labmanager: true,
    generic: false,
    other: "partial" as const,
  },
  {
    feature: "App Android + Desktop Windows",
    labmanager: true,
    generic: false,
    other: "partial" as const,
  },
  {
    feature: "Calcolo automatico costi e margini",
    labmanager: true,
    generic: true,
    other: true,
  },
  {
    feature: "Etichette alimentari con allergeni",
    labmanager: true,
    generic: false,
    other: "partial" as const,
  },
  {
    feature: "Tabelle nutrizionali automatiche",
    labmanager: true,
    generic: false,
    other: "partial" as const,
  },
  {
    feature: "Gestione team con ruoli",
    labmanager: true,
    generic: true,
    other: "partial" as const,
  },
  {
    feature: "Gratuito (fase di lancio)",
    labmanager: true,
    generic: false,
    other: false,
  },
];

function CellIcon({ value }: { value: boolean | "partial" }) {
  if (value === true)
    return <Check size={18} className="text-green-600" aria-label="Sì" />;
  if (value === "partial")
    return <Minus size={18} className="text-amber-500" aria-label="Parziale" />;
  return <X size={18} className="text-gray-300" aria-label="No" />;
}

export default function WhyLabManager() {
  return (
    <section
      id="perche-labmanager"
      className="py-24 bg-[#FAFBFE]"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Perché Scegliere LabManager
          </p>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Il gestionale pensato per il tuo laboratorio o cucina
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A differenza dei gestionali generici, LabManager è stato progettato
            specificamente per le esigenze di pasticcerie, panifici, ristoranti
            e laboratori artigianali.
          </p>
        </div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="bg-primary/8 rounded-xl p-3 w-fit mb-4">
                <item.icon className="text-primary" size={22} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-foreground">
              Confronto: LabManager vs altri gestionali di settore
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Come si posiziona LabManager rispetto ai gestionali generici e ai
              software di settore.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">
                    Funzionalità
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-primary">
                    LabManager
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-500">
                    Gestionali Generici
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-500">
                    Altri Software Pasticceria
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-6 py-3 text-gray-700">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex justify-center">
                        <CellIcon value={row.labmanager} />
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex justify-center">
                        <CellIcon value={row.generic} />
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex justify-center">
                        <CellIcon value={row.other} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
