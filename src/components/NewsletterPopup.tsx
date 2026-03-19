"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Bell, CheckCircle2, AlertCircle, Mail, User, Building2 } from "lucide-react";

const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed";
const STORAGE_KEY_DISMISSED = "newsletter_dismissed";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const DELAY_MS = 4000;

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
    // SSR-safe: only access localStorage in useEffect
    const subscribed = localStorage.getItem(STORAGE_KEY_SUBSCRIBED);
    if (subscribed === "true") return;

    const dismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (dismissed) {
      const elapsed = Date.now() - parseInt(dismissed, 10);
      if (elapsed < COOLDOWN_MS) return;
    }

    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={status === "success" ? () => setVisible(false) : dismiss}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 sm:p-10 border border-card-border/25 shadow-lg animate-scale-in">
        {/* Close button */}
        <button
          onClick={status === "success" ? () => setVisible(false) : dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Chiudi"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="inline-flex p-4 rounded-full bg-green-100 mb-5">
              <CheckCircle2 size={36} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Iscrizione completata!</h3>
            <p className="text-gray-600 leading-relaxed">
              Grazie per esserti iscritto. Riceverai a breve un&apos;email di benvenuto.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-7">
              <div className="inline-flex p-3 rounded-full bg-icon/10 mb-4">
                <Bell size={24} className="text-icon" />
              </div>
              <h2 id="newsletter-heading" className="text-2xl font-bold text-gray-900 mb-2">
                Resta aggiornato su LabManager
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ricevi in anteprima novità, aggiornamenti e nuove funzionalità per il tuo laboratorio.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nl-name" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1.5">
                  <User size={14} className="text-icon" />
                  Nome
                </label>
                <input
                  id="nl-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-sm bg-white"
                  placeholder="Mario Rossi"
                />
              </div>

              <div>
                <label htmlFor="nl-email" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1.5">
                  <Mail size={14} className="text-icon" />
                  Email
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-sm bg-white"
                  placeholder="mario.rossi@email.com"
                />
              </div>

              <div>
                <label htmlFor="nl-business" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1.5">
                  <Building2 size={14} className="text-icon" />
                  Tipo di attività
                  <span className="text-xs font-normal text-gray-400">(opzionale)</span>
                </label>
                <select
                  id="nl-business"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-sm bg-white"
                >
                  <option value="">Seleziona...</option>
                  <option value="Pasticceria">Pasticceria</option>
                  <option value="Panificio">Panificio</option>
                  <option value="Ristorante">Ristorante</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  id="nl-privacy"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-icon/10"
                />
                <label htmlFor="nl-privacy" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  Ho letto e accetto la{" "}
                  <a
                    href="https://www.iubenda.com/privacy-policy/79608415"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:text-primary-dark underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {status === "error" && (
                <div role="alert" className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <p>Errore durante l&apos;iscrizione. Riprova tra qualche istante.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !privacyAccepted}
                aria-busy={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
