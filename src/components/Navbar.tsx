"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#funzionalita", label: "Funzionalità" },
  { href: "#piattaforme", label: "Piattaforme" },
  { href: "#faq", label: "FAQ" },
  { href: "#contatti", label: "Contatti" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <a
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 ease-out">
              <Image
                src="/images/logo.png"
                alt="LabManager"
                width={28}
                height={28}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                LabManager
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest -mt-1">
                PASTICCERIA
              </span>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a
                href="#contatti"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors duration-200 ease-out"
              >
                Richiedi Info
              </a>
            </li>
          </ul>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ease-out"
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
          <ul className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 ease-out"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contatti"
                className="block text-center bg-primary text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-primary-dark transition-colors duration-200 ease-out"
                onClick={() => setMobileOpen(false)}
              >
                Richiedi Info
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
