import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import { MAGAZZINO_CANONICAL_COPY } from "@/data/magazzino-capability-matrix";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

vi.mock("@/components/NewsletterPopup", () => ({
  default: () => null,
}));

const HERO_AUDIENCE = "Il gestionale per laboratori alimentari";
const HERO_TITLE =
  "Dalla ricetta all'ordine, tutto il laboratorio sotto controllo";
const HERO_COPY =
  "Calcola food cost e margini, organizza produzione, etichette, magazzino e ordini in un unico flusso di lavoro.";
const CANCELLATION_COPY =
  "Puoi disdire quando vuoi; in caso di cancellazione a fine periodo, l'accesso resta attivo fino alla scadenza prevista.";

describe("home repositioning", () => {
  it("renders the approved hero, actions, four pillars, and orders landing link", () => {
    render(<Home />);

    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 1, name: HERO_TITLE }),
    ).toBeInTheDocument();
    expect(main.getByText(HERO_AUDIENCE)).toBeInTheDocument();
    expect(main.getByText(HERO_COPY)).toBeInTheDocument();
    const trialLinks = main.getAllByRole("link", {
      name: "Registrati per una prova gratuita",
    });
    expect(trialLinks).toHaveLength(2);
    for (const trialLink of trialLinks) {
      expect(trialLink).toHaveAttribute(
        "href",
        "https://app.labmanagergestionale.com",
      );
    }
    expect(
      main.getByRole("link", { name: "Scopri le funzionalità" }),
    ).toHaveAttribute("href", "/#funzionalita");

    for (const pillar of [
      "Ricette e Food Cost",
      "Produzione ed Etichette",
      "Magazzino",
      "Ordini e Piano di Lavoro",
    ]) {
      expect(main.getByRole("heading", { name: pillar })).toBeInTheDocument();
    }
    expect(
      main.getByRole("link", { name: "Scopri il modulo ordini" }),
    ).toHaveAttribute("href", "/ordini");
    expect(
      main.getByRole("heading", {
        level: 2,
        name: "Porta ordine nel lavoro di ogni giorno",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Fatto per chi lavora ogni giorno in laboratorio",
      ),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("per i pasticceri");
  });

  it("keeps the responsive hero artwork without repeating the detailed warehouse copy", () => {
    const { container } = render(<Hero />);

    expect(container).not.toHaveTextContent(MAGAZZINO_CANONICAL_COPY);
    expect(
      container.querySelector("[data-magazzino-claim-ids]"),
    ).toBeNull();
    expect(container.querySelector("picture[data-hero-lcp]")).not.toBeNull();
    expect(
      screen.getByAltText("Anteprima di LabManager su telefono e desktop"),
    ).toHaveAttribute("fetchpriority", "high");
    expect(container.textContent).not.toMatch(
      /android|windows|offline|cloud|compatibil/i,
    );
  });

  it("removes legacy sections and prohibited acquisition claims from the marketing DOM", () => {
    const { container } = render(<Home />);
    const main = screen.getByRole("main");

    expect(container.querySelector("#piattaforme")).toBeNull();
    expect(container.querySelector("#perche-labmanager")).toBeNull();
    expect(main).not.toHaveTextContent(
      /android|windows|offline|\bpwa\b|ristorant|2 sessioni attive simultanee/i,
    );
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
        name: "Hai domande? Parla con noi",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeNull();
    expect(screen.getByLabelText(/Ho letto e accetto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Acconsento a ricevere/i)).not.toBeRequired();
    expect(
      screen.getByRole("link", { name: "Scrivici su WhatsApp" }),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(
      /demo|entro 24 ore|team disponibile|piattaforme disponibili/i,
    );
  });
});
