import type { Metadata } from "next";
import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teras",
  description: "Azapkapı Teras — çok yakında. Haliç’e bakan çatı, haber listesi.",
};

export default function TerasPage() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={images.terasHero}
        alt="Azapkapı Teras, gün batımı"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-olive/40 to-charcoal/30" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-32 md:grid-cols-2 md:items-end md:px-8 md:pb-28">
        <div>
          <p className="text-sm text-clay">Coming soon · Çok yakında</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] font-medium tracking-tight text-cream md:text-7xl">
            Çatı henüz açık değil
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-cream/85">
            Teras, Haliç’e bakan sakin bir çatı olacak. Plastik sandalye, güzel
            ışık, uzun akşam. Hazır olunca ilk sana yazarız.
          </p>
        </div>
        <div className="max-w-md rounded-2xl border border-cream/20 bg-charcoal/45 p-8 backdrop-blur-sm">
          <p className="text-sm text-clay">Haber listesi</p>
          <p className="mt-3 mb-8 text-base leading-7 text-cream/80">
            Açılınca bir not düşeriz. Spam yok, söz.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
