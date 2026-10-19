import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import TrialCallout from "@/components/TrialCallout";
import { PRODUCT_FEATURES } from "@/data/product-features";
import { MAGAZZINO_CANONICAL_COPY } from "@/data/magazzino-capability-matrix";
const CANCELLATION_COPY =
  "Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.";

describe("editorial product site", () => {
  it("contains the expanded product catalog, honest imagery and real trial links", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Dalla ricetta al banco.",
    );
    for (const feature of PRODUCT_FEATURES)
      expect(container.querySelector(`#${feature.id}`)).toHaveTextContent(
        feature.title,
      );
    expect(container.querySelector("#libro-ingredienti")).not.toHaveTextContent(
      "In arrivo",
    );
    expect(
      container.querySelectorAll('main img[src^="/images/editorial/"]'),
    ).toHaveLength(4);
    expect(
      screen.getByText(/illustrazioni editoriali generate con AI/),
    ).toBeInTheDocument();
    for (const link of screen.getAllByRole("link", {
      name: "Prova gratis 14 giorni",
    })) {
      expect(link).toHaveAttribute(
        "href",
        "https://app.labmanagergestionale.com",
      );
      expect(link).not.toHaveAttribute("target");
    }
    expect(screen.getByRole("main")).not.toHaveTextContent(
      /tutto offline|conformità garantita|QR pubblico/,
    );
  });
  it("filters the example by craft and opens the relevant product detail", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    const choices = screen.getByRole("group", { name: "Scegli il tuo laboratorio" });
    const pastry = within(choices).getByRole("radio", { name: "Pasticceria" });
    const gelato = within(choices).getByRole("radio", { name: "Gelateria" });
    expect(pastry).toBeChecked();
    expect(gelato).not.toBeChecked();
    await user.click(gelato);
    expect(gelato).toBeChecked();
    expect(pastry).not.toBeChecked();
    expect(gelato).toHaveAttribute("aria-controls", "workflow-gelateria");
    const links = within(
      container.querySelector("#workflow-gelateria") as HTMLElement,
    ).getAllByRole("link", { name: "Bilancia" });
    await user.click(links[0]);
    expect(container.querySelector("#bilanciamento")).toHaveAttribute("open");
    await user.click(pastry);
    expect(pastry).toBeChecked();
    expect(gelato).not.toBeChecked();
  });
  it("offers a restaurant workflow focused on dish costs and menus", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    expect(screen.queryByRole("radio", { name: "Gastronomia" })).toBeNull();
    await user.click(screen.getByRole("radio", { name: "Ristorazione" }));
    const workflow = container.querySelector("#workflow-ristorazione")!;
    expect(workflow).toBeVisible();
    expect(workflow).toHaveTextContent(/costo per porzione/i);
    expect(workflow).toHaveTextContent(/menu/i);
    expect(within(workflow as HTMLElement).getByRole("link", { name: "Sei un consulente?" })).toHaveAttribute("href", "/ricette-food-cost#recipe-menu-heading");
    expect(workflow).toHaveTextContent(/menu dei tuoi clienti/);
    const costLink = within(workflow as HTMLElement).getByRole("link", { name: "Calcola il Food Cost" });
    await user.click(costLink);
    expect(container.querySelector("#food-cost")).toHaveAttribute("open");
    await user.click(screen.getByRole("radio", { name: "Panificio" }));
    expect(screen.getByRole("radio", { name: "Panificio" })).toBeChecked();
  });
  it("shows monthly equivalents with explicit annual billing and totals", () => {
    const { container } = render(<TrialCallout />);
    const plans = container.querySelectorAll(".trial__plan");
    expect(plans[0]).toHaveTextContent("€16,67/mese");
    expect(plans[0]).toHaveTextContent("Fatturati €200/anno.");
    expect(plans[1]).toHaveTextContent("€40/mese");
    expect(plans[1]).toHaveTextContent("Fatturati €480/anno.");
    for (const plan of plans) {
      expect(plan).toHaveTextContent("Con pagamento annuale.");
    }
    expect(container).toHaveTextContent("Disponibili anche con pagamento mensile.");
  });
});

describe("home FAQ contract", () => {
  it("renders exactly the six approved questions from the FAQPage source", async () => {
    const user = userEvent.setup();
    const { container } = render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    const faqJsonLd = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "null",
    ) as {
      mainEntity: Array<{
        name: string;
        acceptedAnswer: { text: string };
      }>;
    };

    expect(buttons).toHaveLength(6);
    expect(faqJsonLd.mainEntity.map(({ name }) => name)).toEqual(
      buttons.map((button) => button.textContent?.trim()),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Come gestisce il magazzino LabManager?",
      }),
    );
    expect(screen.getByText(MAGAZZINO_CANONICAL_COPY)).toBeVisible();
    expect(faqJsonLd.mainEntity).toContainEqual(
      expect.objectContaining({
        name: "Come gestisce il magazzino LabManager?",
        acceptedAnswer: expect.objectContaining({
          text: MAGAZZINO_CANONICAL_COPY,
        }),
      }),
    );
    expect(faqJsonLd.mainEntity).toContainEqual(
      expect.objectContaining({
        name: "Quanto costa LabManager e come funziona la disdetta?",
        acceptedAnswer: expect.objectContaining({
          text: `Light costa €19,99 al mese o €200 all'anno; Plus costa €44,99 al mese o €480 all'anno. ${CANCELLATION_COPY}`,
        }),
      }),
    );
    expect(container).not.toHaveTextContent(
      /rimbor|prorat|android|windows|iphone|ipad|offline|sincronizz|piattaform|ristorant|download|2 sessioni attive simultanee/i,
    );
  });
});

describe("home contact surface", () => {
  it("keeps the form, privacy, optional Newsletter consent, and WhatsApp without legacy promises", () => {
    const { container } = render(<ContactForm />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Parliamo del tuo lavoro.",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeNull();
    expect(screen.getByLabelText(/Ho letto e accetto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Acconsento a ricevere/i)).not.toBeRequired();
    expect(
      screen.getByRole("button", { name: "Invia Messaggio" }),
    ).toHaveAccessibleDescription(
      "Per inviare il messaggio, accetta prima la Privacy Policy.",
    );
    expect(
      screen.getByRole("link", { name: "Scrivici su WhatsApp" }),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(
      /demo|entro 24 ore|team disponibile|piattaforme disponibili/i,
    );
  });
});
