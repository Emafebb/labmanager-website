"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Minus } from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_IDS,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import {
  COMMERCIAL_MANIFEST,
  DEVICE_CONTACT_COPY,
  TRIAL_EXPLANATION,
  type BillingPeriodicity,
  type CommercialTier,
  describeOfferSupport,
  formatOfferPrice,
  getCommercialCapability,
  getCommercialLevel,
  getCommercialOffer,
} from "@/lib/pricing";

const pricingTrialCta = getCommercialCta("pricing-trial");

export const pricingMagazzinoFeature = {
  summary: MAGAZZINO_CANONICAL_COPY,
  claimIds: MAGAZZINO_CLAIM_IDS,
};

const CARD_FEATURE_IDS: Record<CommercialTier, readonly string[]> = {
  Light: [
    "ricette_archivio",
    "food_cost_ricetta",
    "bilanciamento",
    "tabelle_nutrizionali",
    "etichette_storico",
    "team_dipendenti",
  ],
  Plus: [
    "registro_produzione",
    "ordini_piano_lavoro",
    "vendite",
    "costi_aziendali",
    "magazzino_ddt",
  ],
};

function Inclusion({ included }: { included: boolean }) {
  return included ? (
    <span className="inline-flex items-center gap-1.5 font-semibold text-green-700">
      <Check size={17} aria-hidden="true" /> Incluso
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-gray-400">
      <Minus size={17} aria-hidden="true" /> Non incluso
    </span>
  );
}

export default function PricingSelector() {
  const [periodicita, setPeriodicita] =
    useState<BillingPeriodicity>("mensile");

  return (
    <>
      <section className="mb-20 px-6" aria-labelledby="pricing-plans-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="pricing-plans-heading" className="sr-only">
            Piani Light e Plus
          </h2>

          <div
            role="group"
            aria-label="Periodicità di fatturazione"
            className="mx-auto mb-10 flex w-fit rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm"
            data-pricing-toggle
          >
            {COMMERCIAL_MANIFEST.periodicita.map((value) => {
              const selected = value === periodicita;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPeriodicita(value)}
                  className={`touch-target rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition-colors ${
                    selected
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2" data-pricing-cards>
            {COMMERCIAL_MANIFEST.tier.map((tier) => {
              const offer = getCommercialOffer(tier, periodicita);
              const level = getCommercialLevel(tier);
              const isRecommended = tier === "Plus";

              return (
                <article
                  key={tier}
                  data-pricing-plan={tier.toLowerCase()}
                  data-periodicita={periodicita}
                  className={`relative flex flex-col rounded-3xl bg-white p-7 shadow-lg sm:p-9 ${
                    isRecommended
                      ? "border-2 border-primary"
                      : "border border-gray-200"
                  }`}
                >
                  {isRecommended ? (
                    <p className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                      Consigliato
                    </p>
                  ) : null}

                  <p className="text-sm font-bold uppercase tracking-wider text-primary">
                    LabManager
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {tier}
                  </h3>
                  <p className="mt-4 text-4xl font-bold text-gray-900">
                    {formatOfferPrice(offer)}
                  </p>
                  <p className="mt-2 text-sm capitalize text-gray-500">
                    Fatturazione {periodicita} · nessun costo di attivazione
                  </p>

                  <p className="mt-6 min-h-12 leading-relaxed text-gray-600">
                    {tier === "Light"
                      ? "Gli strumenti tecnici essenziali per progettare, calcolare e lavorare in team."
                      : "La gestione completa del laboratorio, con tutti i moduli operativi."}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 text-sm text-gray-700">
                    {CARD_FEATURE_IDS[tier].map((id) => (
                      <li key={id} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{getCommercialCapability(id).nome}</span>
                      </li>
                    ))}
                    {tier === "Plus" ? (
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>Tutto ciò che è incluso in Light</span>
                      </li>
                    ) : null}
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{level.sessioniSimultanee} dispositivi simultanei</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{describeOfferSupport(offer)}</span>
                    </li>
                  </ul>

                  <a
                    href={pricingTrialCta.destination}
                    data-registration-cta
                    className={`touch-target mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-center text-base font-semibold transition-colors ${
                      isRecommended
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border-2 border-primary text-primary hover:bg-primary/5"
                    }`}
                  >
                    {pricingTrialCta.label}
                  </a>
                  <p className="mt-4 text-center text-sm leading-relaxed text-gray-600">
                    {TRIAL_EXPLANATION}
                  </p>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Senza carta. Il pagamento si gestisce solo nell&apos;app dopo
                    la registrazione.
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="bg-surface px-6 py-20"
        aria-labelledby="pricing-comparison-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="pricing-comparison-heading"
            className="text-center text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Confronta Light e Plus
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            La periodicità cambia prezzo e supporto, non i moduli inclusi nel
            livello scelto.
          </p>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-sm" data-pricing-comparison>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th scope="col" className="px-6 py-4 text-left font-bold text-gray-700">
                    Moduli e condizioni
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-bold text-gray-900">
                    Light
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-bold text-primary">
                    Plus
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMERCIAL_MANIFEST.capacita.map((capability, index) => (
                  <tr
                    key={capability.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    data-magazzino-claim-ids={
                      capability.id === "magazzino_ddt"
                        ? MAGAZZINO_CLAIM_ID_ATTRIBUTE
                        : undefined
                    }
                  >
                    <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                      {capability.nome}
                    </th>
                    <td className="px-6 py-3 text-center">
                      <Inclusion included={capability.tierMinimo === "Light"} />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <Inclusion included />
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200 bg-white">
                  <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                    Importazioni AI ricette al giorno
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td key={tier} className="px-6 py-3 text-center font-semibold text-gray-700">
                      {getCommercialLevel(tier).quoteAiGiornaliere.recipe}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50">
                  <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                    Importazioni AI DDT al giorno
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => {
                    const quota = getCommercialLevel(tier).quoteAiGiornaliere.ddt;
                    return (
                      <td key={tier} className="px-6 py-3 text-center font-semibold text-gray-700">
                        {quota === 0 ? "Non incluse" : quota}
                      </td>
                    );
                  })}
                </tr>
                <tr className="bg-white">
                  <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                    Dispositivi simultanei
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td key={tier} className="px-6 py-3 text-center font-semibold text-gray-700">
                      {getCommercialLevel(tier).sessioniSimultanee}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50/50">
                  <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                    Supporto ({periodicita})
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td key={tier} className="px-6 py-3 text-center text-gray-700">
                      {describeOfferSupport(getCommercialOffer(tier, periodicita))}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <th scope="row" className="px-6 py-3 text-left font-medium text-gray-700">
                    Esportazioni dei moduli inclusi
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td key={tier} className="px-6 py-3 text-center font-semibold capitalize text-gray-700">
                      {getCommercialLevel(tier).esportazioni.moduliInclusi}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p
            className="mt-8 text-center font-semibold text-gray-700"
            aria-label={DEVICE_CONTACT_COPY}
          >
            Hai bisogno di più dispositivi?{" "}
            <Link className="text-primary underline underline-offset-4" href="/#contatti">
              Contattaci
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
