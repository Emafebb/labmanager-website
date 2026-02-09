"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-primary tracking-wide">
          LABMANAGER
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <a href="#funzionalita" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Funzionalit&agrave;
            </a>
          </li>
          <li>
            <a href="#piattaforme" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Piattaforme
            </a>
          </li>
          <li>
            <a href="#download" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Download
            </a>
          </li>
          <li>
            <a href="#contatti" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Contatti
            </a>
          </li>
          <li>
            <a
              href="#download"
              className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all hover:-translate-y-0.5"
            >
              Scarica Gratis
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-6 py-4">
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="#funzionalita"
                className="text-sm font-medium text-gray-600"
                onClick={() => setMobileOpen(false)}
              >
                Funzionalit&agrave;
              </a>
            </li>
            <li>
              <a
                href="#piattaforme"
                className="text-sm font-medium text-gray-600"
                onClick={() => setMobileOpen(false)}
              >
                Piattaforme
              </a>
            </li>
            <li>
              <a
                href="#download"
                className="text-sm font-medium text-gray-600"
                onClick={() => setMobileOpen(false)}
              >
                Download
              </a>
            </li>
            <li>
              <a
                href="#contatti"
                className="text-sm font-medium text-gray-600"
                onClick={() => setMobileOpen(false)}
              >
                Contatti
              </a>
            </li>
            <li>
              <a
                href="#download"
                className="inline-block bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
                onClick={() => setMobileOpen(false)}
              >
                Scarica Gratis
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
