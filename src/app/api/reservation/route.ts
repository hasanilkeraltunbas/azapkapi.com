import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, time, guests, note } = await req.json();

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Gerekli bilgiler eksik" }, { status: 400 });
    }

    // 1. Supabase'e 'pending' olarak kaydet (veya çakışma varsa yakala)
    const { data: booking, error: dbError } = await supabaseAdmin
      .from("bookings")
      .insert([
        {
          customer_name: name,
          customer_email: email,
          customer_phone: phone || null,
          date: date,
          time_slot: time,
          status: "pending"
        }
      ])
      .select()
      .single();

    if (dbError) {
      // Çift randevu / index çakışması hatası
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "Seçtiğiniz tarih ve saat için aktif bir rezervasyon zaten mevcut." },
          { status: 409 }
        );
      }
      console.error("Supabase Kayıt Hatası:", dbError);
      return NextResponse.json({ error: "Rezervasyon kaydedilemedi." }, { status: 500 });
    }

    // Yönetici onay/iptal linkleri (Canlıda azapkapi.com'a, yerelde localhost'a bakar)
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://azapkapi.com"
        : "http://localhost:3000";

    const approveUrl = `${baseUrl}/api/reservation/confirm?token=${booking.action_token}&action=approve`;
    const cancelUrl = `${baseUrl}/api/reservation/confirm?token=${booking.action_token}&action=cancel`;

    // 2. Mekan Sahibine / İşletmeye Gidecek Onay/İptal Butonlu Bildirim
    const adminNotification = resend.emails.send({
      from: "Azapkapı Rezervasyon <info@azapkapi.com>",
      to: ["info@azapkapi.com", "aqileus@gmail.com"],
      subject: `🌿 Yeni Rezervasyon Talebi: ${name} (${date} - ${time})`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 12px;">
          <h2 style="color: #2b332b; margin: 0 0 16px; border-bottom: 2px solid #e2ded5; padding-bottom: 8px;">Yeni Rezervasyon Talebi</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
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
              <td style="padding: 8px 0; color: #111;">${guests || 1} Kişi</td>
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

          <!-- Onay / İptal Butonları -->
          <div style="margin: 24px 0 12px; text-align: center;">
            <a href="${approveUrl}" style="background: #2b332b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 12px;">
              ✓ Rezervasyonu Onayla
            </a>
            <a href="${cancelUrl}" style="background: #b91c1c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ✕ Reddet / İptal Et
            </a>
          </div>

          <p style="font-size: 12px; color: #777; text-align: center; margin-top: 16px;">
            Onayladığınızda saat takvimde kilitli kalmaya devam eder. Reddederseniz saat tekrar boşa çıkar.
          </p>
        </div>
      `,
    });

    // 3. Misafire Gidecek "Talep Alındı" Maili
    const guestConfirmation = resend.emails.send({
      from: "Azapkapı <info@azapkapi.com>",
      to: email,
      subject: "Rezervasyon Talebiniz Alındı | Azapkapı",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 12px;">
          <h2 style="color: #2b332b; margin: 0 0 12px;">Rezervasyon Talebiniz Alındı</h2>
          <p style="color: #555; font-size: 15px; margin-bottom: 20px;">
            Merhaba ${name}, rezervasyon talebiniz bize ulaştı. Ekibimiz onayladıktan sonra size tekrar bilgilendirme sağlanacaktır.
          </p>
          <div style="background: #ffffff; border: 1px solid #e2ded5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 4px 0; color: #333;"><strong>Tarih:</strong> ${date}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Saat:</strong> ${time}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Kişi Sayısı:</strong> ${guests || 1} Kişi</p>
            <p style="margin: 4px 0; color: #d97706; font-weight: bold;">Durum: Onay Bekliyor</p>
          </div>
          <p style="color: #777; font-size: 13px; margin: 0;">
            Değişiklik veya iptal talepleriniz için bu e-postayı doğrudan yanıtlayabilirsiniz.
          </p>
        </div>
      `,
    });

    await Promise.all([adminNotification, guestConfirmation]);

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (err) {
    console.error("Sunucu hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}