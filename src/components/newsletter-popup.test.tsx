import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import NewsletterPopup from "@/components/NewsletterPopup";

const values = new Map<string, string>();
const storage = {
  getItem: (key: string) => values.get(key) ?? null,
  setItem: (key: string, value: string) => { values.set(key, value); },
};
afterEach(() => vi.unstubAllGlobals());

// jsdom has no dialog API; keyboard focus and inert background are checked in Chrome.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterAll(() => {
  Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
});
beforeEach(() => {
  values.clear();
  vi.stubGlobal("localStorage", storage);
  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 2000 });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});
function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
  fireEvent.scroll(window);
}

describe("newsletter popup", () => {
  it("is connected to the homepage, opens at halfway and dismisses for seven days", () => {
    render(<Home />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    scrollTo(490);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    scrollTo(500);
    const dialog = screen.getByRole("dialog", { name: "Novità dal laboratorio." });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Chiudi newsletter" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(Number(window.localStorage.getItem("newsletter_dismissed"))).toBeGreaterThan(0);
    expect(document.body.style.overflow).toBe("");
  });
  it.each([
    ["newsletter_subscribed", "true"],
    ["newsletter_dismissed", String(Date.now())],
  ])("does not interrupt a visitor with %s", (key, value) => {
    window.localStorage.setItem(key, value);
    render(<NewsletterPopup />);
    scrollTo(900);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("returns after the cooldown and records native Escape cancellation", () => {
    window.localStorage.setItem("newsletter_dismissed", String(Date.now() - 8 * 24 * 60 * 60 * 1000));
    render(<NewsletterPopup />);
    scrollTo(500);
    act(() => screen.getByRole("dialog").dispatchEvent(new Event("cancel", { cancelable: true })));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(Number(window.localStorage.getItem("newsletter_dismissed"))).toBeGreaterThan(Date.now() - 1000);
  });
  it("opens and closes when storage is unavailable", () => {
    const read = vi.spyOn(storage, "getItem").mockImplementation(() => { throw new DOMException("Blocked"); });
    const write = vi.spyOn(storage, "setItem").mockImplementation(() => { throw new DOMException("Blocked"); });
    try {
      render(<NewsletterPopup />);
      scrollTo(500);
      fireEvent.click(screen.getByRole("button", { name: "Chiudi newsletter" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    } finally {
      read.mockRestore();
      write.mockRestore();
    }
  });
  it("requires consent and preserves retry and success without sending real email", async () => {
    const request = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true });
    vi.stubGlobal("fetch", request);
    render(<NewsletterPopup />);
    scrollTo(500);
    const button = screen.getByRole("button", { name: "Iscriviti alla newsletter" });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Laboratorio demo" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "demo@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(button).toBeEnabled();
    fireEvent.submit(button.closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("Errore durante l’iscrizione");
    expect(button).toBeEnabled();
    fireEvent.submit(button.closest("form")!);
    expect(await screen.findByRole("dialog", { name: "Iscrizione newsletter completata" })).toBeInTheDocument();
    expect(request).toHaveBeenLastCalledWith("/api/newsletter", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ name: "Laboratorio demo", email: "demo@example.com", businessType: "", privacyAccepted: true }),
    }));
    expect(window.localStorage.getItem("newsletter_subscribed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Chiudi newsletter" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
