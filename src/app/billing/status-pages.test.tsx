import { render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import BillingSuccessPage, {
  metadata as successMetadata,
} from "@/app/billing/success/page";
import BillingCancelPage, {
  metadata as cancelMetadata,
} from "@/app/billing/cancel/page";
import AccountBillingPage, {
  metadata as accountBillingMetadata,
} from "@/app/account/billing/page";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

describe("billing status pages", () => {
  it("exports success metadata as non-indexable", () => {
    expect(successMetadata.title).toBe("Pagamento ricevuto");
    expect(successMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("renders the success page without app CTA", () => {
    render(<BillingSuccessPage />);
    const main = within(screen.getByRole("main"));
    const navigation = within(
      screen.getByRole("navigation", { name: "Navigazione principale" }),
    );

    expect(
      main.getByRole("heading", { name: "Pagamento ricevuto" }),
    ).toBeInTheDocument();
    expect(
      main.getByText("LabManager sta aggiornando il tuo abbonamento."),
    ).toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: "Torna a LabManager" }),
    ).not.toBeInTheDocument();
    expect(
      main.getByRole("link", { name: "labmanager.info@gmail.com" }),
    ).toHaveAttribute("href", "mailto:labmanager.info@gmail.com");
    expect(
      navigation
        .getAllByRole("link")
        .find((link) => link.getAttribute("href") === "/"),
    ).toBeDefined();
    expect(
      navigation.getAllByRole("link", { name: "Prezzi" })[0],
    ).toHaveAttribute("href", "/pricing");
  });

  it("exports cancel metadata as non-indexable", () => {
    expect(cancelMetadata.title).toBe("Operazione annullata");
    expect(cancelMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("renders the cancel page content and CTAs", () => {
    render(<BillingCancelPage />);
    const main = within(screen.getByRole("main"));
    const navigation = within(
      screen.getByRole("navigation", { name: "Navigazione principale" }),
    );

    expect(
      main.getByRole("heading", { name: "Operazione annullata" }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Il pagamento non è stato completato. Nessuna modifica è stata confermata al tuo abbonamento.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Puoi tornare in LabManager e riprovare quando vuoi. I tuoi dati restano invariati.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("link", { name: "Torna al sito" }),
    ).toHaveAttribute("href", "/");
    expect(main.getByRole("link", { name: "Vedi i prezzi" })).toHaveAttribute(
      "href",
      "/pricing",
    );
    expect(
      main.getByRole("link", { name: "labmanager.info@gmail.com" }),
    ).toHaveAttribute("href", "mailto:labmanager.info@gmail.com");
    expect(
      navigation
        .getAllByRole("link")
        .find((link) => link.getAttribute("href") === "/"),
    ).toBeDefined();
    expect(
      navigation.getAllByRole("link", { name: "Prezzi" })[0],
    ).toHaveAttribute("href", "/pricing");
    expect(
      screen.getByRole("contentinfo", { name: "Informazioni LabManager" }),
    ).toBeInTheDocument();
  });

  it("exports account billing metadata as non-indexable", () => {
    expect(accountBillingMetadata.title).toBe("Gestione abbonamento");
    expect(accountBillingMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("renders the account billing page without CTAs", () => {
    render(<AccountBillingPage />);
    const main = within(screen.getByRole("main"));
    const navigation = within(
      screen.getByRole("navigation", { name: "Navigazione principale" }),
    );

    expect(
      main.getByRole("heading", { name: "Abbonamento aggiornato" }),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "LabManager applicherà automaticamente le modifiche salvate nel portale abbonamento.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByText(
        "Se hai richiesto una cancellazione a fine periodo, l'accesso resterà attivo fino alla scadenza prevista.",
      ),
    ).toBeInTheDocument();
    expect(
      main.getByRole("link", { name: "labmanager.info@gmail.com" }),
    ).toHaveAttribute("href", "mailto:labmanager.info@gmail.com");
    expect(
      main.queryByRole("link", { name: "Torna a LabManager" }),
    ).not.toBeInTheDocument();
    expect(
      main.queryByRole("link", { name: "Vai ai prezzi" }),
    ).not.toBeInTheDocument();
    expect(
      navigation
        .getAllByRole("link")
        .find((link) => link.getAttribute("href") === "/"),
    ).toBeDefined();
    expect(
      navigation.getAllByRole("link", { name: "Prezzi" })[0],
    ).toHaveAttribute("href", "/pricing");
    expect(
      screen.getByRole("contentinfo", { name: "Informazioni LabManager" }),
    ).toBeInTheDocument();
  });
});
