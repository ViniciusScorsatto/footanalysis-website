import { NextRequest, NextResponse } from "next/server";

import { sponsorInquirySchema } from "@/lib/sponsor-schema";

const resendEndpoint = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = sponsorInquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.SPONSOR_TO_EMAIL;
    const from = process.env.SPONSOR_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const { name, email, company, brand_or_product, budget_or_scope, message, locale } = parsed.data;

    const emailPayload = {
      from,
      to: [to],
      reply_to: email,
      subject: `[FootAnalysys] Sponsor inquiry (${locale.toUpperCase()}) - ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2>New FootAnalysys sponsor inquiry</h2>
          <p><strong>Locale:</strong> ${escapeHtml(locale)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Brand or product:</strong> ${escapeHtml(brand_or_product)}</p>
          <p><strong>Budget or scope:</strong> ${escapeHtml(budget_or_scope || "Not provided")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `
    };

    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ error: details || "Email provider rejected the request." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
