"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  Minus,
  Scale,
} from "lucide-react";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_IDS,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import {
  COMMERCIAL_MANIFEST,
  DEVICE_CONTACT_LINK_LABEL,
  DEVICE_CONTACT_PROMPT,
  TRIAL_EXPLANATION,
  type BillingPeriodicity,
  type CommercialTier,
  describeOfferSupport,
  formatCommercialPrice,
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

const CARD_TAGLINES: Record<CommercialTier, string> = {
  Light: "Per chi vuole ricette, food cost ed etichette sotto controllo.",
  Plus: "Per il laboratorio che gestisce produzione, ordini e magazzino.",
};

const COMPARISON_GROUPS: readonly {
  label: string;
  ids: readonly string[];
}[] = [
  {
    label: "Progettazione e ricette",
    ids: [
      "ricette_archivio",
      "confronto_ricette",
      "food_cost_ricetta",
      "bilanciamento",
      "ingredienti_semilavorati",
      "assemblaggi",
      "tabelle_nutrizionali",
      "etichette_storico",
      "tools_laboratorio",
    ],
  },
  {
    label: "Produzione e gestione",
    ids: [
      "registro_produzione",
      "ordini_piano_lavoro",
      "vendite",
      "costi_aziendali",
      "magazzino_ddt",
    ],
  },
  {
    label: "Team e impostazioni",
    ids: [
      "team_dipendenti",
      "pin_ruoli_permessi_light",
      "impostazioni_gestione_abbonamento",
    ],
  },
];

const PLUS_ONLY_IDS = CARD_FEATURE_IDS.Plus;

function annualSavingsMinor(tier: CommercialTier) {
  const monthly = getCommercialOffer(tier, "mensile");
  const annual = getCommercialOffer(tier, "annuale");
  return monthly.prezzo.importoMinore * 12 - annual.prezzo.importoMinore;
}

/** Sconto annuale massimo tra i piani, arrotondato per difetto: il badge non
 *  deve mai promettere più di quanto il manifesto commerciale conceda. */
function maxAnnualDiscountPercent() {
  return Math.max(
    ...COMMERCIAL_MANIFEST.tier.map((tier) => {
      const yearOfMonthly =
        getCommercialOffer(tier, "mensile").prezzo.importoMinore * 12;
      return Math.floor((annualSavingsMinor(tier) / yearOfMonthly) * 100);
    }),
  );
}

function Inclusion({ included }: { included: boolean }) {
  return included ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
      <Check size={14} strokeWidth={3} className="text-primary" aria-hidden="true" />
      <span className="sr-only">Incluso</span>
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center text-gray-500">
      <Minus size={16} aria-hidden="true" />
      <span className="sr-only">Non incluso</span>
    </span>
  );
}

function PlanCard({
  tier,
  periodicita,
}: {
  tier: CommercialTier;
  periodicita: BillingPeriodicity;
}) {
  const offer = getCommercialOffer(tier, periodicita);
  const level = getCommercialLevel(tier);
  const isPlus = tier === "Plus";
  const isAnnual = periodicita === "annuale";
  const TierIcon = isPlus ? Boxes : Scale;

  return (
    <article
      data-pricing-plan={tier.toLowerCase()}
      data-periodicita={periodicita}
      className={`relative flex flex-col rounded-3xl border bg-white p-7 sm:p-9 ${
        isPlus
          ? "border-primary/25 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:-my-4"
          : "border-gray-200 shadow-sm"
      }`}
    >
      {/* Requisito 46 della spec 0009: la card Plus porta il badge
          "Consigliato". È una raccomandazione del venditore, non una prova
          sociale di terzi, che il sito non potrebbe sostanziare. */}
      {isPlus ? (
        <p className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          <BadgeCheck size={13} aria-hidden="true" /> Consigliato
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"
          aria-hidden="true"
        >
          <TierIcon size={22} className="text-primary" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            LabManager
          </p>
          <h3 className="text-2xl font-bold">{tier}</h3>
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-gray-600">
        {CARD_TAGLINES[tier]}
      </p>

      <div className="mt-6">
        <p className="flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight">
            {isAnnual
              ? formatCommercialPrice(
                  Math.round(offer.prezzo.importoMinore / 12),
                )
              : formatCommercialPrice(offer.prezzo.importoMinore)}
          </span>
          <span className="pb-1.5 text-sm font-medium text-gray-600">
            /mese
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {isAnnual ? (
            <>
              Fatturati {formatOfferPrice(offer)} ·{" "}
              <span className="font-semibold text-gray-900">
                risparmi {formatCommercialPrice(annualSavingsMinor(tier))}
              </span>
            </>
          ) : (
            "Fatturazione mensile · nessun costo di attivazione"
          )}
        </p>
      </div>

      <div className="my-7 border-t border-gray-200" />

      {isPlus ? (
        <p className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          <BadgeCheck size={13} aria-hidden="true" /> Tutto di Light, più
        </p>
      ) : null}

      <ul className="flex-1 space-y-3 text-base">
        {CARD_FEATURE_IDS[tier].map((id) => (
          <li key={id} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
              aria-hidden="true"
            >
              <Check size={12} strokeWidth={3.5} className="text-primary" />
            </span>
            <span className="text-gray-700">
              {getCommercialCapability(id).nome}
            </span>
          </li>
        ))}
        <li className="flex items-start gap-2.5 text-gray-600">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <Check size={14} strokeWidth={3} />
          </span>
          <span>
            {level.sessioniSimultanee} sessioni attive simultanee ·{" "}
            {describeOfferSupport(offer)}
          </span>
        </li>
      </ul>

      <a
        href={pricingTrialCta.destination}
        data-registration-cta
        className={`group touch-target mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-base font-bold transition-all duration-200 ${
          isPlus
            ? "bg-primary text-white hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            : "border border-gray-200 bg-white text-gray-700 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
        }`}
      >
        {pricingTrialCta.label}
        <ArrowRight
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
      <p className="mt-4 text-center text-sm leading-relaxed text-gray-600">
        {TRIAL_EXPLANATION}
      </p>
      <p className="mt-2 text-center text-xs text-gray-600">
        Senza carta. Il pagamento si gestisce solo nell&apos;app dopo la
        registrazione.
      </p>
    </article>
  );
}

export default function PricingSelector() {
  const [periodicita, setPeriodicita] =
    useState<BillingPeriodicity>("annuale");
  const discount = maxAnnualDiscountPercent();

  const liveSummary = COMMERCIAL_MANIFEST.tier
    .map((tier) => {
      const offer = getCommercialOffer(tier, periodicita);
      return `${tier} ${formatOfferPrice(offer)}`;
    })
    .join(", ");

  return (
    <>
      <section className="px-6 pb-24" aria-labelledby="pricing-plans-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="pricing-plans-heading" className="sr-only">
            Piani Light e Plus
          </h2>

          <div
            role="group"
            aria-label="Periodicità di fatturazione"
            className="mx-auto mb-12 flex w-fit rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm"
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
                  className={`touch-target flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition-colors duration-200 ${
                    selected
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {value}
                  {value === "annuale" ? (
                    <span
                      aria-hidden="true"
                      className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase ${
                        selected
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      fino a −{discount}%
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* I prezzi cambiano senza ricaricare: senza questo annuncio chi usa
              uno screen reader non percepisce l'effetto del toggle. */}
          <p aria-live="polite" className="sr-only">
            Periodicità {periodicita}. {liveSummary}.
          </p>

          <div
            className="grid gap-6 lg:grid-cols-2 lg:items-center"
            data-pricing-cards
          >
            {COMMERCIAL_MANIFEST.tier.map((tier) => (
              <PlanCard key={tier} tier={tier} periodicita={periodicita} />
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Non sai quale scegliere?
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="font-bold text-primary">Scegli Light se…</p>
                <ul className="mt-3 space-y-2 text-base text-gray-600">
                  <li>· Lavori soprattutto su ricette, costi ed etichette</li>
                  <li>· Gestisci produzione e ordini fuori dall&apos;app</li>
                  <li>· Siete in 1–2 sul gestionale</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6">
                <p className="font-bold text-primary">Scegli Plus se…</p>
                <ul className="mt-3 space-y-2 text-base text-gray-600">
                  <li>
                    · Vuoi ordini, produzione e magazzino in un unico posto
                  </li>
                  <li>· Registri vendite e monitori i costi aziendali</li>
                  <li>· Ricevi DDT e vuoi importarli con l&apos;AI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-surface px-6 py-24"
        aria-labelledby="pricing-comparison-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="pricing-comparison-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Confronto completo
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">
            Le funzionalità dipendono solo dal piano: con l&apos;annuale cambiano
            prezzo e supporto, non i moduli inclusi.
          </p>

          {/* La differenza reale tra i piani sta in cinque moduli: dirla prima
              evita di far cercare cinque righe dentro ventidue. */}
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900">
              In breve: cosa aggiunge Plus
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PLUS_ONLY_IDS.map((id) => (
                <li key={id} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3.5} className="text-primary" />
                  </span>
                  <span className="text-gray-700">
                    {getCommercialCapability(id).nome}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Tutto il resto — ricette, food cost, bilanciamento, etichette,
              team — è incluso in entrambi i piani.
            </p>
          </div>

          <h3 className="mt-14 text-lg font-bold text-gray-900">
            Confronto riga per riga
          </h3>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-sm" data-pricing-comparison>
              <caption className="sr-only">
                Moduli e condizioni inclusi nei piani LabManager Light e Plus
              </caption>
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-1/2 bg-white px-6 py-4 text-left font-bold text-gray-700"
                  >
                    Moduli e condizioni
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-bold text-gray-900"
                  >
                    Light
                  </th>
                  <th
                    scope="col"
                    className="bg-primary/10 px-6 py-4 text-center font-bold text-primary"
                  >
                    Plus
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_GROUPS.map((group) => (
                  <Fragment key={group.label}>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th
                        colSpan={3}
                        scope="colgroup"
                        className="px-6 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        {group.label}
                      </th>
                    </tr>
                    {group.ids.map((id) => {
                      const capability = getCommercialCapability(id);
                      return (
                        <tr
                          key={id}
                          className="border-b border-gray-100"
                          data-magazzino-claim-ids={
                            id === "magazzino_ddt"
                              ? MAGAZZINO_CLAIM_ID_ATTRIBUTE
                              : undefined
                          }
                        >
                          <th
                            scope="row"
                            className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium text-gray-700"
                          >
                            {capability.nome}
                          </th>
                          <td className="px-6 py-3 text-center">
                            <Inclusion
                              included={capability.tierMinimo === "Light"}
                            />
                          </td>
                          <td className="bg-primary/5 px-6 py-3 text-center">
                            <Inclusion included />
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th
                    colSpan={3}
                    scope="colgroup"
                    className="px-6 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                  >
                    Limiti e supporto
                  </th>
                </tr>
                <tr className="border-b border-gray-100">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium text-gray-700"
                  >
                    Importazioni AI ricette al giorno
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td
                      key={tier}
                      className={`px-6 py-3 text-center font-semibold text-gray-700 ${
                        tier === "Plus" ? "bg-primary/5" : ""
                      }`}
                    >
                      {getCommercialLevel(tier).quoteAiGiornaliere.recipe}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium text-gray-700"
                  >
                    Importazioni AI DDT al giorno
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => {
                    const quota = getCommercialLevel(tier).quoteAiGiornaliere.ddt;
                    return (
                      <td
                        key={tier}
                        className={`px-6 py-3 text-center font-semibold text-gray-700 ${
                          tier === "Plus" ? "bg-primary/5" : ""
                        }`}
                      >
                        {quota === 0 ? "Non incluse" : quota}
                      </td>
                    );
                  })}
                </tr>
                {/* Deviazione deliberata dalla parola usata nell'elenco del
                    requisito 49: il limite conta gli accessi contemporanei, non
                    i dispositivi posseduti (requisito 31), e GLOSSARY.md vieta
                    "dispositivi" per descriverlo. Non riportare a "Dispositivi
                    simultanei": dichiarerebbe male l'entitlement. */}
                <tr className="border-b border-gray-100">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium text-gray-700"
                  >
                    Sessioni attive simultanee
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td
                      key={tier}
                      className={`px-6 py-3 text-center font-semibold text-gray-700 ${
                        tier === "Plus" ? "bg-primary/5" : ""
                      }`}
                    >
                      {getCommercialLevel(tier).sessioniSimultanee}
                    </td>
                  ))}
                </tr>
                {/* Due righe distinte: l'etichetta non deve dipendere da un
                    toggle che a questa altezza è fuori schermo. */}
                {COMMERCIAL_MANIFEST.periodicita.map((value) => (
                  <tr key={value} className="border-b border-gray-100">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium capitalize text-gray-700"
                    >
                      Supporto {value}
                    </th>
                    {COMMERCIAL_MANIFEST.tier.map((tier) => (
                      <td
                        key={tier}
                        className={`px-6 py-3 text-center text-gray-700 ${
                          tier === "Plus" ? "bg-primary/5" : ""
                        }`}
                      >
                        {describeOfferSupport(getCommercialOffer(tier, value))}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-6 py-3 text-left font-medium text-gray-700"
                  >
                    Esportazioni dei moduli inclusi
                  </th>
                  {COMMERCIAL_MANIFEST.tier.map((tier) => (
                    <td
                      key={tier}
                      className={`px-6 py-3 text-center font-semibold capitalize text-gray-700 ${
                        tier === "Plus" ? "bg-primary/5" : ""
                      }`}
                    >
                      {getCommercialLevel(tier).esportazioni.moduliInclusi}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center font-semibold text-gray-700">
            {DEVICE_CONTACT_PROMPT}{" "}
            <Link
              className="touch-target inline-flex items-center text-primary underline underline-offset-4"
              href="/#contatti"
            >
              {DEVICE_CONTACT_LINK_LABEL}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
