import Link from "next/link";
import { ArrowRight, CalendarDays, PackageCheck, Wallet } from "lucide-react";

const highlights = [
  {
    icon: CalendarDays,
    title: "Ordini chiari",
    text: "Cliente anagrafica o rapido, sede, data evasione, ritiro o consegna.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Ricette, assemblaggi, lotti e piano di lavoro restano nello stesso flusso.",
  },
  {
    icon: Wallet,
    title: "Incassi sotto controllo",
    text: "Acconti, saldo, residuo cliente e report per seguire consegne e pagamenti.",
  },
];

export default function OrdersPreview() {
  return (
    <section
      id="ordini"
      className="bg-[#FAFBFE] py-20"
      aria-labelledby="orders-preview-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">
                Nuovo modulo
              </span>
            </div>

            <h2
              id="orders-preview-heading"
              className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Ordini e piano di lavoro collegati a produzione, cassa e
              laboratorio
            </h2>

            <p className="mb-7 text-lg leading-relaxed text-gray-600">
              Gestisci ordini cliente, ritiri, consegne, acconti e report senza
              separare il lavoro del banco da quello del laboratorio.
            </p>

            <Link
              href="/ordini"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              Scopri il modulo ordini
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                    <item.icon
                      className="text-primary"
                      size={21}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
