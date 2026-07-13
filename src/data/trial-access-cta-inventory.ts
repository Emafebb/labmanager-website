export const TRIAL_ACCESS_APP_HREF =
  "https://app.labmanagergestionale.com" as const;

export type TrialAccessCtaIntent = "start-trial" | "access-app";

export type TrialAccessCtaInventoryItem = Readonly<{
  id: string;
  route: "/" | "/ordini" | "/pricing";
  label: string;
  context?: string;
  intent: TrialAccessCtaIntent;
  expectedHref: typeof TRIAL_ACCESS_APP_HREF;
}>;

export const TRIAL_ACCESS_CTA_INVENTORY = [
  {
    id: "ordini-trial",
    route: "/ordini",
    label: "Richiedi una prova gratuita",
    intent: "start-trial",
    expectedHref: TRIAL_ACCESS_APP_HREF,
  },
  {
    id: "pricing-trial",
    route: "/pricing",
    label: "Inizia la prova gratis",
    intent: "start-trial",
    expectedHref: TRIAL_ACCESS_APP_HREF,
  },
  {
    id: "homepage-trial-faq",
    route: "/",
    label: "Registrati nella web app",
    context: "Come posso provare l'app?",
    intent: "start-trial",
    expectedHref: TRIAL_ACCESS_APP_HREF,
  },
  {
    id: "homepage-ios-access-faq",
    route: "/",
    label: "Accedi alla web app",
    context: "Sarà disponibile per iPhone/iPad?",
    intent: "access-app",
    expectedHref: TRIAL_ACCESS_APP_HREF,
  },
] as const satisfies readonly TrialAccessCtaInventoryItem[];
