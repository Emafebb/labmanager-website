export const WORK_AREAS = [
  {
    href: "/ricette-food-cost",
    title: "Ricette e Food Cost",
    description:
      "Dalla formulazione al prezzo: ricette, bilanciamento, assemblaggi, costo per porzione e margini per il laboratorio artigianale alimentare.",
    featureIds: ["ricette", "bilanciamento", "food-cost"],
  },
  {
    href: "/produzione-magazzino",
    title: "Produzione e Magazzino",
    description:
      "Segui preparazioni, lotti, giacenze per sede e scadenze. Collega la produzione alla disponibilità del laboratorio con LabManager Plus.",
    featureIds: ["produzione", "magazzino"],
  },
  {
    href: "/ordini",
    title: "Ordini e Piano di lavoro",
    description:
      "Dalla richiesta alla consegna: ordini cliente e interni, piano di lavoro, produzione collegata, peso effettivo, acconti e saldi.",
    featureIds: ["ordini"],
  },
  {
    href: "/etichette-libro-ingredienti",
    title: "Etichette e Libro ingredienti",
    description:
      "Dai dati della ricetta alle informazioni del prodotto: ingredienti, allergeni, valori nutrizionali, etichette e Libro ingredienti per assortimento.",
    featureIds: ["etichette", "libro-ingredienti"],
  },
  {
    href: "/strumenti",
    title: "Strumenti e calcolatori",
    description:
      "Sette strumenti per il laboratorio: W farine, bagne, lievito madre, impasti, lievitazione, stampi e overrun. Inclusi in Light e Plus.",
    featureIds: ["bilanciamento"],
  },
] as const;

export type WorkArea = (typeof WORK_AREAS)[number];
