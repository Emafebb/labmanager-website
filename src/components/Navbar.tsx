"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native header links preserve top anchors and browser scroll history. */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";
import { WORK_AREAS } from "@/data/work-areas";

export default function Navbar({
  featuresHref = "/#funzionalita",
}: {
  featuresHref?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const featuresToggle = useRef<HTMLButtonElement>(null);
  const featuresMenu = useRef<HTMLLIElement>(null);
  const access = getCommercialCta("navbar-access");
  const links = [
    { href: "/pricing", label: "Prezzi" },
    { href: "/#contatti", label: "Contatti" },
  ];
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (featuresOpen) {
          setFeaturesOpen(false);
          featuresToggle.current?.focus();
        } else if (open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }
    }
    function onPointer(event: PointerEvent) {
      if (
        featuresMenu.current &&
        !featuresMenu.current.contains(event.target as Node)
      ) {
        setFeaturesOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, featuresOpen]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Salta al contenuto
      </a>
      <nav className="site-nav" aria-label="Navigazione principale">
        <a
          className="wordmark"
          href="/#main-content"
          aria-label="LabManager, homepage"
        >
          <BrandLogo />
          <span>LabManager</span>
        </a>
        <ul className="site-nav__desktop" aria-label="Navigazione desktop">
          <li>
            <a
              href="/#main-content"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
            </a>
          </li>
          <li
            ref={featuresMenu}
            className="site-nav__features"
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              )
                setFeaturesOpen(false);
            }}
          >
            <button
              ref={featuresToggle}
              type="button"
              aria-expanded={featuresOpen}
              aria-controls="feature-menu"
              data-active={WORK_AREAS.some((area) => area.href === pathname) || undefined}
              onClick={() => setFeaturesOpen(!featuresOpen)}
            >
              Funzionalità <ChevronDown size={16} aria-hidden="true" />
            </button>
            <ul
              id="feature-menu"
              className="site-nav__feature-menu"
              hidden={!featuresOpen}
            >
              <li>
                <a
                  href={featuresHref}
                  onClick={() => setFeaturesOpen(false)}
                >
                  Panoramica delle funzionalità
                </a>
              </li>
              {WORK_AREAS.map((area) => (
                <li key={area.href}>
                  <a
                    href={`${area.href}#main-content`}
                    aria-current={pathname === area.href ? "page" : undefined}
                    onClick={() => setFeaturesOpen(false)}
                  >
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href.includes("#") ? link.href : `${link.href}#main-content`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={access.destination} className="site-nav__access">
          {access.label}
        </a>
        <button
          ref={toggle}
          type="button"
          className="site-nav__toggle"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="mobile-menu" className="site-nav__mobile" hidden={!open}>
          <ul aria-label="Navigazione mobile">
            <li>
              <a
                href="/#main-content"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a href={featuresHref} onClick={() => setOpen(false)}>
                Funzionalità
              </a>
            </li>
            {WORK_AREAS.map((area) => (
              <li key={area.href}>
                <a
                  href={`${area.href}#main-content`}
                  aria-current={pathname === area.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {area.title}
                </a>
              </li>
            ))}
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href.includes("#") ? link.href : `${link.href}#main-content`}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
