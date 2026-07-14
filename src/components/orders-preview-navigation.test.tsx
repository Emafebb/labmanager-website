import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrdersPreview from "@/components/OrdersPreview";
import WhatsAppButton, { WHATSAPP_URL } from "@/components/WhatsAppButton";
import { TRIAL_ACCESS_APP_HREF } from "@/data/trial-access-cta-inventory";

describe("orders preview and navigation", () => {
  it("renders the homepage orders preview with a link to the dedicated page", () => {
    render(<OrdersPreview />);

    expect(screen.getByText("Nuovo modulo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Ordini e piano di lavoro collegati a produzione, cassa e laboratorio",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/cliente anagrafica o rapido/i)).toBeInTheDocument();
    expect(screen.getByText(/residuo cliente e report/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Scopri il modulo ordini" }),
    ).toHaveAttribute("href", "/ordini");
  });

  it("renders the same approved links in order in desktop and mobile navigation", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const desktop = screen.getByRole("list", {
      name: "Navigazione desktop",
    });
    const mobile = screen.getByRole("list", { name: "Navigazione mobile" });
    const expectedLabels = ["Funzionalità", "Ordini", "Prezzi", "Accedi"];
    const expectedHrefs = [
      "/#funzionalita",
      "/ordini",
      "/pricing",
      TRIAL_ACCESS_APP_HREF,
    ];

    for (const navigation of [desktop, mobile]) {
      const links = within(navigation).getAllByRole("link");
      expect(links.map((link) => link.textContent)).toEqual(expectedLabels);
      expect(links.map((link) => link.getAttribute("href"))).toEqual(
        expectedHrefs,
      );
      expect(within(navigation).getByRole("link", { name: "Accedi" })).not.toHaveAttribute(
        "target",
      );
    }

    const menuButton = screen.getByRole("button", { name: "Apri menu" });
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await user.click(within(mobile).getByRole("link", { name: "Prezzi" }));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders only the approved Product, Support, and existing Legal footer links", () => {
    render(<Footer />);

    const footer = within(
      screen.getByRole("contentinfo", { name: "Informazioni LabManager" }),
    );
    const product = footer.getByRole("navigation", { name: "Prodotto" });
    const support = footer.getByRole("navigation", { name: "Supporto" });
    const legal = footer.getByRole("navigation", { name: "Legale" });

    expect(
      within(product).getAllByRole("link").map((link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
    ).toEqual([
      ["Funzionalità", "/#funzionalita"],
      ["Ordini", "/ordini"],
      ["Prezzi", "/pricing"],
    ]);
    expect(
      within(support).getAllByRole("link").map((link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
    ).toEqual([
      ["Contatti", "/#contatti"],
      ["Newsletter", "/newsletter"],
      ["WhatsApp", WHATSAPP_URL],
    ]);
    expect(within(legal).getAllByRole("link")).toHaveLength(3);
    expect(
      footer.queryByRole("link", {
        name: /Piattaforme|FAQ|Aggiornamenti|Accedi|prova/i,
      }),
    ).toBeNull();
    expect(
      within(support).getByRole("link", { name: "WhatsApp" }),
    ).toHaveAttribute("target", "_blank");
  });

  it("keeps WhatsApp an assistance path rather than a trial action", () => {
    render(<WhatsAppButton />);

    const link = screen.getByRole("link", {
      name: "Contattaci su WhatsApp",
    });
    expect(link).toHaveAttribute("href", WHATSAPP_URL);
    expect(link).not.toHaveAttribute("href", TRIAL_ACCESS_APP_HREF);
    expect(link).toHaveAccessibleName("Contattaci su WhatsApp");
    expect(link).not.toHaveAccessibleName(/prova|accedi/i);
  });
});
