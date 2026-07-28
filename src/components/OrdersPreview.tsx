import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  PackageCheck,
  Wallet,
} from "lucide-react";

const highlights = [
  {
    icon: CalendarDays,
    title: "Ordini cliente e interni",
    text: "Organizza richieste cliente e ordini interni, con ritiro o consegna.",
  },
  {
    icon: PackageCheck,
    title: "Produzione collegata",
    text: "Collega il lavoro di produzione agli ordini e al piano di lavoro.",
  },
  {
    icon: Wallet,
    title: "Acconti e report operativi",
    text: "Segui acconti, saldi e report operativi legati agli ordini.",
  },
] as const;

export default function OrdersPreview() {
  return (
    <section
      id="ordini"
      className="home-orders bg-[#FAFBFE] pb-20 pt-14 sm:pt-16"
      aria-labelledby="orders-preview-heading"
    >
      <div className="home-route-section__inner home-orders__inner mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
          <div className="home-route-summary lg:sticky lg:top-32 lg:self-start">
            <div className="home-route-section__node" aria-hidden="true">
              <ClipboardList size={24} />
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-primary">
                Passaggio 06 · Piano di lavoro
              </p>

              <h2
                id="orders-preview-heading"
                className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
              >
                Ordini e Piano di Lavoro
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                Organizza ordini cliente e interni, produzione collegata,
                ritiro e consegna, acconti e report operativi.
              </p>

              <Link
                href="/ordini"
                className="touch-target group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(68,3,175,0.2)]"
              >
                Scopri il modulo ordini
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="home-orders__track">
            {highlights.map((item) => (
              <article key={item.title} className="home-orders__stop">
                <div className="home-orders__node" aria-hidden="true">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
