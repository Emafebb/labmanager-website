import { ChefHat, ClipboardCheck } from "lucide-react";

const pillars = [
  {
    icon: ChefHat,
    title: "Ricette e Food Cost",
    description:
      "Organizza ricette e ingredienti, calcola costi e margini delle preparazioni.",
    accent: "from-primary/10 to-icon/10",
  },
  {
    icon: ClipboardCheck,
    title: "Produzione ed Etichette",
    description:
      "Organizza la produzione e prepara etichette con allergeni e documenti PDF.",
    accent: "from-amber-50 to-orange-50",
  },
] as const;

export default function Features() {
  return (
    <section
      id="funzionalita"
      className="bg-white py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Funzionalità
          </p>
          <h2
            id="features-heading"
            className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Organizza il lavoro del laboratorio
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            LabManager riunisce le attività essenziali di pasticcerie,
            panifici e gelaterie in quattro aree chiare.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-40`}
              />
              <div className="relative">
                <div className="mb-5 w-fit rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <pillar.icon
                    className="text-primary"
                    size={28}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
