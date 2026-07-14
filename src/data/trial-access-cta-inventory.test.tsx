import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OrdersPage, { metadata as ordersMetadata } from "@/app/ordini/page";
import { metadata as homeMetadata } from "@/app/page";
import PricingPage, { metadata as pricingMetadata } from "@/app/pricing/page";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import {
  TRIAL_ACCESS_APP_HREF,
  TRIAL_ACCESS_CTA_INVENTORY,
} from "@/data/trial-access-cta-inventory";

function getInventoryItem(
  id: (typeof TRIAL_ACCESS_CTA_INVENTORY)[number]["id"],
) {
  const item = TRIAL_ACCESS_CTA_INVENTORY.find((cta) => cta.id === id);
  if (!item) throw new Error(`Missing CTA inventory item: ${id}`);
  return item;
}

function expectSameTabLink(link: HTMLElement, destination: string) {
  expect(link).toHaveAttribute("href", destination);
  expect(link).not.toHaveAttribute("target");
}

describe("commercial CTA inventory", () => {
  it("contains exactly the five approved actions and their opening behavior", () => {
    expect(TRIAL_ACCESS_CTA_INVENTORY).toEqual([
      {
        id: "home-trial",
        route: "/",
        placements: ["home"],
        label: "Registrati per una prova gratuita",
        intent: "start-trial",
        destination: "https://app.labmanagergestionale.com",
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
        destination: "https://app.labmanagergestionale.com",
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
        destination: "https://app.labmanagergestionale.com",
        openingBehavior: "same-tab",
      },
    ]);
  });

  it("renders the approved Home actions in the same tab", () => {
    const trial = getInventoryItem("home-trial");
    const features = getInventoryItem("home-features");
    render(<Hero />);

    expectSameTabLink(
      screen.getByRole("link", { name: trial.label }),
      trial.destination,
    );
    expectSameTabLink(
      screen.getByRole("link", { name: features.label }),
      features.destination,
    );
    expect(screen.queryByText("Richiedi una prova gratuita")).toBeNull();
  });

  it("renders only the approved commercial action on Orders", () => {
    const cta = getInventoryItem("orders-pricing");
    render(<OrdersPage />);

    const main = within(screen.getByRole("main"));
    expectSameTabLink(
      main.getByRole("link", { name: cta.label }),
      cta.destination,
    );
    expect(main.queryByRole("link", { name: /prova|accedi/i })).toBeNull();
    expect(
      main.queryByRole("link", { name: /download|scarica/i }),
    ).toBeNull();
  });

  it("renders the approved Pricing trial action in the same tab", () => {
    const cta = getInventoryItem("pricing-trial");
    render(<PricingPage />);

    expectSameTabLink(
      within(screen.getByRole("main")).getByRole("link", {
        name: cta.label,
      }),
      cta.destination,
    );
  });

  it("keeps FAQ actions outside the app trial and access matrix", () => {
    const { container } = render(<FAQ />);

    expect(
      container.querySelector(`a[href="${TRIAL_ACCESS_APP_HREF}"]`),
    ).toBeNull();
    expect(screen.queryByRole("link", { name: /prova|accedi/i })).toBeNull();
  });

  it("uses absolute page titles so Next cannot append the brand twice", () => {
    expect(homeMetadata.title).toEqual({
      absolute:
        "Gestionale per pasticcerie, panifici e gelaterie | LabManager",
    });
    expect(ordersMetadata.title).toEqual({
      absolute: "Gestione ordini e piano di lavoro | LabManager",
    });
    expect(pricingMetadata.title).toEqual({
      absolute: "Prezzi e prova gratuita | LabManager",
    });
  });
});
