"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { getCommercialCta } from "@/data/trial-access-cta-inventory";

const secondaryNavLinks = [
  { href: "/ordini", label: "Ordini" },
  { href: "/pricing", label: "Prezzi" },
];

const accessCta = getCommercialCta("navbar-access");

type NavbarProps = {
  featuresHref?: "/" | "#funzionalita";
};

export default function Navbar({ featuresHref = "/" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { href: featuresHref, label: "Funzionalità" },
    ...secondaryNavLinks,
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <nav
      aria-label="Navigazione principale"
      className={`fixed top-0 left-0 right-0 z-50 overflow-x-clip transition-all duration-200 ease-out ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
          >
            <BrandLogo className="shrink-0" />
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-xl font-bold text-gray-900 tracking-tight">
                LabManager
              </span>
            </div>
          </Link>

          <ul
            aria-label="Navigazione desktop"
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link
                href={accessCta.destination}
                className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-gray-300 hover:text-primary transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {accessCta.label}
              </Link>
            </li>
          </ul>

          <button
            className="touch-target relative z-10 inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-colors duration-200 ease-out hover:bg-gray-50 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X size={24} className="text-gray-700" aria-hidden="true" />
            ) : (
              <Menu size={24} className="text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 mt-3">
          <ul aria-label="Navigazione mobile" className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={accessCta.destination}
                className="block text-center border border-gray-200 bg-white text-gray-700 px-6 py-3 rounded-lg text-base font-semibold hover:border-gray-300 hover:text-primary transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setMobileOpen(false)}
              >
                {accessCta.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
