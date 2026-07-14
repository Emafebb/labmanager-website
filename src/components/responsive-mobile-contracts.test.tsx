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
import { EXTERNAL_WIDGET_THEME_SCRIPT } from "@/components/SiteScripts";
import {
  HERO_ASSETS,
  NEWSLETTER_ASSETS,
  RESPONSIVE_ASSET_PATHS,
} from "@/data/responsive-images";

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

  it("uses mutually exclusive mobile and desktop picture sources for the hero", () => {
    const { container } = render(<Hero />);
    const picture = container.querySelector("picture[data-hero-lcp]");

    expect(picture).not.toBeNull();
    expect(
      picture?.querySelector(
        `source[media="(max-width: 639px)"][type="image/avif"]`,
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.android.avifSrcSet);
    expect(
      picture?.querySelector(
        `source[media="(max-width: 639px)"][type="image/webp"]`,
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.android.webpSrcSet);
    expect(
      picture?.querySelector(
        `source[media="(min-width: 640px)"][type="image/avif"]`,
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.desktop.avifSrcSet);
    expect(
      picture?.querySelector(
        `source[media="(min-width: 640px)"][type="image/webp"]`,
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.desktop.webpSrcSet);
    expect(picture?.querySelector("img")).toHaveAttribute(
      "sizes",
      HERO_ASSETS.sizes,
    );
    expect(picture?.querySelector("img")).toHaveAttribute(
      "alt",
      "Anteprima di LabManager su telefono e desktop",
    );
  });

  it("preloads exactly one hero family at each breakpoint and never the tablet", () => {
    const heroSource = readFileSync(
      join(process.cwd(), "src", "components", "Hero.tsx"),
      "utf8",
    );
    expect(heroSource).not.toContain("HeroPreloads");

    const { container } = render(<Hero />);
    const preloads = Array.from(
      document.head.querySelectorAll<HTMLLinkElement>(
        'link[rel="preload"][as="image"]',
      ),
    );
    expect(preloads).toHaveLength(2);
    expect(preloads.map(({ media }) => media)).toEqual([
      "(max-width: 639px)",
      "(min-width: 640px)",
    ]);
    expect(container.querySelector("picture[data-hero-lcp] img")).toHaveAttribute(
      "fetchpriority",
      "high",
    );
    expect(
      container.querySelector(
        'picture[data-hero-lcp] source[media="(max-width: 639px)"]',
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.android.avifSrcSet);
    expect(
      container.querySelector(
        'picture[data-hero-lcp] source[media="(min-width: 640px)"]',
      ),
    ).toHaveAttribute("srcset", HERO_ASSETS.desktop.avifSrcSet);
  });

  it("serves the newsletter screenshot from responsive AVIF/WebP markup without preload", () => {
    const { container } = render(<NewsletterPage />);
    const picture = container.querySelector("picture[data-newsletter-image]");

    expect(picture).not.toBeNull();
    expect(picture?.querySelector('source[type="image/avif"]')).toHaveAttribute(
      "srcset",
      NEWSLETTER_ASSETS.avifSrcSet,
    );
    expect(picture?.querySelector('source[type="image/webp"]')).toHaveAttribute(
      "srcset",
      NEWSLETTER_ASSETS.webpSrcSet,
    );
    expect(picture?.querySelector("img")).toHaveAttribute(
      "sizes",
      NEWSLETTER_ASSETS.sizes,
    );
    expect(container.querySelector('link[rel="preload"]')).toBeNull();
  });
});

describe("shared 44px touch-target contract", () => {
  it("defines a reusable 44 by 44 pixel utility", () => {
    const css = readFileSync(
      join(process.cwd(), "src", "app", "globals.css"),
      "utf8",
    );
    expect(css).toMatch(/\.touch-target\s*\{[^}]*min-width:\s*44px/s);
    expect(css).toMatch(/\.touch-target\s*\{[^}]*min-height:\s*44px/s);
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
