"use client";

import { useState, type FormEvent } from "react";
import { Field, Label } from "@/components/form-fields";

export function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setDone(true);
  }

  if (done) {
    return (
      <p className="font-display text-2xl leading-snug font-medium text-cream">
        Tamam, yazdık. Teras açılınca haberin olur.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="flex flex-col gap-2">
        <Label htmlFor="wait-name" className="text-clay">
          Ad
        </Label>
        <Field
          id="wait-name"
          name="name"
          required
          className="border-cream/25 text-cream placeholder:text-cream/35 focus:border-clay"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="wait-email" className="text-clay">
          E-posta
        </Label>
        <Field
          id="wait-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border-cream/25 text-cream placeholder:text-cream/35 focus:border-clay"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full border border-clay/80 px-8 text-sm text-cream transition-colors hover:bg-clay hover:text-cream disabled:opacity-50"
      >
        {pending ? "Bir saniye…" : "Haber ver"}
      </button>
    </form>
  );
}
