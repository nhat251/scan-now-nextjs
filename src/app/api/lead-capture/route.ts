import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { Log } from "@/lib/log";

const resendApiKey = process.env.RESEND_API_KEY;
const toEmailAddress = process.env.TO_EMAIL_ADDRESS;
const senderEmailAddress = process.env.SENDER_EMAIL_ADDRESS;

const leadCaptureSchema = z.object({
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email(),
  location: z.string().trim().min(1).max(100),
  locale: z.enum(["vi", "en"]),
  source: z.enum(["hero-primary", "feature-payment", "final-primary"]),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: Request) {
  if (!resendApiKey || !toEmailAddress || !senderEmailAddress) {
    return NextResponse.json({ error: "Missing email configuration" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const payload = leadCaptureSchema.parse(body);
    const resend = new Resend(resendApiKey);

    const recipients = toEmailAddress
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!recipients.length) {
      Log.error({
        prefix: "lead-capture",
        message: "Lead capture email recipient configuration is empty after parsing TO_EMAIL_ADDRESS",
      });

      return NextResponse.json({ error: "Missing email configuration" }, { status: 500 });
    }

    const safePhone = escapeHtml(payload.phone);
    const safeEmail = escapeHtml(payload.email);
    const safeLocation = escapeHtml(payload.location);

    await resend.emails.send({
      from: senderEmailAddress,
      to: recipients,
      subject: "[Scan Now] New customer inquiry",
      replyTo: payload.email,
      html: `
        <div style="margin: 0; background-color: #f6f8fb; padding: 32px 16px; font-family: Arial, sans-serif; color: #191c1e;">
          <div style="margin: 0 auto; max-width: 560px; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);">
            <div style="background: linear-gradient(135deg, #ff5c00 0%, #ff5c00 25%, #ff7a00 55%, #0448ff 100%); padding: 24px 28px; color: #ffffff;">
              <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9;">Scan Now</p>
              <h2 style="margin: 0; font-size: 24px; line-height: 1.3;">New customer inquiry</h2>
            </div>

            <div style="padding: 28px;">
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #475569;">
                Customer needs more information about your service. Please contact them.
              </p>

              <div style="display: grid; gap: 14px;">
                <div style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; background-color: #f8fafc;">
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">Phone</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f172a;">${safePhone}</p>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; background-color: #f8fafc;">
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">Email</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f172a;">${safeEmail}</p>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; background-color: #f8fafc;">
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">City</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f172a;">${safeLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `New customer inquiry\n\nCustomer needs more information about your service. Please contact them.\n\nPhone: ${payload.phone}\nEmail: ${payload.email}\nCity: ${payload.location}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payload", issues: error.flatten() },
        { status: 400 }
      );
    }

    Log.error({
      prefix: "lead-capture",
      message: "Unexpected error while sending lead capture email",
      data: error,
    });

    return NextResponse.json({ error: "Failed to send lead capture email" }, { status: 500 });
  }
}
