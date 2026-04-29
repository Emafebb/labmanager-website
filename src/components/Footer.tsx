import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const currentYear = new Date().getFullYear();
const PRIVACY_POLICY_URL = "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it";
const COOKIE_POLICY_URL = "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/cookie-policy-it";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  dataLb?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    title: "Prodotto",
    links: [
      { label: "Funzionalità", href: "/#funzionalita" },
      { label: "Piattaforme", href: "/#piattaforme" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Supporto",
    links: [
      { label: "Contatti", href: "/#contatti" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: PRIVACY_POLICY_URL, external: true },
      { label: "Cookie Policy", href: COOKIE_POLICY_URL, external: true },
      { label: "Aggiorna preferenze cookie", href: "#", dataLb: "c-settings" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-label="Informazioni LabManager">
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <Link href="/" className="group inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/images/logo.png"
                    alt="LabManager"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white tracking-tight">
                    LabManager
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 leading-relaxed max-w-sm">
                Il gestionale completo per pasticceria, panificio e ristorante: gestisci ricette, calcola costi, genera etichette alimentari e monitora la produzione.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-8">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-white mb-4 tracking-wider">
                    {section.title.toUpperCase()}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          {...(link.dataLb ? { "data-lb": link.dataLb } : {})}
                          className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block py-2"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  &copy; {currentYear} LabManager. Tutti i diritti riservati.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ultimo aggiornamento: Febbraio 2026
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400" aria-label="Fatto con amore per i pasticceri">
                <span aria-hidden="true">Fatto con</span>
                <Heart size={14} className="text-red-500" fill="currentColor" aria-hidden="true" />
                <span aria-hidden="true">per i pasticceri</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
                LabManager di Emanuele Lucania — Impresa individuale — P.IVA: 04257360364 — MO-455893 — Sede: Via Guido Mazzali 37, Carpi (MO) —{" "}
                <a href="mailto:labmanager.info@gmail.com" className="hover:text-gray-400 transition-colors duration-200">
                  labmanager.info@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
