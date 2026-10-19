"use client";

import { useId, useState } from "react";
const STORAGE_KEY_SUBSCRIBED = "newsletter_subscribed";
const PRIVACY_POLICY_URL =
  "https://app.legalblink.it/api/documents/69e89f282420950024cb1a58/privacy-policy-per-siti-web-o-e-commerce-it";

type NewsletterFormProps = {
  variant?: "page" | "popup";
  onSuccess?: () => void;
};

export default function NewsletterForm({
  variant = "page",
  onSuccess,
}: NewsletterFormProps) {
  const id = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      try {
        localStorage.setItem(STORAGE_KEY_SUBSCRIBED, "true");
      } catch {
        // The subscription is already saved server-side; storage only hides the popup locally.
      }
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div role="status" className="form-message">
        <h3>Iscrizione completata!</h3>
        <p>Grazie. La tua iscrizione alla newsletter è stata registrata.</p>
      </div>
    );
  return (
    <form
      onSubmit={handleSubmit}
      className={`newsletter-form newsletter-form--${variant}`}
    >
      <div className="field">
        <label htmlFor={`${id}-name`}>Nome</label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          name="email"
          autoComplete="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-business`}>Tipo di attività (opzionale)</label>
        <select
          id={`${id}-business`}
          value={formData.businessType}
          onChange={(e) =>
            setFormData({ ...formData, businessType: e.target.value })
          }
        >
          <option value="">Seleziona…</option>
          <option value="Pasticceria">Pasticceria</option>
          <option value="Panificio">Panificio</option>
          <option value="Gelateria">Gelateria</option>
          <option value="Altro">Altro</option>
        </select>
      </div>
      <div className="consent">
        <input
          id={`${id}-privacy`}
          type="checkbox"
          required
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
        />
        <div>
          <label htmlFor={`${id}-privacy`}>
            Acconsento a ricevere la newsletter di LabManager.
          </label>
          <p>
            Ho letto la{" "}
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            . Puoi disiscriverti in qualsiasi momento.
          </p>
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="form-message">
          Errore durante l’iscrizione. Riprova tra qualche istante.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading" || !privacyAccepted}
        aria-busy={status === "loading"}
        className="button"
      >
        {status === "loading"
          ? "Iscrizione in corso…"
          : "Iscriviti alla newsletter"}
      </button>
    </form>
  );
}
