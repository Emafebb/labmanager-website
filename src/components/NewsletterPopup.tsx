"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Mail, User, Building2, Sparkles } from "lucide-react";

const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed";
const STORAGE_KEY_DISMISSED = "newsletter_dismissed";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SCROLL_THRESHOLD = 0.5; // mostra dopo 50% di scroll

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const subscribed = localStorage.getItem(STORAGE_KEY_SUBSCRIBED);
    if (subscribed === "true") return;

    const dismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (dismissed) {
      const elapsed = Date.now() - parseInt(dismissed, 10);
      if (elapsed < COOLDOWN_MS) return;
    }

    function handleScroll() {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [visible]);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, privacyAccepted }),
      });

      if (!res.ok) throw new Error("Errore iscrizione");

      setStatus("success");
      localStorage.setItem(STORAGE_KEY_SUBSCRIBED, "true");
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  const closeAction = status === "success" ? () => setVisible(false) : dismiss;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-heading"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-hidden="true"
        style={{ animation: "nlFadeIn 0.3s ease-out" }}
      />

      {/* Modal — bottom sheet on mobile, centered card on desktop */}
      <div
        className="relative w-full sm:max-w-[420px] max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl sm:mx-4"
        style={{ animation: "nlSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-icon to-primary/60 sm:rounded-t-2xl" />

        {/* Mobile drag indicator */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Close button */}
        <button
          onClick={closeAction}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          aria-label="Chiudi"
        >
          <X size={18} />
        </button>

        <div className="px-6 pt-5 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl" />
                <div className="relative p-4 rounded-full bg-green-50 border border-green-100">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-5 mb-1.5">
                Iscrizione completata!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                Grazie per esserti iscritto. Riceverai a breve un&apos;email di benvenuto.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="relative inline-flex mb-4">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg" />
                  <div className="relative p-2.5 rounded-full bg-gradient-to-br from-primary/10 to-icon/10 border border-primary/10">
                    <Sparkles size={20} className="text-primary" />
                  </div>
                </div>
                <h2
                  id="newsletter-heading"
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 tracking-tight"
                >
                  Resta aggiornato su{" "}
                  <span className="gradient-text">LabManager</span>
                </h2>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Novit&agrave;, aggiornamenti e nuove funzionalit&agrave; per il tuo laboratorio.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name + Email in compact layout */}
                <div>
                  <label htmlFor="nl-name" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1">
                    <User size={12} className="text-icon" />
                    Nome
                  </label>
                  <input
                    id="nl-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm bg-gray-50/50 placeholder:text-gray-400"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label htmlFor="nl-email" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1">
                    <Mail size={12} className="text-icon" />
                    Email
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm bg-gray-50/50 placeholder:text-gray-400"
                    placeholder="mario.rossi@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="nl-business" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1">
                    <Building2 size={12} className="text-icon" />
                    Tipo di attivit&agrave;
                    <span className="text-[10px] font-normal text-gray-400">(opzionale)</span>
                  </label>
                  <select
                    id="nl-business"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm bg-gray-50/50"
                  >
                    <option value="">Seleziona...</option>
                    <option value="Pasticceria">Pasticceria</option>
                    <option value="Panificio">Panificio</option>
                    <option value="Ristorante">Ristorante</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                  <input
                    id="nl-privacy"
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/10 accent-primary"
                  />
                  <label htmlFor="nl-privacy" className="text-[11px] text-gray-500 leading-relaxed cursor-pointer">
                    Acconsento a ricevere la newsletter di LabManager e ho letto la{" "}
                    <a
                      href="https://www.iubenda.com/privacy-policy/79608415"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-primary-dark underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    . Puoi disiscriverti in qualsiasi momento.
                  </label>
                </div>

                {status === "error" && (
                  <div role="alert" className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <p>Errore durante l&apos;iscrizione. Riprova tra qualche istante.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !privacyAccepted}
                  aria-busy={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Iscrizione in corso...</span>
                    </>
                  ) : (
                    <span>Iscriviti alla newsletter</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Inline keyframe animations */}
      <style jsx>{`
        @keyframes nlFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes nlSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 640px) {
          @keyframes nlSlideUp {
            from {
              opacity: 0;
              transform: translateY(24px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `}</style>
    </div>
  );
}
