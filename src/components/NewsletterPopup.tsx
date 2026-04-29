"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Sparkles } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed";
const STORAGE_KEY_DISMISSED = "newsletter_dismissed";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SCROLL_THRESHOLD = 0.5; // mostra dopo 50% di scroll

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
  }, []);

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
  }, [dismiss, visible]);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [visible]);

  if (!visible) return null;

  const closeAction = submitted ? () => setVisible(false) : dismiss;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={submitted ? undefined : "newsletter-heading"}
      aria-label={submitted ? "Iscrizione newsletter completata" : undefined}
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
          {!submitted && (
            <div className="text-center mb-6">
              <div className="relative inline-flex mb-4">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg" />
                <div className="relative p-2.5 rounded-full bg-gradient-to-br from-primary/10 to-icon/10 border border-primary/10">
                  <Sparkles size={20} className="text-primary" aria-hidden="true" />
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
          )}

          <NewsletterForm variant="popup" onSuccess={() => setSubmitted(true)} />
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
