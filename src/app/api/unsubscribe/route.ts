import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { getResend } from "@/lib/resend-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse(buildPage("Errore", "Link di disiscrizione non valido."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  let email: string;
  try {
    email = Buffer.from(token, "base64url").toString("utf-8");
    if (!email || !email.includes("@")) throw new Error("invalid");
  } catch {
    return new NextResponse(buildPage("Errore", "Link di disiscrizione non valido."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // 1. Rimuovi da Supabase
  await supabaseAdmin
    .from("newsletter_subscribers")
    .delete()
    .eq("email", email.toLowerCase());

  // 2. Segna come unsubscribed su Resend Audience
  try {
    const resend = getResend();
    const audienceId = process.env.RESEND_AUDIENCE_ID!;
    const { data: contacts } = await resend.contacts.list({ audienceId });
    const contact = contacts?.data?.find((c) => c.email === email.toLowerCase());
    if (contact) {
      await resend.contacts.update({
        audienceId,
        id: contact.id,
        unsubscribed: true,
      });
    }
  } catch {
    // Non bloccante: l'utente è già rimosso da Supabase
  }

  return new NextResponse(
    buildPage(
      "Disiscrizione completata",
      "Sei stato rimosso dalla newsletter di LabManager. Non riceverai più email da noi."
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function buildPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — LabManager</title>
  <style>
    @font-face { font-family: Manrope; src: url('/brandkit/fonts/manrope-400.ttf') format('truetype'); font-weight: 400; font-display: swap; }
    @font-face { font-family: Fraunces; src: url('/brandkit/fonts/fraunces-400.ttf') format('truetype'); font-weight: 400; font-display: swap; }
    * { box-sizing: border-box; }
    body { font: 400 16px/1.6 Manrope, system-ui, sans-serif; color: #223d32; background: #f5f1e8; display: flex; align-items: center; justify-content: center; min-height: 100svh; margin: 0; padding: 24px; }
    .card { background: #ffffff; border-radius: 12px; padding: 40px 28px; width: min(100%, 480px); text-align: center; }
    h1 { font: 400 32px/1.08 Fraunces, Georgia, serif; letter-spacing: -.035em; margin: 0 0 24px; }
    p { margin: 0 0 24px; }
    a { display: inline-flex; align-items: center; min-height: 44px; color: inherit; text-underline-offset: 4px; }
    a:hover { text-decoration-thickness: 2px; }
    a:focus-visible { outline: 2px solid #223d32; outline-offset: 5px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://labmanagergestionale.com">← Torna al sito</a>
  </div>
</body>
</html>`;
}
