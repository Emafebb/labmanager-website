import commercialManifestJson from "../../config/commerciale/manifesto-commerciale.v1.json";

export type CommercialTier = "Light" | "Plus";
export type BillingPeriodicity = "mensile" | "annuale";

type CommercialLevel = {
  tier: CommercialTier;
  featureIds: string[];
  sessioniSimultanee: number;
  quoteAiGiornaliere: { recipe: number; ddt: number };
  esportazioni: {
    moduliInclusi: "illimitate";
    watermark: false;
    contatore: false;
  };
};

type CommercialCapability = {
  id: string;
  nome: string;
  tierMinimo: CommercialTier;
};

type CommercialOffer = {
  id: string;
  tier: CommercialTier;
  periodicita: BillingPeriodicity;
  prezzo: { importoMinore: number; valuta: "EUR" };
  costoAttivazioneMinore: number;
  supporto: {
    livello: "email_standard" | "prioritario";
    sessioniIndividuali: string[];
  };
};

type CommercialManifest = {
  version: string;
  valuta: "EUR";
  tier: CommercialTier[];
  periodicita: BillingPeriodicity[];
  livelli: CommercialLevel[];
  capacita: CommercialCapability[];
  offerte: CommercialOffer[];
};

export const COMMERCIAL_MANIFEST =
  commercialManifestJson as unknown as CommercialManifest;

export const TRIAL_DAYS = 14;
export const TRIAL_CTA_LABEL = `Prova gratis ${TRIAL_DAYS} giorni`;
export const TRIAL_EXPLANATION =
  "La prova include tutte le funzionalità Plus. Al termine scegli il piano più adatto.";
export const DEVICE_CONTACT_COPY =
  "Hai bisogno di più dispositivi? Contattaci";

export function getCommercialOffer(
  tier: CommercialTier,
  periodicita: BillingPeriodicity,
) {
  const offer = COMMERCIAL_MANIFEST.offerte.find(
    (candidate) =>
      candidate.tier === tier && candidate.periodicita === periodicita,
  );
  if (!offer) {
    throw new Error(`Offerta commerciale mancante: ${tier} ${periodicita}`);
  }
  return offer;
}

export function getCommercialLevel(tier: CommercialTier) {
  const level = COMMERCIAL_MANIFEST.livelli.find(
    (candidate) => candidate.tier === tier,
  );
  if (!level) throw new Error(`Livello commerciale mancante: ${tier}`);
  return level;
}

export function getCommercialCapability(id: string) {
  const capability = COMMERCIAL_MANIFEST.capacita.find(
    (candidate) => candidate.id === id,
  );
  if (!capability) throw new Error(`Capacità commerciale mancante: ${id}`);
  return capability;
}

export function formatCommercialPrice(amountMinor: number) {
  const euros = Math.floor(amountMinor / 100);
  const cents = amountMinor % 100;
  return cents === 0
    ? `€${euros}`
    : `€${euros},${cents.toString().padStart(2, "0")}`;
}

export function formatOfferPrice(offer: CommercialOffer) {
  const suffix = offer.periodicita === "mensile" ? "mese" : "anno";
  return `${formatCommercialPrice(offer.prezzo.importoMinore)}/${suffix}`;
}

export function describeOfferSupport(offer: CommercialOffer) {
  if (offer.supporto.livello === "email_standard") {
    return "Supporto email standard";
  }
  if (offer.supporto.sessioniIndividuali.length === 0) {
    return "Supporto prioritario";
  }
  return `Supporto prioritario + ${offer.supporto.sessioniIndividuali.length} sessioni individuali (iniziale e revisione)`;
}

export function commercialPriceSummary() {
  const lightMonthly = getCommercialOffer("Light", "mensile");
  const lightAnnual = getCommercialOffer("Light", "annuale");
  const plusMonthly = getCommercialOffer("Plus", "mensile");
  const plusAnnual = getCommercialOffer("Plus", "annuale");

  return `Light costa ${formatCommercialPrice(lightMonthly.prezzo.importoMinore)} al mese o ${formatCommercialPrice(lightAnnual.prezzo.importoMinore)} all'anno; Plus costa ${formatCommercialPrice(plusMonthly.prezzo.importoMinore)} al mese o ${formatCommercialPrice(plusAnnual.prezzo.importoMinore)} all'anno.`;
}
