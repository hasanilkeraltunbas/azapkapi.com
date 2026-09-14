import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "E-posta veya kod eksik" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Azapkapı <info@azapkapi.com>",
      to: email,
      subject: "Azapkapı Rezervasyon Doğrulama Kodunuz",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 28px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 16px;">
          <h2 style="color: #2b332b; margin: 0 0 12px; font-size: 22px;">Azapkapı Garden</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.5; margin: 0 0 20px;">
            Bahçe rezervasyonunuzu tamamlamak için gereken 6 haneli onay kodunuz:
          </p>
          <div style="background: #e9e6df; padding: 18px; text-align: center; border-radius: 12px; margin-bottom: 20px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1c221c;">${code}</span>
          </div>
          <p style="color: #888; font-size: 13px; margin: 0;">Bu talebi siz yapmadıysanız bu e-postayı dikkate almayınız.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}