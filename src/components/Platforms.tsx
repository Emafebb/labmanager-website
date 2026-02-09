import { Smartphone, Tablet, Monitor, CheckCircle2 } from "lucide-react";

const platforms = [
  {
    icon: Smartphone,
    name: "Android Smartphone",
    badge: "NUOVO",
    badgeColor: "bg-green-500",
    description: "Porta LabManager sempre in tasca. Perfetto per consultare ricette e registrare vendite in movimento.",
    features: [
      "Interfaccia Material Design ottimizzata",
      "Touch-friendly con gesti intuitivi",
      "Funziona offline",
      "Sincronizzazione automatica",
    ],
  },
  {
    icon: Tablet,
    name: "Android Tablet",
    badge: "NUOVO",
    badgeColor: "bg-green-500",
    description: "Lo schermo pi\u00f9 grande del tablet ti offre una visione completa delle tue ricette e dashboard.",
    features: [
      "Layout ottimizzato per schermi grandi",
      "Dashboard con grafici dettagliati",
      "Ideale per il laboratorio",
      "Multitasking facilitato",
    ],
  },
  {
    icon: Monitor,
    name: "Windows Desktop",
    badge: "DISPONIBILE",
    badgeColor: "bg-primary",
    description: "La versione completa per il tuo ufficio con interfaccia Fluent UI professionale.",
    features: [
      "Interfaccia Fluent UI nativa",
      "Gestione avanzata ricette e costi",
      "Stampa etichette e PDF",
      "Perfetto per la postazione fissa",
    ],
  },
];

export default function Platforms() {
  return (
    <section id="piattaforme" className="px-6 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Un&apos;app, tutte le piattaforme
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            LabManager si adatta al tuo dispositivo con un&apos;interfaccia nativa per ogni piattaforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <platform.icon size={32} className="text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {platform.name}
                  </h3>
                  <span
                    className={`${platform.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
                  >
                    {platform.badge}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {platform.description}
              </p>
              <ul className="space-y-3">
                {platform.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
