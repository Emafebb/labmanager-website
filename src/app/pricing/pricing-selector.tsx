"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
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

const trial = getCommercialCta("pricing-trial");
export const pricingMagazzinoFeature = {
  summary: MAGAZZINO_CANONICAL_COPY,
  claimIds: MAGAZZINO_CLAIM_IDS,
};
const PLAN_FEATURES: Record<CommercialTier, readonly string[]> = {
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
const GROUPS = [
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
function savings(tier: CommercialTier) {
  return (
    getCommercialOffer(tier, "mensile").prezzo.importoMinore * 12 -
    getCommercialOffer(tier, "annuale").prezzo.importoMinore
  );
}
function ComparisonRow({
  name,
  values,
}: {
  name: string;
  values: ReactNode[];
}) {
  return (
    <tr role="row">
      <th role="rowheader" scope="row">{name}</th>
      {values.map((value, index) => (
        <td key={index} role="cell" data-plan={COMMERCIAL_MANIFEST.tier[index]}>{value}</td>
      ))}
    </tr>
  );
}

export default function PricingSelector() {
  const [periodicita, setPeriodicita] = useState<BillingPeriodicity>("annuale");
  const liveSummary = COMMERCIAL_MANIFEST.tier
    .map(
      (tier) =>
        `${tier} ${formatOfferPrice(getCommercialOffer(tier, periodicita))}`,
    )
    .join(", ");
  const discount = Math.max(
    ...COMMERCIAL_MANIFEST.tier.map((tier) =>
      Math.floor(
        (savings(tier) /
          (getCommercialOffer(tier, "mensile").prezzo.importoMinore * 12)) *
          100,
      ),
    ),
  );
  return (
    <>
      <section
        className="pricing-plans"
        aria-labelledby="pricing-plans-heading"
      >
        <h2 id="pricing-plans-heading" className="sr-only">
          Piani Light e Plus
        </h2>
        <div
          role="group"
          aria-label="Periodicità di fatturazione"
          className="pricing-toggle"
          data-pricing-toggle
        >
          {COMMERCIAL_MANIFEST.periodicita.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={periodicita === value}
              onClick={() => setPeriodicita(value)}
            >
              {value === "mensile" ? "Mensile" : "Annuale"}
              {value === "annuale" && (
                <span aria-hidden="true">Fino a −{discount}%</span>
              )}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Periodicità {periodicita}. {liveSummary}.
        </p>
        <div className="pricing-plans__spread" data-pricing-cards>
          {COMMERCIAL_MANIFEST.tier.map((tier) => {
            const offer = getCommercialOffer(tier, periodicita);
            const annual = periodicita === "annuale";
            const plus = tier === "Plus";
            return (
              <article
                key={tier}
                className={`pricing-plan${plus ? " pricing-plan--plus" : ""}`}
                data-pricing-plan={tier.toLowerCase()}
                data-periodicita={periodicita}
              >
                <header className="pricing-plan__head">
                  <h3>{tier}</h3>
                  {plus && <p>Consigliato per la gestione completa</p>}
                </header>
                <div className="pricing-plan__cost">
                  <p className="pricing-plan__price">
                    {formatCommercialPrice(
                      annual
                        ? Math.round(offer.prezzo.importoMinore / 12)
                        : offer.prezzo.importoMinore,
                    )}
                    <span>/mese</span>
                  </p>
                  {annual && (
                    <p className="pricing-plan__period">
                      Equivalente mensile, con pagamento annuale
                    </p>
                  )}
                  <p className="pricing-plan__billing">
                    {annual ? (
                      <>
                        <strong>Fatturati {formatOfferPrice(offer)}.</strong>{" "}
                        Risparmi {formatCommercialPrice(savings(tier))} rispetto
                        a 12 mesi mensili.
                      </>
                    ) : (
                      "Fatturazione mensile · nessun costo di attivazione"
                    )}
                  </p>
                </div>
                <div className="pricing-plan__features">
                  <p>
                    {plus
                      ? "Per il laboratorio che gestisce produzione, ordini e magazzino."
                      : "Per chi vuole ricette, food cost ed etichette sotto controllo."}
                  </p>
                  <p className="pricing-plan__includes">
                    {plus ? "Tutto di Light, più" : "Nel piano Light"}
                  </p>
                  <ul>
                    {PLAN_FEATURES[tier].map((id) => (
                      <li key={id}>{getCommercialCapability(id).nome}</li>
                    ))}
                  </ul>
                </div>
                <p className="pricing-plan__support">
                  {getCommercialLevel(tier).sessioniSimultanee} sessioni attive
                  simultanee. <br />
                  {describeOfferSupport(offer)}.
                </p>
                <a
                  className="button"
                  href={trial.destination}
                  data-registration-cta
                  aria-describedby="pricing-trial-explanation"
                >
                  {trial.label}
                </a>
              </article>
            );
          })}
        </div>
        <div id="pricing-trial-explanation" className="pricing-trial-note">
          <p>{TRIAL_EXPLANATION}</p>
          <p>
            Senza carta. Scelta del piano e pagamento si gestiscono nell’app
            dopo la registrazione.
          </p>
        </div>
      </section>
      <section
        className="pricing-comparison section-space"
        aria-labelledby="pricing-comparison-heading"
      >
        <div className="section-intro">
          <h2 id="pricing-comparison-heading">
            Il confronto, <br />
            per intero.
          </h2>
          <p>
            Le funzionalità dipendono dal piano. Con l’annuale cambiano prezzo e
            supporto, non i moduli inclusi.
          </p>
        </div>
        <table role="table" data-pricing-comparison>
          <caption className="sr-only">
            Moduli e condizioni inclusi nei piani LabManager Light e Plus
          </caption>
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Moduli e condizioni</th>
              <th role="columnheader" scope="col">Light</th>
              <th role="columnheader" scope="col">Plus</th>
            </tr>
          </thead>
          {GROUPS.map((group) => (
            <tbody key={group.label} role="rowgroup">
              <tr role="row" className="comparison-group">
                <th role="columnheader" colSpan={3} scope="colgroup">
                  {group.label}
                </th>
              </tr>
              {group.ids.map((id) => {
                const capability = getCommercialCapability(id);
                return (
                  <tr
                    role="row"
                    key={id}
                    data-magazzino-claim-ids={
                      id === "magazzino_ddt"
                        ? MAGAZZINO_CLAIM_ID_ATTRIBUTE
                        : undefined
                    }
                  >
                    <th role="rowheader" scope="row">
                      {capability.nome}
                      {id === "food_cost_ricetta" && " e menu"}
                    </th>
                    <td role="cell" data-plan="Light">
                      {capability.tierMinimo === "Light"
                        ? "Incluso"
                        : "Non incluso"}
                    </td>
                    <td role="cell" data-plan="Plus">Incluso</td>
                  </tr>
                );
              })}
              {group.label === "Progettazione e ricette" && (
                <ComparisonRow
                  name="Libro ingredienti"
                  values={[
                    "Assortimenti e consultazione",
                    "Assortimenti, consultazione, generazione e storico PDF",
                  ]}
                />
              )}
            </tbody>
          ))}
          <tbody role="rowgroup">
            <tr role="row" className="comparison-group">
              <th role="columnheader" colSpan={3} scope="colgroup">
                Limiti e supporto
              </th>
            </tr>
            <ComparisonRow
              name="Importazioni AI ricette al giorno"
              values={COMMERCIAL_MANIFEST.tier.map(
                (tier) => getCommercialLevel(tier).quoteAiGiornaliere.recipe,
              )}
            />
            <ComparisonRow
              name="Importazioni AI DDT al giorno"
              values={COMMERCIAL_MANIFEST.tier.map(
                (tier) =>
                  getCommercialLevel(tier).quoteAiGiornaliere.ddt ||
                  "Non incluse",
              )}
            />
            <ComparisonRow
              name="Sessioni attive simultanee"
              values={COMMERCIAL_MANIFEST.tier.map(
                (tier) => getCommercialLevel(tier).sessioniSimultanee,
              )}
            />
            {COMMERCIAL_MANIFEST.periodicita.map((value) => (
              <ComparisonRow
                key={value}
                name={`Supporto ${value}`}
                values={COMMERCIAL_MANIFEST.tier.map((tier) =>
                  describeOfferSupport(getCommercialOffer(tier, value)),
                )}
              />
            ))}
            <ComparisonRow
              name="Esportazioni dei moduli inclusi"
              values={COMMERCIAL_MANIFEST.tier.map(
                (tier) => getCommercialLevel(tier).esportazioni.moduliInclusi,
              )}
            />
          </tbody>
        </table>
        <p className="pricing-device">
          {DEVICE_CONTACT_PROMPT}{" "}
          <Link href="/#contatti" className="text-link">
            {DEVICE_CONTACT_LINK_LABEL}
          </Link>
        </p>
      </section>
    </>
  );
}
