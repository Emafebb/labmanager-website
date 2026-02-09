import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "LabManager <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `[LabManager Website] Messaggio da ${name}`,
      html: `
        <h2>Nuovo messaggio dal sito LabManager</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
