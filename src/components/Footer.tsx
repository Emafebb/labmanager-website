import Image from "next/image";
import { Heart } from "lucide-react";

const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: "Prodotto",
    links: [
      { label: "Funzionalità", href: "#funzionalita" },
      { label: "Piattaforme", href: "#piattaforme" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Supporto",
    links: [
      { label: "Contatti", href: "#contatti" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: `https://www.iubenda.com/privacy-policy/${process.env.NEXT_PUBLIC_IUBENDA_POLICY_ID}`, external: true },
      { label: "Cookie Policy", href: `https://www.iubenda.com/privacy-policy/${process.env.NEXT_PUBLIC_IUBENDA_POLICY_ID}/cookie-policy`, external: true },
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
              <a href="/" className="group inline-flex items-center gap-3 mb-6">
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
                    LABMANAGER
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-widest -mt-1">
                    PASTICCERIA
                  </span>
                </div>
              </a>

              <p className="text-gray-400 leading-relaxed max-w-sm">
                L&apos;app completa per gestire ricette, costi e produzione della tua pasticceria con precisione professionale.
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
                          {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              <p className="text-sm text-gray-400">
                &copy; {currentYear} LabManager. Tutti i diritti riservati.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-400" aria-label="Fatto con amore per i pasticceri">
                <span aria-hidden="true">Fatto con</span>
                <Heart size={14} className="text-red-500" fill="currentColor" aria-hidden="true" />
                <span aria-hidden="true">per i pasticceri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
