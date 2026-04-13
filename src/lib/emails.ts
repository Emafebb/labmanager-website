export function buildAdminSubscriberNotification(
  subscriberName: string,
  subscriberEmail: string,
  source: "newsletter_popup" | "contact_form"
): string {
  const sourceLabel = source === "contact_form" ? "Form di contatto" : "Popup newsletter";
  return `
    <p>Nuovo iscritto alla newsletter di LabManager:</p>
    <ul>
      <li><strong>Nome:</strong> ${subscriberName}</li>
      <li><strong>Email:</strong> ${subscriberEmail}</li>
      <li><strong>Origine:</strong> ${sourceLabel}</li>
    </ul>
  `;
}

export function buildWelcomeEmail(name: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benvenuto in LabManager!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 15px; color: #1e1b18; line-height: 1.6;">
  <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">
    <p>Ciao ${name},</p>
    <p>grazie per esserti iscritto a LabManager.</p>
    <p>Ti scriverò quando ci sarà qualcosa di nuovo — aggiornamenti, nuove funzionalità.</p>
    <p>A presto,<br>Emanuele</p>
    <hr style="border: none; border-top: 1px solid #e8e3db; margin: 32px 0;">
    <p style="font-size: 12px; color: #a09880;">Hai ricevuto questa email perché ti sei iscritto a LabManager. <a href="${unsubscribeUrl}" style="color: #a09880;">Cancella iscrizione</a></p>
  </div>
</body>
</html>`;
}
