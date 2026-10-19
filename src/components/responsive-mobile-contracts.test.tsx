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
      expect(image.srcset).not.toBe("");
      const candidates = image.srcset.split(", ").map((candidate) => {
        const [src, width] = candidate.split(" ");
        const path = join(process.cwd(), "public", src);
        expect(existsSync(path)).toBe(true);
        return { width: parseInt(width), bytes: statSync(path).size };
      });
      expect(candidates).toHaveLength(3);
      expect(candidates[0].width).toBe(400);
      expect(candidates[1].width).toBe(800);
      expect(candidates[0].bytes).toBeLessThan(candidates[2].bytes);
      expect(candidates[1].bytes).toBeLessThan(candidates[2].bytes);
      const asset = join(process.cwd(), "public", image.getAttribute("src")!);
      expect(existsSync(asset)).toBe(true);
      expect(statSync(asset).size).toBeLessThan(350000);
      expect(image.getAttribute("src")).not.toMatch(
        /homepage-screenshot|hero-desktop|tablet-produzione/,
      );
    }
    const hero = container.querySelector(".hero__image img");
    expect(hero).toHaveAttribute("fetchpriority", "high");
    expect(hero).toHaveAttribute("loading", "eager");
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
