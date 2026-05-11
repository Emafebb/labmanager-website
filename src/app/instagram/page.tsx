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
    "Tutti i link di LabManager — il gestionale per il settore alimentare e ristorativo.",
  robots: { index: false },
};

const LINKS = [
  {
    label: "Scopri LabManager",
    href: "https://pastrylabmanager.com",
  },
  {
    label: "Scrivici su WhatsApp",
    href: "https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager",
  },
  {
    label: "Prezzi e piani",
    href: "https://pastrylabmanager.com/pricing",
  },
  {
    label: "Newsletter",
    href: "https://pastrylabmanager.com/newsletter",
  },
];

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
        .fu-2 { animation-delay: 0.18s; }
        .fu-3 { animation-delay: 0.30s; }
        .fu-4 { animation-delay: 0.40s; }
        .fu-5 { animation-delay: 0.48s; }
        .fu-6 { animation-delay: 0.55s; }
        .fu-7 { animation-delay: 0.60s; }

        .lbtn {
          background: rgba(255,255,255,0.97);
          border: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12);
        }
        .lbtn:hover {
          transform: translateY(-2px) scale(1.015);
          box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14);
        }
        .lbtn:active { transform: scale(0.985); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
      `}</style>

      {/* Grain texture */}
      <div className="grain absolute inset-0 opacity-[0.04] pointer-events-none" />

      {/* Gradient layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #7c3aed 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 100%, #5b21b6 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-[380px] flex flex-col items-center gap-10">

        {/* Header */}
        <div className="fu fu-1 flex flex-col items-center gap-5 text-center">
          {/* Logo */}
          <div
            className="w-[88px] h-[88px] rounded-[22px] overflow-hidden ring-2 ring-white/20"
            style={{
              boxShadow:
                "0 2px 0 rgba(255,255,255,0.15) inset, 0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="LabManager"
              width={88}
              height={88}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <div>
            <h1
              className="text-[2.75rem] leading-none text-white"
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontWeight: 700,
                textShadow: "0 2px 20px rgba(0,0,0,0.25)",
              }}
            >
              LabManager
            </h1>

            {/* Separator */}
            <div className="flex items-center justify-center gap-2 mt-3 mb-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-white/30 text-[7px]">◆</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
            </div>

            <p className="text-[10px] tracking-[0.25em] uppercase text-white/45 font-medium">
              Gestionale per il settore alimentare e ristorativo
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-[10px]">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`lbtn fu fu-${i + 3} w-full flex items-center justify-between py-[15px] px-5 rounded-2xl`}
            >
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: "#4403af" }}
              >
                {link.label}
              </span>
              <svg
                className="w-4 h-4 shrink-0"
                style={{ color: "#7c3aed", opacity: 0.6 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="fu fu-7 text-[10px] tracking-[0.2em] uppercase text-white/20">
          © 2026 LabManager
        </p>
      </div>
    </main>
  );
}
