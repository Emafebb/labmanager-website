import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton, { WHATSAPP_URL } from "@/components/WhatsAppButton";
import { TRIAL_ACCESS_APP_HREF } from "@/data/trial-access-cta-inventory";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("site navigation", () => {
  it("keeps the closed mobile menu out of the focus order and supports Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    expect(
      screen.queryByRole("list", { name: "Navigazione mobile" }),
    ).toBeNull();
    const toggle = screen.getByRole("button", { name: "Apri menu" });
    await user.click(toggle);
    const mobile = screen.getByRole("list", { name: "Navigazione mobile" });
    const desktop = screen.getByRole("list", { name: "Navigazione desktop" });
    expect(
      within(mobile)
        .getAllByRole("link", { hidden: true })
        .map((a) => a.getAttribute("href")),
    ).toEqual(
      within(desktop)
        .getAllByRole("link", { hidden: true })
        .map((a) => a.getAttribute("href")),
    );
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(screen.getByRole("link", { name: "Accedi" })).toHaveAttribute(
      "href",
      TRIAL_ACCESS_APP_HREF,
    );
  });
  it("closes the menu on navigation and preserves the home feature anchor", async () => {
    const user = userEvent.setup();
    render(<Navbar featuresHref="#funzionalita" />);
    await user.click(screen.getByRole("button", { name: "Apri menu" }));
    const mobile = within(
      screen.getByRole("list", { name: "Navigazione mobile" }),
    );
    expect(mobile.getByRole("link", { name: "Funzionalità" })).toHaveAttribute(
      "href",
      "#funzionalita",
    );
    await user.click(mobile.getByRole("link", { name: "Prezzi" }));
    expect(screen.getByRole("button", { name: "Apri menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
  it("preserves product, support, legal and company information", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Newsletter" })).toHaveAttribute(
      "href",
      "/newsletter",
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      WHATSAPP_URL,
    );
    expect(
      within(screen.getByRole("navigation", { name: "Legale" })).getAllByRole(
        "link",
      ),
    ).toHaveLength(3);
    expect(screen.getByRole("contentinfo")).toHaveTextContent("04279110367");
    expect(
      screen.getByRole("link", { name: "Aggiorna preferenze cookie" }),
    ).toHaveClass("lb-cs-settings-link");
  });
  it("forwards cookie settings clicks to the persistent LegalBlink trigger after a footer remount", () => {
    const onTrigger = vi.fn();
    render(
      <button
        id="legalblink-cookie-settings-trigger"
        type="button"
        onClick={onTrigger}
      />,
    );
    const firstFooter = render(<Footer />);
    firstFooter.unmount();
    render(<Footer />);

    const link = screen.getByRole("link", {
      name: "Aggiorna preferenze cookie",
    });
    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    fireEvent(link, click);

    expect(click.defaultPrevented).toBe(true);
    expect(onTrigger).toHaveBeenCalledOnce();
  });

  it("keeps WhatsApp an assistance path rather than a trial action", () => {
    render(<WhatsAppButton />);

    const link = screen.getByRole("link", {
      name: "Scrivici su WhatsApp",
    });
    expect(link).toHaveAttribute("href", WHATSAPP_URL);
    expect(link).not.toHaveAttribute("href", TRIAL_ACCESS_APP_HREF);
    expect(link).toHaveAccessibleName("Scrivici su WhatsApp");
    expect(link).not.toHaveAccessibleName(/prova|accedi/i);
  });
});
