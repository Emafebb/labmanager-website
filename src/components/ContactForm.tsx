"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, User, MessageSquare, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, privacyAccepted }),
      });

      if (!res.ok) throw new Error("Errore invio");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setPrivacyAccepted(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contatti" className="px-6 py-24 bg-surface" aria-labelledby="contact-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-icon/10 text-icon px-4 py-2 rounded-full text-sm font-bold mb-6 border border-icon/20">
            <Mail size={16} aria-hidden="true" />
            <span>CONTATTACI</span>
          </div>

          <h2 id="contact-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Hai domande sul gestionale? <span className="text-primary">Scrivici</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hai domande sul gestionale per la tua pasticceria? Scopri di più sulle{" "}
            <a href="#funzionalita" className="text-primary underline hover:text-primary-dark">
              funzionalità
            </a>{" "}
            o sulle{" "}
            <a href="#piattaforme" className="text-primary underline hover:text-primary-dark">
              piattaforme disponibili
            </a>?
            Il nostro team è pronto ad aiutarti. Compila il form e ti risponderemo al più presto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 border border-card-border/25 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Perché contattarci?
              </h3>

              <ul className="space-y-4">
                {[
                  { icon: Sparkles, text: "Richiedi una demo" },
                  { icon: Mail, text: "Informazioni generali sull'app" },
                  { icon: AlertCircle, text: "Segnala un problema tecnico" },
                  { icon: MessageSquare, text: "Suggerisci una funzionalità" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-2.5 rounded-lg bg-icon/10">
                      <item.icon size={18} className="text-icon" aria-hidden="true" />
                    </div>
                    <p className="text-gray-700 font-medium">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border border-card-border/25 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Altre informazioni</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Solitamente rispondiamo entro <strong className="text-gray-900">24 ore</strong> nei giorni lavorativi.
              </p>
              <div className="flex items-center gap-2 text-sm text-icon font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Team disponibile</span>
              </div>
            </div>
          </div>

          <div>
            {status === "success" ? (
              <div role="status" className="bg-white rounded-xl p-12 border border-card-border/25 shadow-sm text-center animate-scale-in">
                <div className="inline-flex p-5 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 size={40} className="text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Messaggio inviato!</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Grazie per averci contattato. Ti risponderemo al più presto.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors duration-200"
                >
                  <Send size={18} aria-hidden="true" />
                  <span>Invia un altro messaggio</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 sm:p-10 border border-card-border/25 shadow-sm">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                      <User size={15} className="text-icon" aria-hidden="true" />
                      Nome completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-base bg-white"
                      placeholder="Mario Rossi"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                      <Mail size={15} className="text-icon" aria-hidden="true" />
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-base bg-white"
                      placeholder="mario.rossi@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                      <MessageSquare size={15} className="text-icon" aria-hidden="true" />
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-icon focus:ring-4 focus:ring-icon/10 outline-none transition-all text-base resize-none bg-white"
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-icon/10"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
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
                    <div role="alert" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" aria-hidden="true" />
                      <p>
                        Errore nell&apos;invio del messaggio. Riprova o scrivici direttamente via email.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !privacyAccepted}
                    aria-busy={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </div>
    </section>
  );
}
