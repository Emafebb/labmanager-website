import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "LabManager | Links",
  description:
    "Tutti i link di LabManager - il gestionale per il settore alimentare e ristorativo.",
  robots: { index: false },
};

const WHATSAPP_HREF =
  "https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager";

const LINKS = [
  { label: "Scopri LabManager", href: "https://pastrylabmanager.com" },
  { label: "Prezzi e piani", href: "https://pastrylabmanager.com/pricing" },
];

function WhatsAppIcon() {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="#0b3d23" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.738-.755z" />
    </svg>
  );
}

export default function InstagramPage() {
  return (
    <main
      className={`${playfair.variable} relative min-h-dvh flex flex-col items-center justify-center px-6 py-16 overflow-hidden`}
      style={{ background: "#3a0390" }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { opacity: 0; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) forwards; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-3 { animation-delay: 0.30s; }
        .fu-4 { animation-delay: 0.40s; }
        .fu-5 { animation-delay: 0.48s; }
        .fu-6 { animation-delay: 0.55s; }
        .fu-7 { animation-delay: 0.60s; }
        .lbtn {
          background: rgba(255,255,255,0.97); border: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12);
        }
        .lbtn:hover { transform: translateY(-2px) scale(1.015); box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14); }
        .lbtn:active { transform: scale(0.985); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .wbtn {
          background: #25D366; border: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 28px rgba(37,211,102,0.40), 0 2px 6px rgba(0,0,0,0.18);
        }
        .wbtn:hover { transform: translateY(-2px) scale(1.015); box-shadow: 0 14px 40px rgba(37,211,102,0.50), 0 3px 10px rgba(0,0,0,0.2); }
        .wbtn:active { transform: scale(0.985); box-shadow: 0 3px 10px rgba(0,0,0,0.18); }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
      `}</style>

      <div className="grain absolute inset-0 opacity-[0.04] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #7c3aed 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 100%, #5b21b6 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="relative w-full max-w-[380px] flex flex-col items-center gap-10">
        <div className="fu fu-1 flex flex-col items-center gap-5 text-center">
          <Image
            src="/images/logo.png"
            alt="LabManager"
            width={96}
            height={96}
            className="w-[96px] h-[96px] object-contain"
            style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.35))" }}
          />
          <div>
            <h1
              className="text-[2.75rem] leading-none text-white"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 700, textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
            >
              LabManager
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3 mb-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-white/30 text-[7px]">&#9670;</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/45 font-medium">
              Gestionale per il settore alimentare e ristorativo
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="wbtn fu fu-3 w-full flex flex-col items-center gap-1 py-[17px] px-5 rounded-2xl text-center"
          >
            <span className="flex items-center gap-2">
              <WhatsAppIcon />
              <span className="text-[15px] font-semibold tracking-wide" style={{ color: "#0b3d23" }}>
                Scrivici su WhatsApp
              </span>
            </span>
            <span className="text-[11.5px] font-medium" style={{ color: "#0b3d23", opacity: 0.72 }}>
              Ti diciamo se LabManager fa per te. Nessun impegno.
            </span>
          </a>

          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`lbtn fu fu-${i + 4} w-full flex items-center justify-between py-[15px] px-5 rounded-2xl`}
            >
              <span className="text-sm font-semibold tracking-wide" style={{ color: "#4403af" }}>
                {link.label}
              </span>
              <svg className="w-4 h-4 shrink-0" style={{ color: "#7c3aed", opacity: 0.6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          ))}
        </div>

        <a
          href="https://pastrylabmanager.com/newsletter"
          target="_blank"
          rel="noopener noreferrer"
          className="fu fu-6 -mt-4 text-[12px] tracking-wide text-white/45 hover:text-white/75 transition-colors border-b border-white/15 hover:border-white/40 pb-[2px]"
        >
          Resta aggiornato - iscriviti alla newsletter
        </a>

        <p className="fu fu-7 text-[10px] tracking-[0.2em] uppercase text-white/20">
          &copy; 2026 LabManager
        </p>
      </div>
    </main>
  );
}
