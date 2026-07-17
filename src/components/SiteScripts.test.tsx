import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act, render, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteScripts from "./SiteScripts";

const route = vi.hoisted(() => ({ pathname: "/" }));
const scriptCallbacks = vi.hoisted(() => ({
  onReady: new Map<string, () => void>(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

vi.mock("next/script", () => ({
  default: ({
    children,
    onReady,
    strategy,
    ...props
  }: React.ScriptHTMLAttributes<HTMLScriptElement> & {
    onReady?: () => void;
    strategy?: string;
  }) => {
    if (typeof props.id === "string" && onReady) {
      scriptCallbacks.onReady.set(props.id, onReady);
    }

    return (
      <script {...props} data-strategy={strategy}>
        {children}
      </script>
    );
  },
}));

describe("SiteScripts Google Tag Manager", () => {
  beforeEach(() => {
    route.pathname = "/";
    scriptCallbacks.onReady.clear();
  });

  it("loads GTM only after LegalBlink is ready and renders the noscript fallback", async () => {
    const initialMarkup = renderToStaticMarkup(<SiteScripts />);
    const { container } = render(<SiteScripts />);
    const legalBlink = container.querySelector("#legalblink-cmp");

    expect(legalBlink).not.toBeNull();
    expect(container.querySelector("#google-tag-manager")).toBeNull();
    expect(initialMarkup).toContain(
      "https://www.googletagmanager.com/ns.html?id=GTM-TCZR8HQP",
    );

    act(() => {
      scriptCallbacks.onReady.get("legalblink-cmp")?.();
    });

    await waitFor(() => {
      expect(container.querySelector("#google-tag-manager")).not.toBeNull();
    });

    const tagManager = container.querySelector("#google-tag-manager");
    expect(tagManager?.textContent).toContain("GTM-TCZR8HQP");
    expect(tagManager?.textContent).toContain(
      "https://www.googletagmanager.com/gtm.js",
    );
  });

  it("keeps the standalone Instagram route free of GTM", () => {
    route.pathname = "/instagram";

    const { container } = render(<SiteScripts />);

    expect(container).toBeEmptyDOMElement();
  });

  it("allows the minimum GTM endpoints in the site security policy", () => {
    const config = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

    expect(config).toMatch(
      /script-src[^\n]*https:\/\/www\.googletagmanager\.com/,
    );
    expect(config).toMatch(
      /connect-src[^\n]*https:\/\/www\.googletagmanager\.com[^\n]*https:\/\/www\.google\.com/,
    );
    expect(config).toMatch(
      /frame-src[^\n]*https:\/\/www\.googletagmanager\.com/,
    );
  });
});
