export const PRICING = {
  monthly: {
    price: 44.99,
  },
  yearly: {
    price: 480,
    monthlyEquivalent: 40,
    saving: 60,
  },
  trialDays: 14,
  dailyCost: 2,
} as const;

export type BillingPlan = "monthly" | "annual";
