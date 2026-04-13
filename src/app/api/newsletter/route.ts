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

    const rawName = name.trim();
    const safeName = escapeHtml(rawName);
    const safeEmail = email.trim().toLowerCase();
    const rawBusinessType = businessType ? businessType.trim() : null;
    const safeBusinessType = rawBusinessType ? escapeHtml(rawBusinessType) : null;

    // 1. Upsert to Supabase (dati grezzi, non HTML-escaped)
    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          name: rawName,
          email: safeEmail,
          business_type: rawBusinessType,
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
        firstName: rawName,
        unsubscribed: false,
      });
    } catch (audienceError) {
      console.error("Errore Resend Audience:", audienceError);
      // Non-blocking: contact is saved in Supabase
    }

    // 3. Send welcome email
    const unsubscribeToken = Buffer.from(safeEmail).toString("base64url");
    const unsubscribeUrl = `https://pastrylabmanager.com/api/unsubscribe?token=${unsubscribeToken}`;
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "LabManager <noreply@pastrylabmanager.com>",
        to: safeEmail,
        subject: "Benvenuto in LabManager!",
        html: buildWelcomeEmail(safeName, unsubscribeUrl),
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

function buildWelcomeEmail(name: string, unsubscribeUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="it" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table, td, div, p, a, h1, h2, h3, h4 { font-family: Georgia, 'Times New Roman', serif !important; }
    .button-td { padding: 0 !important; }
  </style>
  <![endif]-->

  <style>
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding-left: 28px !important; padding-right: 28px !important; }
      .hero-title { font-size: 30px !important; }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; background-color: #ede9e1; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e1b18; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ede9e1;">
    <tr>
      <td align="center" style="padding: 44px 20px;">
        <!--[if mso]>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" align="center">
        <tr><td>
        <![endif]-->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" class="email-container" style="max-width: 620px; width: 100%;">

          <!-- Preheader -->
          <tr>
            <td>
              <div style="display: none; font-size: 1px; color: #ede9e1; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
                Grazie per esserti iscritto! Ecco cosa puoi fare con LabManager.
              </div>
            </td>
          </tr>

          <!-- Top rule: double editorial -->
          <tr><td style="height: 3px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr><td style="height: 1px; background-color: #ede9e1; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr><td style="height: 1px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>

          <!-- Hero -->
          <tr>
            <td style="background-color: #12201a; padding: 52px;" class="mobile-padding">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border: 1px solid #2a5c3a; padding: 5px 13px; font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6ee7a0;">
                          BENVENUTO
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <h1 class="hero-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 36px; font-weight: 400; color: #ffffff; line-height: 1.2; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                Ciao ${name}!
              </h1>
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 15px; color: #6a8c78; max-width: 440px; margin: 0; line-height: 1.7; font-weight: 300;">
                Grazie per esserti iscritto. Da oggi riceverai in anteprima aggiornamenti, nuove funzionalit&agrave; e novit&agrave; pensate per chi lavora in laboratorio.
              </p>
            </td>
          </tr>

          <!-- Features section -->
          <tr>
            <td style="padding: 52px; background-color: #faf7f2;" class="mobile-padding">

              <!-- Section header -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 36px;">
                <tr>
                  <td style="border-bottom: 1px solid #ddd8cf; padding-bottom: 16px;">
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #2d6a44; margin: 0 0 6px 0;">COSA PUOI FARE</p>
                    <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 400; color: #1e1b18; margin: 0; line-height: 1.25;">
                      Tutto in un&rsquo;unica app
                    </h2>
                  </td>
                </tr>
              </table>

              <!-- Feature blocks -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Feature 1 -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Etichette pronte per la stampa</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Genera etichette con allergeni evidenziati, tabella nutrizionale, barcode, lotto e scadenza. Scegli il formato e stampa in PDF.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Feature 2 -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Calcolo costi e margini</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Sai esattamente quanto costa ogni ricetta e quanto margine hai su ogni prodotto venduto.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Feature 3 -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Archivio ricette</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Tutte le tue preparazioni organizzate per categoria. Cerca, filtra e scala le quantit&agrave; in automatico.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Feature 4 -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Dashboard produzione</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Registra produzioni con codice lotto, monitora vendite per canale e tieni sotto controllo le scadenze.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Feature 5 -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #e8e3db;">
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Offline e sincronizzato</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Funziona senza connessione. Modifichi una ricetta in ufficio, in laboratorio la ricevono aggiornata in tempo reale.</p>
                  </td>
                </tr>
                <tr><td style="height: 20px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Feature 6 (no border) -->
                <tr>
                  <td>
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1e1b18; margin: 0 0 4px 0;">Bilanciamento ricette</p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 13px; color: #6a6258; margin: 0; line-height: 1.7; font-weight: 300;">Confronta zuccheri, grassi, acqua, PAC e POD con i valori di riferimento. Feedback visivo immediato per ogni categoria.</p>
                  </td>
                </tr>

              </table>

              <!-- CTA section -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 40px;">

                <!-- CTA block 1: primary button -->
                <tr>
                  <td>
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://pastrylabmanager.com/download" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="0%" strokecolor="#1e1b18" fillcolor="#1e1b18">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:1px;">SCARICA LABMANAGER</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="https://pastrylabmanager.com/download" style="display: inline-block; padding: 16px 32px; font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 12px; font-weight: 600; color: #ffffff; text-decoration: none; background-color: #1e1b18; letter-spacing: 1.5px; text-transform: uppercase;">
                      SCARICA LABMANAGER
                    </a>
                    <!--<![endif]-->
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 11px; color: #b0a898; margin: 14px 0 0 0;">Disponibile per Android e Windows</p>
                  </td>
                </tr>

                <!-- CTA block 2: secondary link -->
                <tr>
                  <td style="padding-top: 24px;">
                    <a href="https://cal.com/labmanager-software-gestionale/scoprire-labmanager" style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 12px; font-weight: 600; color: #2d6a44; text-decoration: none; letter-spacing: 1px; text-transform: uppercase;">
                      SCOPRIAMOLO INSIEME &rarr;
                    </a>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 11px; color: #b0a898; margin: 6px 0 0 0;">Prenota una videocall gratuita &mdash; ti mostro LabManager dal vivo</p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- "Da Emanuele" section -->
          <tr>
            <td style="padding: 40px 52px; background-color: #faf7f2;" class="mobile-padding">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #e8e3db; padding-top: 32px;">
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #2d6a44; margin: 0 0 12px 0;">DA EMANUELE</p>
                    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 400; color: #1e1b18; margin: 0 0 10px 0; line-height: 1.3; letter-spacing: -0.2px;">
                      LabManager nasce in laboratorio.
                    </p>
                    <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 14px; color: #8a8278; margin: 0; line-height: 1.7; font-weight: 300; max-width: 460px;">
                      L&rsquo;ho creato partendo dai problemi che incontravo ogni giorno: ricette sparse, costi stimati a occhio, etichette fatte a mano. Se hai domande o vuoi raccontarmi come lavori nel tuo laboratorio, rispondimi a questa email. Mi fa piacere.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Teaser "Prossimamente" -->
          <tr>
            <td style="padding: 36px 52px; background-color: #eae6de;" class="mobile-padding">
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #2d6a44; margin: 0 0 12px 0;">PROSSIMAMENTE</p>
              <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 17px; font-weight: 400; color: #3a3530; margin: 0; line-height: 1.5;">
                Nelle prossime email: nuove funzionalit&agrave; in arrivo, consigli pratici per il laboratorio e aggiornamenti riservati agli iscritti.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr><td style="height: 1px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>
          <tr>
            <td style="padding: 40px 52px; background-color: #f3efe8; text-align: center;" class="mobile-padding">
              <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 400; color: #1e1b18; margin: 0 0 4px 0;">LabManager</p>
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 10px; color: #a09880; margin: 0 0 32px 0; letter-spacing: 2px; text-transform: uppercase;">Il gestionale per pasticceri professionisti</p>
              <p style="margin: 0 0 8px 0;">
                <a href="https://pastrylabmanager.com" style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Sito Web</a>
                <span style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #c8c0b4; font-size: 11px; padding: 0 10px;">&middot;</span>
                <a href="https://pastrylabmanager.com/download" style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Download</a>
                <span style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #c8c0b4; font-size: 11px; padding: 0 10px;">&middot;</span>
                <a href="mailto:labmanager.info@gmail.com" style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Contatti</a>
              </p>
              <p style="margin: 0 0 24px 0;">
                <a href="https://www.iubenda.com/privacy-policy/79608415" style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; color: #6a6258; font-size: 11px; text-decoration: none; letter-spacing: 0.5px;">Privacy Policy</a>
              </p>
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 10px; color: #a09880; margin: 0 0 3px 0;">&copy; 2026 LabManager. Tutti i diritti riservati.</p>
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 10px; color: #b8b0a4; margin: 8px 0 0 0;">Hai ricevuto questa email perch&eacute; ti sei iscritto alla newsletter di LabManager.</p>
              <p style="font-family: 'DM Sans', -apple-system, Arial, sans-serif; font-size: 10px; color: #b8b0a4; margin: 6px 0 0 0;"><a href="${unsubscribeUrl}" style="color: #a09880; text-decoration: underline;">Cancella iscrizione</a></p>
            </td>
          </tr>

          <!-- Bottom rule -->
          <tr><td style="height: 3px; background-color: #1e1b18; font-size: 0; line-height: 0;">&nbsp;</td></tr>

        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}
