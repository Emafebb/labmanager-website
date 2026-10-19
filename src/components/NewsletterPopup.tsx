"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed";
const STORAGE_KEY_DISMISSED = "newsletter_dismissed";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const SCROLL_THRESHOLD = 0.5;

export default function NewsletterPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
    } catch {
      // Closing still works when the browser blocks storage.
    }
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY_SUBSCRIBED) === "true") return;
      const dismissed = window.localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (dismissed && Date.now() - Number(dismissed) < COOLDOWN_MS) return;
    } catch {
      // Without storage the popup can still open once during this visit.
    }

    function handleScroll() {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (distance > 0 && window.scrollY / distance >= SCROLL_THRESHOLD) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!visible || !modal) return;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  const closeAction = submitted ? () => setVisible(false) : dismiss;

  return (
    <dialog
      ref={dialog}
      className="newsletter-popup"
      aria-modal="true"
      aria-labelledby={submitted ? undefined : "newsletter-popup-heading"}
      aria-label={submitted ? "Iscrizione newsletter completata" : undefined}
      onCancel={(event) => {
        event.preventDefault();
        closeAction();
      }}
    >
      <button
        type="button"
        onClick={closeAction}
        className="newsletter-popup__close touch-target"
        aria-label="Chiudi newsletter"
      >
        <X size={20} aria-hidden="true" />
      </button>
      {!submitted && (
        <header className="newsletter-popup__header">
          <h2 id="newsletter-popup-heading">Novità dal laboratorio.</h2>
          <p>
            Aggiornamenti e nuove funzionalità di LabManager per il tuo laboratorio.
          </p>
        </header>
      )}
      <NewsletterForm variant="popup" onSuccess={() => setSubmitted(true)} />
    </dialog>
  );
}
