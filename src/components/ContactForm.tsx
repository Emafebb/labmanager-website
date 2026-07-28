"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MessageCircle,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { WHATSAPP_URL } from "@/data/support-links";

const PRIVACY_POLICY_URL =
  "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it";
const SUPPORT_EMAIL = "labmanager.info@gmail.com";

const helpTopics = [
  "Informazioni su LabManager",
  "Domande sul piano",
  "Assistenza sull'utilizzo",
  "Suggerimenti e feedback",
] as const;

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
      className="home-contact bg-surface px-6 py-14 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-primary">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            Percorso di supporto
          </p>
          <h2
            id="contact-heading"
            className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-gray-900 sm:text-5xl"
          >
            Hai domande? <span className="text-primary">Parla con noi</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Scrivici per domande su LabManager, sul piano o sul suo utilizzo nel
            tuo laboratorio. Puoi compilare il form o contattarci su WhatsApp.
          </p>

          <div className="mt-10 border-y border-gray-300">
            {helpTopics.map((topic, index) => (
              <div
                key={topic}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-gray-200 py-4 last:border-b-0"
              >
                <span className="text-xs font-semibold text-primary">
                  S{index + 1}
                </span>
                <span className="font-medium text-gray-700">{topic}</span>
              </div>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target mt-8 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1ebe57]"
          >
            <MessageCircle
              size={20}
              fill="currentColor"
              aria-hidden="true"
            />
            <span>Scrivici su WhatsApp</span>
          </a>
        </div>

        <div>
          {status === "success" ? (
            <div
              role="status"
              className="home-contact__form animate-scale-in flex min-h-[34rem] flex-col items-center justify-center text-center"
            >
              <div className="mb-6 inline-flex rounded-full bg-green-100 p-5">
                <CheckCircle2
                  size={40}
                  className="text-green-700"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Messaggio inviato!
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-gray-600">
                Grazie per averci contattato. Ti risponderemo al più presto.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="touch-target mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-primary-dark"
              >
                <Send size={18} aria-hidden="true" />
                <span>Invia un altro messaggio</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="home-contact__form">
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] text-primary">
                    CONTATTI
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    Raccontaci cosa ti serve
                  </h3>
                </div>
                <Mail size={24} className="text-primary" aria-hidden="true" />
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900"
                  >
                    <User
                      size={15}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-200"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900"
                  >
                    <Mail
                      size={15}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-200"
                    placeholder="mario.rossi@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900"
                  >
                    <MessageSquare
                      size={15}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-200"
                    placeholder="Scrivi qui il tuo messaggio..."
                  />
                </div>

                <div className="flex items-start gap-3 border-t border-gray-200 pt-5">
                  <input
                    id="privacy"
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-gray-300"
                  />
                  <label
                    htmlFor="privacy"
                    className="touch-target cursor-pointer text-sm leading-relaxed text-gray-700"
                  >
                    Ho letto e accetto la{" "}
                    <a
                      href={PRIVACY_POLICY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary underline hover:text-primary-dark"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsletterAccepted}
                    onChange={(e) => setNewsletterAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-gray-300"
                  />
                  <label
                    htmlFor="newsletter"
                    className="touch-target cursor-pointer text-sm leading-relaxed text-gray-700"
                  >
                    Acconsento a ricevere aggiornamenti e novità di LabManager
                    via email.{" "}
                    <span className="text-xs text-gray-500">(opzionale)</span>
                  </label>
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p>
                      Non siamo riusciti a inviare il messaggio. Riprova oppure
                      scrivici a{" "}
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="font-semibold underline hover:text-red-900"
                      >
                        {SUPPORT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {!privacyAccepted && (
                  <p
                    id="contact-privacy-hint"
                    className="text-sm leading-relaxed text-gray-600"
                  >
                    Per inviare il messaggio, accetta prima la Privacy Policy.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !privacyAccepted}
                  aria-busy={status === "loading"}
                  aria-describedby={
                    !privacyAccepted ? "contact-privacy-hint" : undefined
                  }
                  className="touch-target inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <span
                        className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      <span>Invio in corso...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      <span>Invia Messaggio</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
