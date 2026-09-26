import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const expected = process.env.WEBSITE_DELIVERY_TOKEN;
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expected || provided !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await request.json().catch(() => null);
  if (!payload?.email || !payload?.downloadUrl) return NextResponse.json({ error: "email and downloadUrl are required" }, { status: 400 });

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !from) return NextResponse.json({ error: "Resend is not configured" }, { status: 503 });

  const escapeHtml = (value: unknown) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  const safeDownloadUrl = escapeHtml(payload.downloadUrl);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [payload.email],
      subject: "Seu Shorts de palpites está pronto",
      html: `<p>Seu Shorts personalizado do Foot Analysis está pronto.</p><p><a href="${safeDownloadUrl}">Baixar meu vídeo</a></p>`
    })
  });

  if (!resendResponse.ok) return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  return NextResponse.json({ delivered: true });
}
