"use client";

import { useState } from "react";

const flowStations = [
  {
    id: "ricetta",
    shortCode: "R",
    label: "Ricetta",
    detail: "Ingredienti, semilavorati, quantità e rese diventano il dato di partenza.",
  },
  {
    id: "food-cost",
    shortCode: "FC",
    label: "Food Cost",
    detail: "Costo ingredienti, margine e bilanciamento restano legati alla preparazione.",
  },
  {
    id: "produzione",
    shortCode: "P",
    label: "Produzione",
    detail: "Il lavoro da preparare parte dalle stesse ricette, senza ricopiare i dati.",
  },
  {
    id: "etichette",
    shortCode: "E",
    label: "Etichette",
    detail: "Allergeni, tabelle nutrizionali e composizione seguono la ricetta aggiornata.",
  },
  {
    id: "magazzino",
    shortCode: "M",
    label: "Magazzino",
    detail: "Ricevimenti, giacenze, FIFO e scadenze restano dentro lo stesso flusso.",
  },
  {
    id: "ordini",
    shortCode: "O",
    label: "Ordini",
    detail: "Ordini cliente e interni arrivano al piano di lavoro e alla produzione collegata.",
  },
] as const;

export default function LabFlowMap() {
  const [activeId, setActiveId] =
    useState<(typeof flowStations)[number]["id"]>("ricetta");
  const activeStation =
    flowStations.find((station) => station.id === activeId) ?? flowStations[0];

  return (
    <div
      className="lab-flow-map"
      data-flow-map
      aria-label="Dalla ricetta all'ordine: il flusso collegato di LabManager"
    >
      <div className="lab-flow-map__datum">
        <div>
          <span className="lab-flow-map__micro">Dato sorgente</span>
          <strong>Una ricetta, due letture</strong>
        </div>
        <div className="lab-flow-map__outputs" aria-hidden="true">
          <span>Economica</span>
          <span>Tecnica</span>
        </div>
      </div>

      <div className="lab-flow-map__stage">
        <div className="lab-flow-map__rail" aria-hidden="true" />
        <ol className="lab-flow-map__stations">
          {flowStations.map((station, index) => {
            const isActive = station.id === activeId;

            return (
              <li key={station.id}>
                <button
                  type="button"
                  className="lab-flow-map__station touch-target"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(station.id)}
                  onFocus={() => setActiveId(station.id)}
                  onMouseEnter={() => setActiveId(station.id)}
                >
                  <span className="lab-flow-map__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="lab-flow-map__label">{station.label}</span>
                  <span className="lab-flow-map__node" aria-hidden="true">
                    <span>{station.shortCode}</span>
                  </span>
                  {isActive && (
                    <span
                      className="lab-flow-map__inline-detail"
                      aria-hidden="true"
                    >
                      {station.detail}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lab-flow-map__detail" role="status" aria-live="polite">
        <span className="lab-flow-map__detail-code">
          {flowStations.findIndex((station) => station.id === activeId) + 1}
          /{flowStations.length}
        </span>
        <p>
          <strong>{activeStation.label}.</strong> {activeStation.detail}
        </p>
      </div>
    </div>
  );
}
