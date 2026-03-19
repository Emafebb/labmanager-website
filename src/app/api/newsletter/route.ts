import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, businessType, privacyAccepted } = await req.json();

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome ed email sono obbligatori" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Formato email non valido" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "È necessario accettare la Privacy Policy" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = email.trim().toLowerCase();
    const safeBusinessType = businessType ? escapeHtml(businessType.trim()) : null;

    // 1. Upsert to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          name: safeName,
          email: safeEmail,
          business_type: safeBusinessType,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Errore Supabase:", dbError);
      return NextResponse.json(
        { error: "Errore durante l'iscrizione" },
        { status: 500 }
      );
    }

    // 2. Add to Resend Audience
    try {
      await resend.contacts.create({
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        email: safeEmail,
        firstName: safeName,
        unsubscribed: false,
      });
    } catch (audienceError) {
      console.error("Errore Resend Audience:", audienceError);
      // Non-blocking: contact is saved in Supabase
    }

    // 3. Send welcome email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "LabManager <noreply@pastrylabmanager.com>",
        to: safeEmail,
        subject: "Benvenuto in LabManager!",
        html: buildWelcomeEmail(safeName),
      });
    } catch (emailError) {
      console.error("Errore invio email benvenuto:", emailError);
      // Non-blocking: contact is saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore newsletter:", error);
    return NextResponse.json(
      { error: "Errore durante l'iscrizione" },
      { status: 500 }
    );
  }
}

function buildWelcomeEmail(name: string): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>Benvenuto in LabManager</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ede9e1; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e1b18;">

  <div style="display: none; font-size: 1px; color: #ede9e1; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
    Grazie per esserti iscritto! Scopri cosa pu&ograve; fare LabManager per il tuo laboratorio.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ede9e1;">
    <tr>
      <td align="center" style="padding: 44px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width: 620px; width: 100%;">

          <!-- Top rule -->
          <tr><td style="height: 3px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr><td style="height: 1px; background-color: #ede9e1; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr><td style="height: 1px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>

          <!-- Hero -->
          <tr>
            <td style="background-color: #12201a; padding: 52px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border: 1px solid #2a5c3a; padding: 5px 13px; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6ee7a0;">
                          Benvenuto
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <h1 style="font-family: Georgia, serif; font-size: 36px; font-weight: 400; color: #ffffff; line-height: 1.2; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                Ciao ${name}!
              </h1>
              <p style="font-size: 15px; color: #6a8c78; max-width: 440px; margin: 0; line-height: 1.7; font-weight: 300;">
                Grazie per esserti iscritto alla newsletter di LabManager. Ti terremo aggiornato su tutte le novit&agrave;.
              </p>
            </td>
          </tr>

          <!-- Features overview -->
          <tr>
            <td style="padding: 52px; background-color: #faf7f2;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 36px;">
                <tr>
                  <td style="border-bottom: 1px solid #ddd8cf; padding-bottom: 16px;">
                    <p style="font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #2d6a44; margin: 0 0 6px 0;">Cosa puoi fare</p>
                    <h2 style="font-family: Georgia, serif; font-size: 26px; font-weight: 400; color: #1e1b18; margin: 0; line-height: 1.25;">
                      Le funzionalit&agrave; principali
                    </h2>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db; margin-bottom: 20px;">
                    <p style="font-family: Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Gestione ricette digitali</p>
                    <p style="font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Organizza ingredienti, procedimenti e pesi con calcolo automatico delle quantit&agrave;.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px;"></td></tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Calcolo costi e margini</p>
                    <p style="font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Scopri esattamente quanto costa ogni ricetta e quanto margine hai su ogni prodotto.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px;"></td></tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Etichette alimentari (EU 1169/2011)</p>
                    <p style="font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Genera etichette con allergeni, valori nutrizionali e lista ingredienti a norma di legge.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px;"></td></tr>
                <tr>
                  <td>
                    <p style="font-family: Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Offline su Android e Windows</p>
                    <p style="font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Funziona senza connessione internet. I dati si sincronizzano automaticamente quando torni online.</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 40px;">
                <tr>
                  <td>
                    <a href="https://pastrylabmanager.com" style="display: inline-block; padding: 16px 32px; font-size: 12px; font-weight: 600; color: #ffffff; text-decoration: none; background-color: #1e1b18; letter-spacing: 1.5px; text-transform: uppercase;">
                      Scopri LabManager
                    </a>
                    <span style="display: inline-block; margin-left: 16px;">
                      <a href="https://pastrylabmanager.com/download" style="font-size: 12px; font-weight: 600; color: #2d6a44; text-decoration: none; letter-spacing: 1px; text-transform: uppercase;">
                        Download &rarr;
                      </a>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr><td style="height: 1px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr>
            <td style="padding: 40px 52px; background-color: #f3efe8; text-align: center;">
              <p style="font-family: Georgia, serif; font-size: 20px; font-weight: 400; color: #1e1b18; margin: 0 0 4px 0;">LabManager</p>
              <p style="font-size: 10px; color: #a09880; margin: 0 0 32px 0; letter-spacing: 2px; text-transform: uppercase;">Il gestionale per pasticceri professionisti</p>
              <p style="margin: 0 0 8px 0;">
                <a href="https://pastrylabmanager.com" style="color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Sito Web</a>
                <span style="color: #c8c0b4; font-size: 11px; padding: 0 10px;">&middot;</span>
                <a href="https://pastrylabmanager.com/download" style="color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Download</a>
                <span style="color: #c8c0b4; font-size: 11px; padding: 0 10px;">&middot;</span>
                <a href="mailto:labmanager.info@gmail.com" style="color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Contatti</a>
              </p>
              <p style="margin: 0 0 24px 0;">
                <a href="https://www.iubenda.com/privacy-policy/79608415" style="color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Privacy Policy</a>
                <span style="color: #c8c0b4; font-size: 11px; padding: 0 10px;">&middot;</span>
                <a href="{{unsubscribe_url}}" style="color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Cancella iscrizione</a>
              </p>
              <p style="font-size: 10px; color: #a09880; margin: 0 0 3px 0;">&copy; 2026 LabManager. Tutti i diritti riservati.</p>
              <p style="font-size: 10px; color: #b8b0a4; margin: 8px 0 0 0;">Hai ricevuto questa email perch&eacute; ti sei iscritto alla newsletter di LabManager.</p>
            </td>
          </tr>

          <!-- Bottom rule -->
          <tr><td style="height: 3px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
