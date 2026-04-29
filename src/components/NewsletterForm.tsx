"use client";

import { useId, useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Mail,
  Send,
  User,
} from "lucide-react";

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
  const isPopup = variant === "popup";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

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

  const formClassName = isPopup ? "space-y-3" : "space-y-5";
  const labelClassName = isPopup
    ? "flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1"
    : "flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2";
  const inputClassName = isPopup
    ? "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm bg-gray-50/50 placeholder:text-gray-400"
    : "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-base bg-white placeholder:text-gray-400";
  const checkboxWrapClassName = isPopup
    ? "flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl"
    : "flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200";
  const privacyLabelClassName = isPopup
    ? "text-[11px] text-gray-500 leading-relaxed cursor-pointer"
    : "text-sm text-gray-700 leading-relaxed cursor-pointer";
  const buttonClassName = isPopup
    ? "w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
    : "w-full inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const successPadding = isPopup ? "py-6" : "py-8";

  if (status === "success") {
    return (
      <div role="status" className={`text-center ${successPadding}`}>
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl" />
          <div className="relative p-4 rounded-full bg-green-50 border border-green-100">
            <CheckCircle2 size={32} className="text-green-600" aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mt-5 mb-1.5">
          Iscrizione completata!
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[320px] mx-auto">
          Grazie per esserti iscritto. Riceverai a breve un&apos;email di
          benvenuto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div>
        <label htmlFor={`${id}-name`} className={labelClassName}>
          <User size={isPopup ? 12 : 15} className="text-icon" aria-hidden="true" />
          Nome
        </label>
        <input
          id={`${id}-name`}
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClassName}
          placeholder="Mario Rossi"
        />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={labelClassName}>
          <Mail size={isPopup ? 12 : 15} className="text-icon" aria-hidden="true" />
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClassName}
          placeholder="mario.rossi@email.com"
        />
      </div>

      <div>
        <label htmlFor={`${id}-business`} className={labelClassName}>
          <Building2
            size={isPopup ? 12 : 15}
            className="text-icon"
            aria-hidden="true"
          />
          Tipo di attivit&agrave;
          <span
            className={
              isPopup
                ? "text-[10px] font-normal text-gray-400"
                : "text-xs font-normal text-gray-400"
            }
          >
            (opzionale)
          </span>
        </label>
        <select
          id={`${id}-business`}
          value={formData.businessType}
          onChange={(e) =>
            setFormData({ ...formData, businessType: e.target.value })
          }
          className={inputClassName}
        >
          <option value="">Seleziona...</option>
          <option value="Pasticceria">Pasticceria</option>
          <option value="Panificio">Panificio</option>
          <option value="Ristorante">Ristorante</option>
          <option value="Altro">Altro</option>
        </select>
      </div>

      <div className={checkboxWrapClassName}>
        <input
          id={`${id}-privacy`}
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/10 accent-primary"
        />
        <label htmlFor={`${id}-privacy`} className={privacyLabelClassName}>
          Acconsento a ricevere la newsletter di LabManager e ho letto la{" "}
          <a
            href={PRIVACY_POLICY_URL}
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
        <div
          role="alert"
          className={
            isPopup
              ? "flex items-center gap-2 p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs"
              : "flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          }
        >
          <AlertCircle
            size={isPopup ? 14 : 18}
            className="flex-shrink-0"
            aria-hidden="true"
          />
          <p>Errore durante l&apos;iscrizione. Riprova tra qualche istante.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !privacyAccepted}
        aria-busy={status === "loading"}
        className={buttonClassName}
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Iscrizione in corso...</span>
          </>
        ) : (
          <>
            {!isPopup && <Send size={20} aria-hidden="true" />}
            <span>Iscriviti alla newsletter</span>
          </>
        )}
      </button>
    </form>
  );
}
