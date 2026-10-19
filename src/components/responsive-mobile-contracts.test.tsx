import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { EXTERNAL_WIDGET_THEME_SCRIPT } from "@/components/SiteScripts";

describe("responsive asset and accessibility contract", () => {
  it("serves bounded, local, responsive editorial images with alternative text", () => {
    const { container } = render(<Home />);
    for (const image of container.querySelectorAll<HTMLImageElement>(
      "main img",
    )) {
      expect(image.alt).not.toBe("");
      expect(image.getAttribute("sizes")).toBeTruthy();
      const asset = join(process.cwd(), "public", image.getAttribute("src")!);
      expect(existsSync(asset)).toBe(true);
      expect(statSync(asset).size).toBeLessThan(350000);
      expect(image.getAttribute("src")).not.toMatch(
        /homepage-screenshot|hero-desktop|tablet-produzione/,
      );
    }
  });
  it("keeps reduced motion and the external widgets' accessible targets", () => {
    const css = readFileSync(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toMatch(/\.touch-target\s*\{[^}]*min-height:\s*44px/);
    expect(EXTERNAL_WIDGET_THEME_SCRIPT).toContain("min-width:44px");
    expect(EXTERNAL_WIDGET_THEME_SCRIPT).toContain("min-height:44px");
  });
});
