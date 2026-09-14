"use client";

import { useState, type FormEvent } from "react";
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState(gardenTimes[4]);
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // Doğrulama kodu kontrolleri
  const [sentCode, setSentCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  function onStay(e: FormEvent) {
    e.preventDefault();
    if (!date) return;
    setStep(2);
  }

  async function onSendOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setErrorMsg("");

    // 6 haneli rastgele kod
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
      // Mekan sahibine rezervasyon detaylarını mail at
      await fetch("/api/reservation", {
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

      setStep("done");
    } catch {
      setErrorMsg("Rezervasyon kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setPending(false);
    }
  }

  if (step === "done") {
    return (
      <div className="rounded-2xl border border-olive/20 bg-limestone px-6 py-10 text-center">
        <p className="text-sm text-olive">Rezervasyon Onaylandı</p>
        <p className="mt-3 font-display text-3xl font-medium tracking-tight text-charcoal">
          Çimde yerin hazır!
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal/70">
          {name} · {date} · {time} · {guests} kişi
        </p>
        <p className="mt-1 text-xs text-charcoal/50">
          Onay bilgileri {email} adresine iletildi.
        </p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form onSubmit={onStay} className="space-y-8">
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
            <Label htmlFor="garden-time">Saat</Label>
            <SelectField
              id="garden-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {gardenTimes.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
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

      <SubmitButton>Rezervasyonu Onayla</SubmitButton>
    </form>
  );
}