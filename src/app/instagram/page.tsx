import type { Metadata } from "next";
import Image from "next/image";

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
  { label: "Scopri LabManager", href: "https://labmanagergestionale.com" },
  {
    label: "Prezzi Light e Plus",
    href: "https://labmanagergestionale.com/pricing",
  },
  { label: "Scrivici su WhatsApp", href: WHATSAPP_HREF },
  {
    label: "Iscriviti alla newsletter",
    href: "https://labmanagergestionale.com/newsletter",
  },
];
export default function InstagramPage() {
  return (
    <main id="main-content" className="social-page">
      <header>
        <Image src="/images/logo.png" alt="" width={64} height={64} preload />
        <h1>LabManager</h1>
        <p>
          Laboratori artigianali alimentari. <br />
          Dalla ricetta al banco.
        </p>
      </header>
      <nav aria-label="Link principali">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
      <p className="small-note">© 2026 LabManager</p>
    </main>
  );
}
