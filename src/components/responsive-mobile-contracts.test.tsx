import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import NewsletterPage from "@/app/newsletter/page";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";
import ContactForm from "@/components/ContactForm";
import PricingFAQ from "@/app/pricing/pricing-faq";
import PricingSelector from "@/app/pricing/pricing-selector";
import { EXTERNAL_WIDGET_THEME_SCRIPT } from "@/components/SiteScripts";
import { RESPONSIVE_ASSET_PATHS } from "@/data/responsive-images";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) =>
    createElement("img", { alt, src, ...props }),
}));

describe("responsive static asset contract", () => {
  it("versions every declared AVIF/WebP derivative as a non-empty file", () => {
    for (const assetPath of RESPONSIVE_ASSET_PATHS) {
      const absolutePath = join(process.cwd(), "public", assetPath);
      expect(existsSync(absolutePath), assetPath).toBe(true);
      expect(statSync(absolutePath).size, assetPath).toBeGreaterThan(0);
    }
  });

  it("uses a responsive code-native map instead of app screenshots in the hero", () => {
    const { container } = render(<Hero />);

    expect(container.querySelector("[data-flow-map]")).not.toBeNull();
    expect(container.querySelectorAll("[data-flow-map] button")).toHaveLength(6);
    expect(container.querySelector("picture")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });

  it("does not preload or reference screenshot assets from the hero", () => {
    const heroSource = readFileSync(
      join(process.cwd(), "src", "components", "Hero.tsx"),
      "utf8",
    );
    expect(heroSource).not.toContain("HERO_ASSETS");
    expect(heroSource).not.toContain("preload(");
    expect(heroSource).not.toContain("<picture");
    expect(heroSource).not.toContain("<img");
  });

  it("keeps the newsletter focused on subscription without a product screenshot", () => {
    const { container } = render(<NewsletterPage />);

    expect(container.querySelector("picture[data-newsletter-image]")).toBeNull();
    expect(container.querySelector("main img")).toBeNull();
  });

  it("splits newsletter content and form on compact desktop widths", () => {
    const { container } = render(<NewsletterPage />);
    const layout = container.querySelector(
      'section[aria-labelledby="newsletter-page-title"] > div',
    );

    expect(layout).toHaveClass(
      "min-[900px]:grid-cols-[minmax(0,1fr)_380px]",
      "min-[900px]:gap-10",
    );
  });
});

describe("shared 44px touch-target contract", () => {
  it("defines a reusable 44 by 44 pixel utility", () => {
    const css = readFileSync(
      join(process.cwd(), "src", "app", "globals.css"),
      "utf8",
    );
    expect(css).toMatch(/\.touch-target\s*\{[^}]*min-width:\s*44px/);
    expect(css).toMatch(/\.touch-target\s*\{[^}]*min-height:\s*44px/);
  });

  it("applies the utility to the mobile menu, hero CTAs and FAQ buttons", () => {
    const navbar = render(<Navbar />);
    expect(
      screen.getByRole("button", { name: "Apri menu" }),
    ).toHaveClass("touch-target");
    navbar.unmount();

    const hero = render(<Hero />);
    expect(screen.getByRole("link", { name: "Registrati per una prova gratuita" })).toHaveClass(
      "touch-target",
    );
    expect(screen.getByRole("link", { name: /Scopri le funzionalità/ })).toHaveClass(
      "touch-target",
    );
    hero.unmount();

    const faq = render(<FAQ />);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveClass("touch-target");
    }
    faq.unmount();

    const pricingFaq = render(<PricingFAQ />);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveClass("touch-target");
    }
    pricingFaq.unmount();

    const pricingSelector = render(<PricingSelector />);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveClass("touch-target");
    }
    for (const link of screen.getAllByRole("link", {
      name: "Prova gratis 14 giorni",
    })) {
      expect(link).toHaveClass("touch-target");
    }
    pricingSelector.unmount();
  });

  it("applies the utility to the newsletter consent label and external consent controls", () => {
    const { container } = render(<NewsletterForm />);
    expect(container.querySelector('label[for$="-privacy"]')).toHaveClass(
      "touch-target",
    );
    expect(EXTERNAL_WIDGET_THEME_SCRIPT).toContain("min-width:44px");
    expect(EXTERNAL_WIDGET_THEME_SCRIPT).toContain("min-height:44px");

    const contact = render(<ContactForm />);
    expect(contact.container.querySelector('label[for="privacy"]')).toHaveClass(
      "touch-target",
    );
    expect(
      contact.container.querySelector('label[for="newsletter"]'),
    ).toHaveClass("touch-target");
  });
});
