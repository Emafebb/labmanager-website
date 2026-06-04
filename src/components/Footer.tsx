import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Heart } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const currentYear = new Date().getFullYear();
const PRIVACY_POLICY_URL = "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it";
const COOKIE_POLICY_URL = "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/cookie-policy-it";
const INSTAGRAM_URL = "https://www.instagram.com/labmanager_gestionale/";

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

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socialLinks: SocialLink[] = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-label="Informazioni LabManager">
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 mb-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
              >
                <BrandLogo />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white tracking-tight">
                    LabManager
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 leading-relaxed max-w-sm">
                Il gestionale completo per pasticceria, panificio e ristorante: gestisci ricette, calcola costi, genera etichette alimentari e monitora la produzione.
              </p>

              <div className="mt-7">
                <h3 className="text-xs font-bold text-white/45 tracking-[0.15em] mb-3">
                  SEGUICI
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 touch-manipulation transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:border-transparent hover:-translate-y-[3px] hover:scale-105 hover:bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] hover:shadow-[0_10px_22px_-6px_rgba(220,39,67,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
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
