"use client";

import { useState } from "react";
import { WHATSAPP_URL } from "@/data/support-links";

const PRIVACY_POLICY_URL =
  "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it";
const SUPPORT_EMAIL = "labmanager.info@gmail.com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          privacyAccepted,
          newsletterAccepted,
        }),
      });

      if (!res.ok) throw new Error("Errore invio");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setPrivacyAccepted(false);
      setNewsletterAccepted(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contatti"
      className="contact section-space"
      aria-labelledby="contact-heading"
    >
      <div className="contact__intro" data-reveal>
        <h2 id="contact-heading">
          Parliamo del <br />
          tuo lavoro.
        </h2>
        <p>
          Raccontaci come è organizzato il tuo laboratorio. Ti aiutiamo a capire
          come usare LabManager e quale piano scegliere.
        </p>
        <a
          href={WHATSAPP_URL}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Scrivici su WhatsApp
        </a>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-link">
          {SUPPORT_EMAIL}
        </a>
      </div>
      {status === "success" ? (
        <div className="form-success" role="status">
          <h3>Messaggio inviato.</h3>
          <p>Grazie per averci contattato. Ti risponderemo al più presto.</p>
          <button
            type="button"
            className="button"
            onClick={() => setStatus("idle")}
          >
            Invia un altro messaggio
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form" data-reveal>
          <h3>Raccontaci cosa ti serve</h3>
          <div className="field">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="message">Messaggio</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(event) =>
                setFormData({ ...formData, message: event.target.value })
              }
            />
          </div>
          <div className="consent">
            <input
              id="privacy"
              type="checkbox"
              required
              checked={privacyAccepted}
              onChange={(event) => setPrivacyAccepted(event.target.checked)}
            />
            <label htmlFor="privacy">
              Ho letto e accetto la{" "}
              <a
                href={PRIVACY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          <div className="consent">
            <input
              id="newsletter"
              type="checkbox"
              checked={newsletterAccepted}
              onChange={(event) => setNewsletterAccepted(event.target.checked)}
            />
            <label htmlFor="newsletter">
              Acconsento a ricevere aggiornamenti e novità di LabManager via
              email. (opzionale)
            </label>
          </div>
          {status === "error" && (
            <p className="form-message" role="alert">
              Non siamo riusciti a inviare il messaggio. Riprova oppure scrivici
              a <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          )}
          {!privacyAccepted && (
            <p id="contact-privacy-hint" className="small-note">
              Per inviare il messaggio, accetta prima la Privacy Policy.
            </p>
          )}
          <button
            type="submit"
            className="button"
            disabled={status === "loading" || !privacyAccepted}
            aria-busy={status === "loading"}
            aria-describedby={
              !privacyAccepted ? "contact-privacy-hint" : undefined
            }
          >
            {status === "loading" ? "Invio in corso…" : "Invia Messaggio"}
          </button>
        </form>
      )}
    </section>
  );
}
