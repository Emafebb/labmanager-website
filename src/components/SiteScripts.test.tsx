import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteScripts, { GTM_CONTAINER_ID } from "./SiteScripts";

const pathnameState = vi.hoisted(() => ({ value: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameState.value,
}));

vi.mock("next/script", () => ({
  default: (
    props: React.ComponentPropsWithoutRef<"script"> & { strategy?: string },
  ) => {
    const { strategy, ...scriptProps } = props;
    void strategy;
    return <script {...scriptProps} />;
  },
}));

describe("SiteScripts", () => {
  beforeEach(() => {
    pathnameState.value = "/";
  });

  it("keeps Consent Mode enabled without the advertising TCF banner", () => {
    const { container } = render(<SiteScripts />);
    const script = container.querySelector("#legalblink-cmp");

    expect(script).toHaveAttribute(
      "src",
      "https://app.legalblink.it/api/scripts/cmp/loader.js",
    );
    expect(script).toHaveAttribute(
      "data-license-id",
      "69e89f282420950024cb1a5e",
    );
    expect(script).toHaveAttribute("data-blocking-mode", "auto");
    expect(script).toHaveAttribute("data-consent-mode", "true");
    expect(script).not.toHaveAttribute("data-tcf-enabled");
  });

  it("keeps a persistent LegalBlink settings trigger ahead of the loader", () => {
    const { container } = render(<SiteScripts />);
    const trigger = container.querySelector(
      "#legalblink-cookie-settings-trigger",
    );
    const loader = container.querySelector("#legalblink-cmp");

    expect(trigger).toHaveAttribute("data-lb", "c-settings");
    expect(trigger).toHaveAttribute("hidden");
    expect(
      trigger?.compareDocumentPosition(loader as Node) ?? 0,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("renders both official Google Tag Manager snippets with the shared container ID", () => {
    const { container } = render(<SiteScripts />);
    const script = container.querySelector("#google-tag-manager");
    const staticMarkup = renderToStaticMarkup(<SiteScripts />);

    expect(GTM_CONTAINER_ID).toBe("GTM-TCZR8HQP");
    expect(script).toHaveTextContent(
      "https://www.googletagmanager.com/gtm.js?id=",
    );
    expect(script).toHaveTextContent(GTM_CONTAINER_ID);
    expect(staticMarkup).toContain(
      `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}" height="0" width="0"`,
    );
  });

  it("defines the Google Tag Manager container ID once in the component", () => {
    const source = readFileSync(
      join(process.cwd(), "src", "components", "SiteScripts.tsx"),
      "utf8",
    );

    expect(source.match(/GTM-TCZR8HQP/g)).toHaveLength(1);
  });

  it("places LegalBlink before the main Google Tag Manager loader", () => {
    const { container } = render(<SiteScripts />);
    const legalBlink = container.querySelector("#legalblink-cmp");
    const tagManager = container.querySelector("#google-tag-manager");

    expect(legalBlink).not.toBeNull();
    expect(tagManager).not.toBeNull();
    expect(
      legalBlink?.compareDocumentPosition(tagManager as Node) ?? 0,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("excludes every external script from the standalone Instagram route", () => {
    pathnameState.value = "/instagram";

    const { container } = render(<SiteScripts />);

    expect(container).toBeEmptyDOMElement();
  });
});
