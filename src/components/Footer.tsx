import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { WHATSAPP_URL } from "@/data/support-links";
import { WORK_AREAS } from "@/data/work-areas";

const LEGAL_BASE =
  "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/";
export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Informazioni LabManager">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link
            href="/"
            className="site-footer__name"
            aria-label="LabManager, torna alla homepage"
          >
            LabManager
          </Link>
          <p>Fatto per chi lavora ogni giorno in laboratorio.</p>
        </div>
        <div className="site-footer__links">
          <nav aria-label="Prodotto">
            <h2 className="site-footer__nav-title">Esplora LabManager</h2>
            <Link href="/#funzionalita">Tutte le funzionalità</Link>
            {WORK_AREAS.map((area) => <Link href={area.href} key={area.href}>{area.title}</Link>)}
            <Link href="/pricing">Prezzi</Link>
          </nav>
          <nav aria-label="Supporto" className="site-footer__support">
            <h2 className="site-footer__nav-title">Contatti e novità</h2>
            <Link href="/#contatti">Contatti</Link>
            <Link href="/newsletter">Newsletter</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/labmanager_gestionale/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </nav>
        </div>
        <div className="site-footer__company">
          <p>LabManager è un prodotto di PastryLab S.N.C. di Pedrielli Laura e C.</p>
          <p>P.IVA e C.F.: 04279110367 — REA: MO-457542</p>
          <p>Sede legale: Via Giacomo Matteotti 21, 41012 Carpi (MO).</p>
          <a href="mailto:labmanager.info@gmail.com">labmanager.info@gmail.com</a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <nav aria-label="Legale" className="site-footer__legal">
          <p>© {new Date().getFullYear()} LabManager</p>
          <a
            href={`${LEGAL_BASE}privacy-policy-per-siti-web-o-e-commerce-it`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href={`${LEGAL_BASE}cookie-policy-it`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>
          <CookieSettingsLink className="footer-cookie-link">
            Aggiorna preferenze cookie
          </CookieSettingsLink>
        </nav>
        <p className="site-footer__credit">
          Le immagini di lavorazione sono illustrazioni editoriali generate con
          AI.
        </p>
      </div>
    </footer>
  );
}
