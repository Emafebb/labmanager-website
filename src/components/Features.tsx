import Link from "next/link";
import { WORK_AREAS } from "@/data/work-areas";
import { PRODUCT_FEATURES } from "@/data/product-features";
import {
  MAGAZZINO_CANONICAL_COPY,
  MAGAZZINO_CLAIM_ID_ATTRIBUTE,
} from "@/data/magazzino-capability-matrix";

export default function Features() {
  return (
    <section
      id="funzionalita"
      className="features section-space"
      aria-labelledby="features-heading"
    >
      <div className="features__intro" data-reveal>
        <h2 id="features-heading">
          Ogni dettaglio <br />
          conta.
        </h2>
        <p>
          Il peso di un ingrediente. Il costo di una porzione. Un ordine da
          consegnare. LabManager tiene insieme il lavoro tecnico e la gestione
          dell’attività.
        </p>
        <Link href="/pricing" className="text-link">
          Confronta Light e Plus
        </Link>
      </div>
      <div className="features__index">
        {PRODUCT_FEATURES.map((feature) => (
          <details
            key={feature.id}
            id={feature.id}
            className="feature"
            data-reveal
          >
            <summary>
              <span>{feature.title}</span>
              <span className="feature__plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="feature__body">
              <p>{feature.description}</p>
              <ul>
                {feature.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {feature.id === "magazzino" && (
                <p data-magazzino-claim-ids={MAGAZZINO_CLAIM_ID_ATTRIBUTE}>
                  {MAGAZZINO_CANONICAL_COPY}
                </p>
              )}
              {WORK_AREAS.filter((area) =>
                area.featureIds.some((id) => id === feature.id),
              ).map((area) => (
                <Link
                  href={area.href}
                  className="text-link feature__area-link"
                  key={area.href}
                >
                  Approfondisci {area.title}
                </Link>
              ))}
              {feature.id === "libro-ingredienti" && (
                <p>
                  Light include assortimenti e consultazione. Plus aggiunge
                  generazione e storico PDF.
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
