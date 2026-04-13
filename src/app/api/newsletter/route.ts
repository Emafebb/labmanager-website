import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";
import { buildWelcomeEmail, buildAdminSubscriberNotification } from "@/lib/emails";

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

    // 4. Notifica admin
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "LabManager <noreply@pastrylabmanager.com>",
        to: process.env.CONTACT_EMAIL || "labmanager.info@gmail.com",
        subject: `[LabManager] Nuovo iscritto: ${rawName}`,
        html: buildAdminSubscriberNotification(rawName, safeEmail, "newsletter_popup"),
      });
    } catch (notifyErr) {
      console.error("Errore notifica admin newsletter:", notifyErr);
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
