export const TRIAL_ACCESS_APP_HREF =
  "https://app.labmanagergestionale.com" as const;

export type CommercialCtaIntent =
  | "start-trial"
  | "discover-features"
  | "discover-pricing"
  | "access-app";

export type CommercialCtaRoute = "/" | "/ordini" | "/pricing" | "all-routes";

export type CommercialCtaPlacement =
  | "home"
  | "pricing"
  | "orders"
  | "navbar-desktop"
  | "navbar-mobile";

export type CommercialCtaDestination =
  | typeof TRIAL_ACCESS_APP_HREF
  | "/#funzionalita"
  | "/pricing";

export type CommercialCtaInventoryItem = Readonly<{
  id: string;
  route: CommercialCtaRoute;
  placements: readonly CommercialCtaPlacement[];
  label: string;
  intent: CommercialCtaIntent;
  destination: CommercialCtaDestination;
  openingBehavior: "same-tab";
}>;

export const TRIAL_ACCESS_CTA_INVENTORY = [
  {
    id: "home-trial",
    route: "/",
    placements: ["home"],
    label: "Registrati per una prova gratuita",
    intent: "start-trial",
    destination: TRIAL_ACCESS_APP_HREF,
    openingBehavior: "same-tab",
  },
  {
    id: "home-features",
    route: "/",
    placements: ["home"],
    label: "Scopri le funzionalità",
    intent: "discover-features",
    destination: "/#funzionalita",
    openingBehavior: "same-tab",
  },
  {
    id: "pricing-trial",
    route: "/pricing",
    placements: ["pricing"],
    label: "Registrati per una prova gratuita",
    intent: "start-trial",
    destination: TRIAL_ACCESS_APP_HREF,
    openingBehavior: "same-tab",
  },
  {
    id: "orders-pricing",
    route: "/ordini",
    placements: ["orders"],
    label: "Scopri i prezzi",
    intent: "discover-pricing",
    destination: "/pricing",
    openingBehavior: "same-tab",
  },
  {
    id: "navbar-access",
    route: "all-routes",
    placements: ["navbar-desktop", "navbar-mobile"],
    label: "Accedi",
    intent: "access-app",
    destination: TRIAL_ACCESS_APP_HREF,
    openingBehavior: "same-tab",
  },
] as const satisfies readonly CommercialCtaInventoryItem[];

export type CommercialCtaId =
  (typeof TRIAL_ACCESS_CTA_INVENTORY)[number]["id"];

export function getCommercialCta<Id extends CommercialCtaId>(id: Id) {
  const cta = TRIAL_ACCESS_CTA_INVENTORY.find((item) => item.id === id);
  if (!cta) throw new Error(`Missing commercial CTA: ${id}`);

  return cta as Extract<
    (typeof TRIAL_ACCESS_CTA_INVENTORY)[number],
    { id: Id }
  >;
}
