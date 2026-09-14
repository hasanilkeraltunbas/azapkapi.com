import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { RoomsReservationForm } from "@/components/rooms-reservation-form";
import { images, rooms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Azapkapı Rooms — avlunun üstünde birkaç sakin oda.",
};

const sharedAmenities = [
  "Sabah kahvaltısı Garden’da, kuşların yanında",
  "Yıkanmış keten, ev gibi yatak",
  "Pencereyi açınca avlu sesi",
  "Basit, güzel bakım ürünleri",
  "Geç çıkış, yer varsa",
  "Haliç’e yürüyerek inersin",
];

export default function RoomsPage() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Image
          src={images.roomsHero}
          alt="Azapkapı odaları"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:px-8">
          <p className="text-sm text-clay">Avlunun üstü</p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight text-cream md:text-6xl">
            Rooms
          </h1>
          <p className="mt-4 max-w-md text-base leading-8 text-cream/90">
            Üç oda. Hepsi küçük bir ev gibi. Aşağıda çim ve kuşlar, dışarıda
            Haliç.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-20 px-5 py-20 md:px-8 md:py-28">
        {rooms.map((room, i) => (
          <FadeIn key={room.slug}>
            <article className="grid items-center gap-10 md:grid-cols-2">
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-olive">
                  {room.size} · {room.guests}
                </p>
                <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-charcoal">
                  {room.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-charcoal/75">{room.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-charcoal/65">
                  {room.amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-charcoal/55">{room.price} ₺’den / gece</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </section>

      <section className="bg-limestone">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <FadeIn>
            <p className="text-sm text-olive">Odada olanlar</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
              Fazlası yok, eksiği de
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sharedAmenities.map((item) => (
                <li
                  key={item}
                  className="border-t border-olive/15 pt-4 text-sm leading-7 text-charcoal/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section id="rezervasyon" className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
        <FadeIn>
          <p className="text-sm text-olive">Kalmak</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
            Oda yaz, tarih söyle
          </h2>
          <p className="mt-4 mb-12 max-w-lg text-base leading-8 text-charcoal/75">
            Üç oda olduğu için çabuk doluyor. Giriş–çıkışı yaz, hangisini
            istediğini söyle, yer varsa haber verelim.
          </p>
          <RoomsReservationForm />
        </FadeIn>
      </section>
    </>
  );
}
