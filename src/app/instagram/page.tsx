import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, House, MessageCircle, Tag } from "lucide-react";

const PAGE_URL = "https://labmanagergestionale.com/instagram";
const PAGE_DESCRIPTION =
  "I link di LabManager per laboratori artigianali alimentari.";

export const metadata: Metadata = {
  title: "Links",
  description: PAGE_DESCRIPTION,
  keywords: null,
  robots: { index: false },
  openGraph: {
    title: "Links | LabManager",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "LabManager",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Links | LabManager",
    description: PAGE_DESCRIPTION,
  },
};

const WHATSAPP_HREF =
  "https://wa.me/393500424228?text=Ciao!%20Vorrei%20informazioni%20su%20LabManager";

const LINKS = [
  {
    label: "Home",
    href: "https://labmanagergestionale.com",
    icon: House,
  },
  {
    label: "Prezzi",
    href: "https://labmanagergestionale.com/pricing",
    icon: Tag,
  },
];

export default function InstagramPage() {
  return (
    <main className="min-h-dvh bg-[#FAFBFE] px-5 py-5 text-foreground sm:py-8">
      <div className="animate-fade-in-up mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-[430px] flex-col sm:min-h-[calc(100dvh-4rem)]">
        <header
          className="flex flex-col items-center rounded-3xl bg-primary/[0.05] px-6 py-8 text-center"
          aria-label="LabManager"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={84}
            height={84}
            priority
            className="h-[84px] w-[84px] object-contain"
          />
          <h1 className="mt-5 text-[2.35rem] font-bold leading-none tracking-[-0.035em]">
            LabManager
          </h1>
          <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">
            Il gestionale per{" "}
            <span className="lowercase">
              Laboratori artigianali alimentari
            </span>
          </p>
        </header>

        <section className="mt-5 space-y-3" aria-label="Link principali">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target group flex min-h-[76px] w-full items-center justify-between gap-4 rounded-xl bg-[#25D366] px-5 py-4 text-[#0B3D23] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#20C65E] hover:shadow-md"
          >
            <span className="flex min-w-0 items-center gap-3">
              <MessageCircle size={22} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 text-left">
              <span className="block text-base font-semibold">
                  Scrivici su WhatsApp
              </span>
                <span className="mt-0.5 block text-xs leading-snug text-[#0B3D23]">
                  Ti diciamo se LabManager fa per te. Nessun impegno.
                </span>
              </span>
            </span>
            <ChevronRight
              size={19}
              className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <div className="grid grid-cols-2 gap-3">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target group flex min-h-14 items-center justify-between gap-2.5 rounded-xl border border-card-border bg-white px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300"
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    size={17}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </span>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-[var(--text-secondary)] transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-auto flex items-end justify-between gap-4 pt-7 text-xs text-[var(--text-secondary)]">
          <a
            href="https://labmanagergestionale.com/newsletter"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target inline-flex items-center underline decoration-card-border underline-offset-4 transition-colors duration-200 ease-out hover:text-primary"
          >
            Resta aggiornato — iscriviti alla newsletter
          </a>
          <p className="pb-3 text-right">
            &copy; 2026 LabManager
          </p>
        </footer>
      </div>
    </main>
  );
}
