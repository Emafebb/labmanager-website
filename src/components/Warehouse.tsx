import {
  PackagePlus,
  LayoutDashboard,
  PackageMinus,
  BellRing,
  ArrowLeftRight,
  SlidersHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CAPABILITIES,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
}

const capabilityIcons: Record<(typeof MAGAZZINO_CAPABILITIES)[number]["id"], LucideIcon> = {
  "magazzino.ricevimento-merci": PackagePlus,
  "magazzino.giacenze-per-sede": LayoutDashboard,
  "magazzino.soglie-configurabili": SlidersHorizontal,
  "magazzino.scarico-fifo": PackageMinus,
  "magazzino.alert-scadenze": BellRing,
  "magazzino.trasferimenti-tra-sedi": ArrowLeftRight,
};

const features: FeatureItem[] = MAGAZZINO_CAPABILITIES.map((capability) => ({
  icon: capabilityIcons[capability.id],
  title: capability.publicCopy,
}));

export default function Warehouse() {
  return (
    <section id="magazzino" className="py-24 bg-surface" aria-labelledby="warehouse-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">
                Nuovo modulo
              </span>
            </div>
          </div>

          <h2
            id="warehouse-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Magazzino
          </h2>
          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            data-magazzino-claim-ids={MAGAZZINO_CLAIM_ID_ATTRIBUTE}
          >
            {MAGAZZINO_CANONICAL_COPY}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-4">
                <feature.icon className="text-primary" size={22} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
