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

  it("delegates CMP loading and configuration to Google Tag Manager", () => {
    const { container } = render(<SiteScripts />);

    expect(
      container.querySelector('script[src*="app.legalblink.it"]'),
    ).toBeNull();
    expect(container.querySelector("[data-license-id]")).toBeNull();
    expect(container.querySelector("#google-tag-manager")).not.toBeNull();
  });

  it("keeps a persistent LegalBlink settings trigger ahead of Google Tag Manager", () => {
    const { container } = render(<SiteScripts />);
    const trigger = container.querySelector(
      "#legalblink-cookie-settings-trigger",
    );
    const loader = container.querySelector("#google-tag-manager");

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

  it("stacks the accessibility control above WhatsApp instead of covering homepage actions", () => {
    const { container } = render(<SiteScripts />);
    const widget = container.querySelector("#tabnav-accessibility-widget");
    const config = JSON.parse(
      widget?.getAttribute("tnv-data-config") ?? "{}",
    ) as {
      widgetLocation?: string;
      buttonLocation?: string;
      buttonSize?: string;
    };
    const themeScript = container.querySelector("#external-widget-theme");

    expect(config).toMatchObject({
      widgetLocation: "right",
      buttonLocation: "bottom",
      buttonSize: "small",
    });
    expect(themeScript).toHaveTextContent("button-expand-panel-element");
    expect(themeScript).toHaveTextContent("right:24px!important");
    expect(themeScript).toHaveTextContent("bottom:96px!important");
  });

  it("excludes every external script from the standalone Instagram route", () => {
    pathnameState.value = "/instagram";

    const { container } = render(<SiteScripts />);

    expect(container).toBeEmptyDOMElement();
  });
});
