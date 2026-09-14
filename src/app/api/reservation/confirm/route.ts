import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action"); // 'approve' veya 'cancel'

  if (!token || !action || !["approve", "cancel"].includes(action)) {
    return new NextResponse("Geçersiz istek.", { status: 400 });
  }

  const targetStatus = action === "approve" ? "approved" : "cancelled";

  // Veritabanını güncelle
  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .update({ status: targetStatus })
    .eq("action_token", token)
    .select()
    .single();

  if (error || !booking) {
    return new NextResponse("Rezervasyon bulunamadı veya işlem zaten yapılmış.", { status: 404 });
  }

  // Eğer onaylandıysa misafire 'Onaylandı' teyit maili gönder
  if (action === "approve") {
    await resend.emails.send({
      from: "Azapkapı <info@azapkapi.com>",
      to: booking.customer_email,
      subject: "🌿 Rezervasyonunuz Onaylandı! | Azapkapı",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #faf9f6; border: 1px solid #e2ded5; border-radius: 12px;">
          <h2 style="color: #2b332b;">Rezervasyonunuz Onaylandı</h2>
          <p style="color: #555;">Merhaba ${booking.customer_name}, rezervasyon talebiniz işletmemiz tarafından onaylanmıştır. Sizi ağırlamaktan mutluluk duyacağız.</p>
          <div style="background: #ffffff; border: 1px solid #e2ded5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Tarih:</strong> ${booking.date}</p>
            <p style="margin: 4px 0;"><strong>Saat:</strong> ${booking.time_slot}</p>
          </div>
          <p style="color: #777; font-size: 13px;">Görüşmek üzere!</p>
        </div>
      `,
    });
  }

  const title = action === "approve" ? "Rezervasyon Onaylandı" : "Rezervasyon İptal Edildi";
  const desc =
    action === "approve"
      ? `${booking.customer_name} adlı misafirin ${booking.date} - ${booking.time_slot} randevusu onaylandı ve müşteriye teyit maili gönderildi.`
      : `${booking.date} - ${booking.time_slot} randevusu iptal edildi. Bu saat takvimde tekrar rezerve edilebilir.`;

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #faf9f6; color: #2b332b; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: white; padding: 32px; border-radius: 12px; border: 1px solid #e2ded5; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 440px; text-align: center; }
          h2 { color: ${action === "approve" ? "#2b332b" : "#b91c1c"}; margin-bottom: 12px; }
          p { color: #666; line-height: 1.5; font-size: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>${title}</h2>
          <p>${desc}</p>
        </div>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}