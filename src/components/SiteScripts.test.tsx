import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SiteScripts from "./SiteScripts";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/script", () => ({
  default: (
    props: React.ComponentPropsWithoutRef<"script"> & { strategy?: string },
  ) => (
    <script {...props} />
  ),
}));

describe("SiteScripts", () => {
  it("renders the official LegalBlink CMP attributes", () => {
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
    expect(script).toHaveAttribute("data-tcf-enabled", "true");
  });
});
