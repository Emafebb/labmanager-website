import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
    const { name, email, message, privacyAccepted } = await req.json();

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore invio email:", error);
    return NextResponse.json(
      { error: "Errore nell'invio del messaggio" },
      { status: 500 }
    );
  }
}
