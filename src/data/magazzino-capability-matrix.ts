export const MAGAZZINO_REQUIRED_SURFACES = [
  "warehouse",
  "faq",
  "pricing",
  "changelog",
  "llms",
  "software-application",
] as const;

export type MagazzinoSurface = (typeof MAGAZZINO_REQUIRED_SURFACES)[number];

export const MAGAZZINO_CAPABILITIES = [
  {
    id: "magazzino.ricevimento-merci",
    publicCopy: "Ricevimento merci",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
  {
    id: "magazzino.giacenze-per-sede",
    publicCopy: "Giacenze per sede",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
  {
    id: "magazzino.soglie-configurabili",
    publicCopy: "Soglie configurabili",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
  {
    id: "magazzino.scarico-fifo",
    publicCopy: "Scarico FIFO",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
  {
    id: "magazzino.alert-scadenze",
    publicCopy: "Alert scadenze",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
  {
    id: "magazzino.trasferimenti-tra-sedi",
    publicCopy: "Trasferimenti tra sedi",
    approvedBy: "Committente",
    approvedOn: "2026-07-13",
    available: true,
    marketable: true,
    requiredSurfaces: MAGAZZINO_REQUIRED_SURFACES,
  },
] as const;

export type MagazzinoCapability = (typeof MAGAZZINO_CAPABILITIES)[number];
export type MagazzinoClaimId = MagazzinoCapability["id"];

export const MAGAZZINO_CLAIM_IDS = MAGAZZINO_CAPABILITIES.map(
  ({ id }) => id,
) as readonly MagazzinoClaimId[];

export const MAGAZZINO_CLAIM_ID_ATTRIBUTE = MAGAZZINO_CLAIM_IDS.join(" ");

export const MAGAZZINO_CANONICAL_COPY =
  "Gestione magazzino con ricevimento merci, giacenze per sede, soglie configurabili, scarico FIFO, alert scadenze e trasferimenti tra sedi.";
