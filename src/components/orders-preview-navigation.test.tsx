import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrdersPreview from "@/components/OrdersPreview";

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

  it("adds Ordini to the main navigation", () => {
    render(<Navbar />);

    const desktopOrdersLink = screen
      .getAllByRole("link", { name: "Ordini" })
      .find((link) => link.getAttribute("href") === "/ordini");

    expect(desktopOrdersLink).toBeDefined();
  });

  it("adds Ordini to the footer product links", () => {
    render(<Footer />);

    const footer = within(
      screen.getByRole("contentinfo", { name: "Informazioni LabManager" }),
    );

    expect(footer.getByRole("link", { name: "Ordini" })).toHaveAttribute(
      "href",
      "/ordini",
    );
  });
});
