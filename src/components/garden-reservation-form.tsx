"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Field, Label, SelectField, SubmitButton } from "@/components/form-fields";
import { gardenTimes } from "@/lib/site";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function GardenReservationForm() {
  const [step, setStep] = useState<1 | 2 | 3 | "done">(1);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Rezervasyon verileri
  const [date, setDate] = useState(todayIso());
  const [time, setTime] = useState(gardenTimes[4]);
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // Dolu saatler listesi
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Doğrulama kodu kontrolleri
  const [sentCode, setSentCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  // Tarih değiştikçe o günün dolu saatlerini Supabase'den çek
  useEffect(() => {
    if (!date) return;
    
    async function fetchBookedSlots() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/reservation/booked-slots?date=${date}`);
        if (res.ok) {
          const data = await res.json();
          setBookedSlots(data.bookedSlots || []);
          
          // Eğer seçili olan saat dolu saatler arasına girdiyse, boş olan ilk saati seç
          if (data.bookedSlots?.includes(time)) {
            const firstAvailable = gardenTimes.find((slot) => !data.bookedSlots.includes(slot));
            if (firstAvailable) setTime(firstAvailable);
          }
        }
      } catch (err) {
        console.error("Dolu saatler alınamadı:", err);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchBookedSlots();
  }, [date]);

  function onStay(e: FormEvent) {
    e.preventDefault();
    if (!date || !time) return;
    
    // Güvenlik kontrolü: Seçilen saat doluysa ilerletme
    if (bookedSlots.includes(time)) {
      setErrorMsg("Seçtiğiniz saat az önce rezerve edildi. Lütfen başka bir saat seçin.");
      return;
    }

    setErrorMsg("");
    setStep(2);
  }

  async function onSendOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setErrorMsg("");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        throw new Error("E-posta gönderilemedi.");
      }

      setStep(3);
    } catch {
      setErrorMsg("Doğrulama kodu gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setPending(false);
    }
  }

  async function onVerifyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (inputCode.trim() !== sentCode.trim()) {
      setErrorMsg("Girdiğiniz kod hatalı. Lütfen e-postanızı kontrol edin.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          guests,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Rezervasyon kaydedilemedi.");
      }

      setStep("done");
    } catch (err: any) {
      setErrorMsg(err.message || "Rezervasyon kaydedilirken bir sorun oluştu.");
      setStep(1); // Çakışma durumunda kullanıcıyı tekrar tarih/saat seçimine döndür
    } finally {
      setPending(false);
    }
  }

  if (step === "done") {
    return (
      <div className="rounded-2xl border border-olive/20 bg-limestone px-6 py-10 text-center">
        <p className="text-sm text-olive">Rezervasyon Talebi Alındı (Onay Bekliyor)</p>
        <p className="mt-3 font-display text-3xl font-medium tracking-tight text-charcoal">
          Talebiniz bize ulaştı!
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal/70">
          {name} · {date} · {time} · {guests} kişi
        </p>
        <p className="mt-1 text-xs text-charcoal/50">
          İşletme onayından sonra {email} adresine kesin teyit maili gönderilecektir.
        </p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form onSubmit={onStay} className="space-y-8">
        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            {errorMsg}
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="garden-date">Tarih</Label>
            <Field
              id="garden-date"
              type="date"
              required
              min={todayIso()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="garden-time">
              Saat {loadingSlots && <span className="text-xs text-olive font-normal">(Yükleniyor...)</span>}
            </Label>
            <SelectField
              id="garden-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {gardenTimes.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <option key={slot} value={slot} disabled={isBooked}>
                    {slot} {isBooked ? "(Dolu / Rezerve)" : ""}
                  </option>
                );
              })}
            </SelectField>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="garden-guests">Misafir</Label>
            <SelectField
              id="garden-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {["1", "2", "3", "4", "5", "6"].map((n) => (
                <option key={n} value={n}>
                  {n} kişi
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <SubmitButton>İlerle</SubmitButton>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form onSubmit={onSendOtp} className="space-y-8">
        <p className="text-sm text-charcoal/60">
          {date} · {time} · {guests} kişi
          <button
            type="button"
            className="ml-3 text-sm text-olive underline"
            onClick={() => setStep(1)}
          >
            değiştir
          </button>
        </p>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            {errorMsg}
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="garden-name">Ad soyad</Label>
            <Field
              id="garden-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="garden-email">E-posta</Label>
            <Field
              id="garden-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="garden-phone">Telefon</Label>
            <Field
              id="garden-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="garden-note">Not (isteğe bağlı)</Label>
            <Field
              id="garden-note"
              name="note"
              placeholder="Alerji, kutlama, tercih…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <SubmitButton pending={pending}>Doğrulama Kodu Gönder</SubmitButton>
      </form>
    );
  }

  return (
    <form onSubmit={onVerifyCode} className="space-y-6">
      <div className="space-y-2">
        <p className="font-medium text-charcoal">E-postanızı kontrol edin</p>
        <p className="text-sm text-charcoal/60">
          <strong className="text-charcoal">{email}</strong> adresine 6 haneli bir kod gönderdik.
          <button
            type="button"
            className="ml-2 text-sm text-olive underline"
            onClick={() => setStep(2)}
          >
            e-postayı değiştir
          </button>
        </p>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="garden-otp">6 Haneli Doğrulama Kodu</Label>
        <Field
          id="garden-otp"
          name="otp"
          required
          maxLength={6}
          placeholder="123456"
          className="text-center tracking-widest text-lg"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
      </div>

      <SubmitButton pending={pending}>Rezervasyonu Onayla</SubmitButton>
    </form>
  );
}