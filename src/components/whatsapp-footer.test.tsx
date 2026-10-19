import { act, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { WORK_AREAS } from "@/data/work-areas";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
beforeEach(() => { route.pathname = "/"; });
afterEach(() => vi.unstubAllGlobals());

it("uses the footer contact link while the footer contact is visible and restores the floating action afterwards", () => {
  let notify!: IntersectionObserverCallback;
  const observe = vi.fn();
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe = observe;
    disconnect = disconnect;
  });
  const view = render(<><Footer /><WhatsAppButton /></>);
  const floating = screen.getByRole("link", { name: "Scrivici su WhatsApp" });
  expect(floating).toBeVisible();
  act(() => notify([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(floating).not.toBeVisible();
  expect(within(screen.getByRole("navigation", { name: "Supporto" })).getByRole("link", { name: "WhatsApp" })).toBeVisible();
  act(() => notify([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(floating).toBeVisible();
  expect(observe).toHaveBeenCalledWith(within(screen.getByRole("navigation", { name: "Supporto" })).getByRole("link", { name: "WhatsApp" }));
  view.unmount();
  expect(disconnect).toHaveBeenCalledOnce();
});


it.each(["/", "/pricing", "/newsletter", ...WORK_AREAS.map(area => area.href), "/billing/success", "/billing/cancel", "/account/billing"])("mounts one shared WhatsApp action on %s", (pathname) => {
  route.pathname = pathname;
  const html = renderToStaticMarkup(<RootLayout><main>Pagina</main><Footer /></RootLayout>);
  const document = new DOMParser().parseFromString(html, "text/html");
  expect(document.querySelectorAll(".whatsapp-float")).toHaveLength(1);
});

it.each(["/instagram", "/pagina-inesistente", "/download", "/aggiornamenti"])("keeps the floating action off standalone and missing routes: %s", (pathname) => {
  route.pathname = pathname;
  const html = renderToStaticMarkup(<RootLayout><main>Pagina</main></RootLayout>);
  expect(new DOMParser().parseFromString(html, "text/html").querySelector(".whatsapp-float")).toBeNull();
});

it("does not duplicate the action when the shared layout wraps the homepage", () => {
  const html = renderToStaticMarkup(<RootLayout><Home /></RootLayout>);
  expect(new DOMParser().parseFromString(html, "text/html").querySelectorAll(".whatsapp-float")).toHaveLength(1);
});

it("observes the new footer contact after client navigation", () => {
  const callbacks: IntersectionObserverCallback[] = [];
  const observe = vi.fn();
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { callbacks.push(callback); }
    observe = observe;
    disconnect = disconnect;
  });
  const view = render(<><Footer key={route.pathname} /><WhatsAppButton /></>);
  route.pathname = "/billing/success";
  view.rerender(<><Footer key={route.pathname} /><WhatsAppButton /></>);
  expect(disconnect).toHaveBeenCalledOnce();
  expect(callbacks).toHaveLength(2);
  expect(observe).toHaveBeenLastCalledWith(within(screen.getByRole("navigation", { name: "Supporto" })).getByRole("link", { name: "WhatsApp" }));
});
