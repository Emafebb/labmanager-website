import {
  ChefHat,
  Calculator,
  Tag,
  BarChart3,
  Wifi,
  ShieldCheck,
  Package,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Gestione Ricette",
    description:
      "Crea, modifica e organizza tutte le ricette della tua pasticceria con ingredienti, procedimenti e rese.",
  },
  {
    icon: Package,
    title: "Ingredienti & Semilavorati",
    description:
      "Gestisci il tuo inventario di ingredienti con costi al kg, valori nutrizionali e semilavorati riutilizzabili.",
  },
  {
    icon: Calculator,
    title: "Calcolo Costi Automatico",
    description:
      "Costo materie prime, manodopera e costi strutturali calcolati in tempo reale per ogni ricetta.",
  },
  {
    icon: Tag,
    title: "Etichette EU 1169/2011",
    description:
      "Genera etichette alimentari conformi alla normativa europea con allergeni, valori nutrizionali e ingredienti.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Produzione & Vendite",
    description:
      "Monitora produzione, vendite, margini e performance con grafici interattivi e statistiche dettagliate.",
  },
  {
    icon: Wifi,
    title: "Funziona Offline",
    description:
      "Grazie a PowerSync, lavora senza connessione. I dati si sincronizzano automaticamente quando torni online.",
  },
  {
    icon: ShieldCheck,
    title: "Dati Sempre al Sicuro",
    description:
      "I tuoi dati sono crittografati e salvati su Supabase con backup automatici e autenticazione sicura.",
  },
  {
    icon: FileText,
    title: "Stampa & Esporta PDF",
    description:
      "Stampa ricette, etichette e report. Esporta in PDF per condividere con il tuo team o i fornitori.",
  },
];

export default function Features() {
  return (
    <section id="funzionalita" className="px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tutto ci&ograve; che serve alla tua pasticceria
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            LabManager integra tutti gli strumenti per gestire la tua attivit&agrave;
            in un&apos;unica app, dal laboratorio al punto vendita.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 bg-gray-50 rounded-xl border border-transparent hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <feature.icon
                size={36}
                className="text-primary mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-base font-bold text-gray-900 mb-2">
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
