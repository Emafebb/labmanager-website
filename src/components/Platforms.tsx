import { Smartphone, Tablet, Monitor } from "lucide-react";

const platforms = [
  {
    icon: Smartphone,
    name: "Smartphone",
    title: "Gestione mobile del laboratorio",
    description:
      "Consulta ricette, controlla inventario ingredienti e registra ordini in tempo reale. Gestione completa ovunque tu sia.",
  },
  {
    icon: Tablet,
    name: "Tablet",
    title: "Controllo produzione in laboratorio",
    description:
      "Monitora lavorazioni, tracciabilità ingredienti e calcolo costi in tempo reale. Schermo ottimizzato per la postazione di produzione.",
  },
  {
    icon: Monitor,
    name: "Desktop Windows",
    title: "Gestione completa dell'attività",
    description:
      "Analisi food cost, gestione ricette, etichette alimentari e report avanzati. Tutte le funzionalità per amministrare la tua bottega.",
  },
];

export default function Platforms() {
  return (
    <section id="piattaforme" className="px-6 py-32 bg-white" aria-labelledby="platforms-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="uppercase text-sm font-bold tracking-widest text-primary mb-4">
            Multi-piattaforma
          </p>
          <h2 id="platforms-heading" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Un&apos;app, <span className="gradient-text">tutte le piattaforme</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Software gestionale che si adatta al tuo dispositivo con sincronizzazione
            dati in tempo reale e interfaccia ottimizzata per ogni piattaforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="h-full bg-white rounded-xl p-8 border border-card-border-light shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center">
                <div className="bg-icon/10 rounded-xl p-4 w-fit mx-auto mb-5">
                  <platform.icon size={28} className="text-icon" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {platform.name}
                </h3>
                <p className="text-sm font-medium text-icon mb-3">{platform.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {platform.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Tutti i dati sincronizzati in tempo reale tra i tuoi dispositivi
          </p>
        </div>
      </div>
    </section>
  );
}
