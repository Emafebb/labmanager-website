import { ArrowDownRight } from "lucide-react";

const pillars = [
  {
    code: "A",
    route: "01—02",
    title: "Ricette e Food Cost",
    description:
      "Organizza ricette, ingredienti e semilavorati. Dallo stesso dato calcoli costi, margini e composizione.",
    outcomes: [
      "Ingredienti, quantità e rese",
      "Costo e margine della ricetta",
      "Confronto tra ricette",
      "Bilanciamento della composizione",
    ],
  },
  {
    code: "B",
    route: "03—04",
    title: "Produzione ed Etichette",
    description:
      "Porta la ricetta nel lavoro quotidiano e prepara etichette coerenti con ciò che produci.",
    outcomes: [
      "Registro di produzione",
      "Allergeni e composizione",
      "Tabelle nutrizionali",
      "Etichette e storico",
    ],
  },
] as const;

export default function Features() {
  return (
    <section
      id="funzionalita"
      className="home-flow-section bg-white py-14 sm:py-16"
      aria-labelledby="features-heading"
    >
      <div className="home-flow-section__inner mx-auto max-w-7xl px-6 lg:px-8">
        <div className="home-flow-section__header grid gap-10 border-b border-gray-200 pb-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-primary">
              <span className="h-px w-10 bg-primary" aria-hidden="true" />
              Dal dato al lavoro
            </p>
            <h2
              id="features-heading"
              className="max-w-xl text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl"
            >
              Una ricetta, due catene sempre allineate
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 lg:justify-self-end">
            LabManager tiene insieme la parte tecnica e quella economica:
            quando una ricetta cambia, il lavoro che ne deriva resta nello
            stesso percorso.
          </p>
        </div>

        <div className="home-pillar-list">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="home-pillar"
              data-route-code={pillar.code}
            >
              <div className="home-pillar__station" aria-hidden="true">
                <span>{pillar.route}</span>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Passaggi {pillar.route}
                </p>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  {pillar.description}
                </p>
              </div>

              <ul className="home-pillar__outcomes">
                {pillar.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <ArrowDownRight
                      size={17}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
