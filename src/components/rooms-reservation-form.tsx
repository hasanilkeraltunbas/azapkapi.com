"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Field, Label, SelectField, SubmitButton } from "@/components/form-fields";
import { rooms } from "@/lib/site";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function RoomsReservationForm() {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [pending, setPending] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [room, setRoom] = useState<(typeof rooms)[number]["slug"]>(rooms[0].slug);

  const minOut = useMemo(
    () => (checkIn ? addDays(checkIn, 1) : todayIso()),
    [checkIn],
  );

  const selected = rooms.find((r) => r.slug === room) ?? rooms[0];

  function onStay(e: FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    setStep(2);
  }

  async function onDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="rounded-2xl border border-olive/20 bg-limestone px-6 py-10 text-center">
        <p className="text-sm text-olive">Aldık</p>
        <p className="mt-3 font-display text-3xl font-medium tracking-tight text-charcoal">
          {selected.name}
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal/70">
          {checkIn} — {checkOut} · {guests} kişi. Yer varsa aynı gün yazarız.
        </p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form onSubmit={onStay} className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="room-in">Giriş</Label>
            <Field
              id="room-in"
              type="date"
              required
              min={todayIso()}
              value={checkIn}
              onChange={(e) => {
                const next = e.target.value;
                setCheckIn(next);
                if (checkOut && checkOut <= next) setCheckOut(addDays(next, 1));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="room-out">Çıkış</Label>
            <Field
              id="room-out"
              type="date"
              required
              min={minOut}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="room-guests">Misafir</Label>
            <SelectField
              id="room-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {["1", "2"].map((n) => (
                <option key={n} value={n}>
                  {n} kişi
                </option>
              ))}
            </SelectField>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="room-type">Oda</Label>
            <SelectField
              id="room-type"
              value={room}
              onChange={(e) => setRoom(e.target.value as (typeof rooms)[number]["slug"])}
            >
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} · {r.price} ₺’den
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <SubmitButton>Devam</SubmitButton>
      </form>
    );
  }

  return (
    <form onSubmit={onDetails} className="space-y-8">
      <p className="text-sm text-charcoal/60">
        {selected.name} · {checkIn} — {checkOut}
        <button
          type="button"
          className="ml-3 text-sm text-olive"
          onClick={() => setStep(1)}
        >
          değiştir
        </button>
      </p>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="rooms-name">Ad soyad</Label>
          <Field id="rooms-name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="rooms-email">E-posta</Label>
          <Field id="rooms-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="rooms-phone">Telefon</Label>
          <Field id="rooms-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <SubmitButton pending={pending}>Gönder</SubmitButton>
    </form>
  );
}
