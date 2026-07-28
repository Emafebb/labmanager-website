import {
  ArrowLeftRight,
  BellRing,
  Boxes,
  LayoutDashboard,
  PackageMinus,
  PackagePlus,
  SlidersHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";

const capabilityIcons: Record<
  (typeof MAGAZZINO_CAPABILITIES)[number]["id"],
  LucideIcon
> = {
  "magazzino.ricevimento-merci": PackagePlus,
  "magazzino.giacenze-per-sede": LayoutDashboard,
  "magazzino.soglie-configurabili": SlidersHorizontal,
  "magazzino.scarico-fifo": PackageMinus,
  "magazzino.alert-scadenze": BellRing,
  "magazzino.trasferimenti-tra-sedi": ArrowLeftRight,
};

export default function Warehouse() {
  return (
    <section
      id="magazzino"
      className="home-warehouse bg-white py-14 sm:py-16"
      aria-labelledby="warehouse-heading"
    >
      <div className="home-route-section__inner home-warehouse__inner mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="home-route-summary">
            <div className="home-route-section__node" aria-hidden="true">
              <Boxes size={24} />
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-primary">
                Passaggio 05 · Controllo scorte
              </p>
              <h2
                id="warehouse-heading"
                className="text-4xl font-bold leading-none tracking-[-0.03em] text-foreground sm:text-5xl"
              >
                Magazzino
              </h2>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
                data-magazzino-claim-ids={MAGAZZINO_CLAIM_ID_ATTRIBUTE}
              >
                {MAGAZZINO_CANONICAL_COPY}
              </p>
            </div>
          </div>

          <ol className="home-warehouse__manifest">
            {MAGAZZINO_CAPABILITIES.map((capability) => {
              const Icon = capabilityIcons[capability.id];

              return (
                <li key={capability.id}>
                  <Icon
                    size={20}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{capability.publicCopy}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
