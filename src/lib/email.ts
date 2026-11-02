// Notifies the owner by email via Resend when configured; otherwise logs to the server console.
export async function notifyOwner(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) {
    console.log(`[email not configured] ${subject}\n${text}`);
    return;
  }
  const from = process.env.MAIL_FROM ?? "Lubstar Safaris <onboarding@resend.dev>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text }),
    });
  } catch (err) {
    console.error("Failed to send notification email", err);
  }
}
