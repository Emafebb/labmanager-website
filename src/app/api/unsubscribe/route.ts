import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #f5f5f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; border-radius: 12px; padding: 48px 40px; max-width: 420px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    h1 { font-size: 22px; color: #1e1b18; margin: 0 0 12px; }
    p { font-size: 14px; color: #6a6258; line-height: 1.6; margin: 0 0 24px; }
    a { display: inline-block; color: #4403af; font-size: 13px; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://pastrylabmanager.com">← Torna al sito</a>
  </div>
</body>
</html>`;
}
