import Link from "next/link";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import {
  formatCommercialPrice,
  formatOfferPrice,
  getCommercialOffer,
  TRIAL_EXPLANATION,
} from "@/lib/pricing";

export default function TrialCallout() {
  const trial = getCommercialCta("home-trial");
  const lightAnnual = getCommercialOffer("Light", "annuale");
  const plusAnnual = getCommercialOffer("Plus", "annuale");
  return (
    <section className="trial section-space" aria-labelledby="trial-heading">
      <div className="section-intro" data-reveal>
        <h2 id="trial-heading">
          Il tuo prossimo <br />
          passo.
        </h2>
        <p>
          Parti dalle ricette o collega tutta l’attività. La prova ti dà il
          tempo di capire come lavorare con LabManager.
        </p>
      </div>
      <div className="trial__plans">
        <div className="trial__plan" data-reveal>
          <h3>Light</h3>
          <p>
            Ricette, Food Cost, bilanciamento ed etichette.
          </p>
          <div>
            <p className="trial__price">
              {formatCommercialPrice(Math.round(lightAnnual.prezzo.importoMinore / 12))}
              <span>/mese</span>
            </p>
            <p className="trial__billing">
              Con pagamento annuale.<br />
              Fatturati {formatOfferPrice(lightAnnual)}.
            </p>
          </div>
        </div>
        <div className="trial__plan" data-reveal>
          <h3>Plus</h3>
          <p>
            In più, produzione, ordini e gestione dell’attività.
          </p>
          <div>
            <p className="trial__price">
              {formatCommercialPrice(Math.round(plusAnnual.prezzo.importoMinore / 12))}
              <span>/mese</span>
            </p>
            <p className="trial__billing">
              Con pagamento annuale.<br />
              Fatturati {formatOfferPrice(plusAnnual)}.
            </p>
          </div>
        </div>
        <div className="trial__start" data-reveal>
          <p>{TRIAL_EXPLANATION}</p>
          <a className="button" href={trial.destination}>
            {trial.label}
          </a>
          <Link href="/pricing" className="text-link">
            Prezzi e confronto completo
          </Link>
          <p className="small-note">
            Disponibili anche con pagamento mensile. Nessun costo di
            attivazione.
          </p>
        </div>
      </div>
    </section>
  );
}
