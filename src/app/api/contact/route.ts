import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";
import { buildWelcomeEmail, buildAdminSubscriberNotification } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { name, email, message, privacyAccepted, newsletterAccepted } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "È necessario accettare la Privacy Policy" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "LabManager <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `[LabManager Website] Messaggio da ${safeName}`,
      html: `
        <h2>Nuovo messaggio dal sito LabManager</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${safeMessage}</p>
      `,
      replyTo: email,
    });

    // Opt-in newsletter esplicito: aggiunge a Resend Audience e Supabase
    if (newsletterAccepted === true) {
      const rawName = name.trim();
      const safeEmailLower = email.trim().toLowerCase();
      try {
        await supabaseAdmin.from("newsletter_subscribers").upsert(
          { name: rawName, email: safeEmailLower },
          { onConflict: "email" }
        );
      } catch (dbErr) {
        console.error("Errore Supabase newsletter (contact):", dbErr);
      }
      try {
        await resend.contacts.create({
          audienceId: process.env.RESEND_AUDIENCE_ID!,
          email: safeEmailLower,
          firstName: rawName,
          unsubscribed: false,
        });
      } catch (audienceErr) {
        console.error("Errore Resend Audience (contact):", audienceErr);
      }
      try {
        const unsubscribeToken = Buffer.from(safeEmailLower).toString("base64url");
        const unsubscribeUrl = `https://pastrylabmanager.com/api/unsubscribe?token=${unsubscribeToken}`;
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "LabManager <noreply@pastrylabmanager.com>",
          to: safeEmailLower,
          subject: "Benvenuto in LabManager!",
          html: buildWelcomeEmail(escapeHtml(rawName), unsubscribeUrl),
        });
      } catch (welcomeErr) {
        console.error("Errore invio email benvenuto (contact):", welcomeErr);
      }
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "LabManager <noreply@pastrylabmanager.com>",
          to: process.env.CONTACT_EMAIL || "labmanager.info@gmail.com",
          subject: `[LabManager] Nuovo iscritto: ${rawName}`,
          html: buildAdminSubscriberNotification(rawName, safeEmailLower, "contact_form"),
        });
      } catch (notifyErr) {
        console.error("Errore notifica admin (contact):", notifyErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore invio email:", error);
    return NextResponse.json(
      { error: "Errore nell'invio del messaggio" },
      { status: 500 }
    );
  }
}
