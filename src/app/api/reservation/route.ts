import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, time, guests, note } = await req.json();

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Gerekli bilgiler eksik" }, { status: 400 });
    }

    // 1. Mekan Sahibine / İşletmeye Gidecek Bildirim
    const adminNotification = resend.emails.send({
      from: "Azapkapı Rezervasyon <info@azapkapi.com>",
      to: ["info@azapkapi.com", "aqileus@gmail.com"], // Hem Zoho hem Gmail kutuna aynı anda düşer
      subject: `🌿 Yeni Rezervasyon: ${name} (${date} - ${time})`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 12px;">
          <h2 style="color: #2b332b; margin: 0 0 16px; border-bottom: 2px solid #e2ded5; padding-bottom: 8px;">Yeni Bahçe Rezervasyonu</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">Misafir:</td>
              <td style="padding: 8px 0; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">Tarih & Saat:</td>
              <td style="padding: 8px 0; color: #111;">${date} · ${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">Kişi Sayısı:</td>
              <td style="padding: 8px 0; color: #111;">${guests} Kişi</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px 0; color: #111;"><a href="tel:${phone}" style="color: #2b332b;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold;">E-posta:</td>
              <td style="padding: 8px 0; color: #111;">${email}</td>
            </tr>
            ${
              note
                ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Özel Not:</td>
              <td style="padding: 8px 0; color: #111; font-style: italic;">${note}</td>
            </tr>
            `
                : ""
            }
          </table>

          <div style="background: #e9e6df; padding: 12px; border-radius: 8px; font-size: 13px; color: #444; text-align: center;">
            Bu rezervasyon e-posta doğrulama kodunu başarıyla girmiş bir misafir tarafından onaylanmıştır.
          </div>
        </div>
      `,
    });

    // 2. Misafire Gidecek Onay Maili
    const guestConfirmation = resend.emails.send({
      from: "Azapkapı <info@azapkapi.com>",
      to: email,
      subject: "Rezervasyonunuz Alındı | Azapkapı Garden",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 12px;">
          <h2 style="color: #2b332b; margin: 0 0 12px;">Rezervasyonunuz Alındı</h2>
          <p style="color: #555; font-size: 15px; margin-bottom: 20px;">
            Merhaba ${name}, bahçe rezervasyonunuz başarıyla bize ulaştı. Detaylar aşağıda yer almaktadır:
          </p>
          <div style="background: #ffffff; border: 1px solid #e2ded5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 4px 0; color: #333;"><strong>Tarih:</strong> ${date}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Saat:</strong> ${time}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Kişi Sayısı:</strong> ${guests} Kişi</p>
          </div>
          <p style="color: #777; font-size: 13px; margin: 0;">
            Sorularınız veya değişiklik talepleriniz için bu e-postayı doğrudan yanıtlayabilirsiniz.
          </p>
        </div>
      `,
    });

    // İki e-postayı da eşzamanlı gönder
    const [adminRes, guestRes] = await Promise.all([adminNotification, guestConfirmation]);

    if (adminRes.error || guestRes.error) {
      console.error("Resend Gönderim Hatası:", adminRes.error || guestRes.error);
      return NextResponse.json({ error: "E-posta gönderiminde bir sorun oluştu." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sunucu hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}