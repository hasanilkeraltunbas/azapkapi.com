import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { GardenReservationForm } from "@/components/garden-reservation-form";
import { gardenMenu, gardenResidents, images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Garden",
  description:
    "Azapkapı Garden — suni çimli, kuşlu avlu. Ördek, bıldırcın, kaz, papağan, güvercin ve masa.",
};

export default function GardenPage() {
  return (
    <>
      <section className="relative flex min-h-[75svh] items-end overflow-hidden">
        <Image
          src={images.gardenHero}
          alt="Azapkapı Garden, yeşil avlu"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive/90 via-charcoal/35 to-olive/20" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:px-8">
          <p className="text-sm text-clay">Haliç vahası · kuş cenneti</p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight text-cream md:text-6xl">
            Garden
          </h1>
          <p className="mt-4 max-w-lg text-base leading-8 text-cream/90">
            Tabanı suni çim, her yer yeşil. Ördekler, bıldırcınlar, kazlar,
            papağanlar ve güvercinler avluda serbest. Sen kahveni iç, onlar
            işine baksın.
          </p>
        </div>
      </section>

      <section className="bg-olive text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-24">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={images.gardenLawn}
                alt="Avludaki yeşil çim"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm text-clay">Avlu</p>
            <h2 className="mt-3 font-display text-4xl leading-tight font-medium tracking-tight">
              Çimlerin üstünde, kuşların arasında.
            </h2>
            <p className="mt-6 text-base leading-8 text-cream/80">
              Garden bir restoran vitrini değil; yaşayan bir avlu. Suni çim
              yumuşak, ağaçlar sık, gölge bol. Masayı çime kuruyoruz. Yanından
              bir kaz geçebilir, papağan bağırabilir, güvercin omzuna konmaz
              ama yakına gelir. Burası Haliç’in içindeki küçük, bohem bir kuş
              bahçesi.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <FadeIn>
          <p className="text-sm text-olive">Komşularımız</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
            Avlunun sakinleri
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-charcoal/75">
            Burası onların evi. Biz misafiriz. Lütfen koşturma, kovalama; onlar
            zaten meraklı.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {gardenResidents.map((bird, i) => (
            <FadeIn key={bird.name} delay={i * 0.05}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={bird.image}
                    alt={bird.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg font-medium text-charcoal">
                    {bird.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-charcoal/65">{bird.note}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-limestone">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <FadeIn>
            <p className="text-sm text-olive">Sofra</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
              Çimde yemek, gölgede oturmak.
            </h2>
            <p className="mt-5 text-base leading-8 text-charcoal/75">
              Menü kısa, mutfak samimi. Paylaş, uzat, bir tur daha söyle. Kuşlar
              tabağına konmaz; yine de ekmeği masanın kenarında bırakma.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src={images.gardenTable}
                alt="Garden’da açık hava masası"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <FadeIn>
          <p className="text-sm text-olive">Menü</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
            Bugünlerde masada olanlar
          </h2>
          <p className="mt-3 text-sm text-charcoal/60">Fiyatlar ₺ · değişebilir</p>
        </FadeIn>
        <div className="mt-14 grid gap-14 md:grid-cols-3">
          {gardenMenu.map((group) => (
            <FadeIn key={group.category}>
              <h3 className="text-sm text-olive">{group.category}</h3>
              <ul className="mt-6 space-y-6">
                {group.items.map((item) => (
                  <li key={item.name} className="border-b border-olive/15 pb-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-xl font-medium text-charcoal">
                        {item.name}
                      </span>
                      <span className="text-sm text-charcoal/55">{item.price}</span>
                    </div>
                    <p className="mt-1 text-sm text-charcoal/55">{item.note}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="rezervasyon" className="w-full bg-olive/10">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
          <FadeIn>
            <p className="text-sm text-olive">Masa</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">
              Gel, yer ayıralım
            </h2>
            <p className="mt-4 mb-12 max-w-lg text-base leading-8 text-charcoal/75">
              Avlu dolunca çimde yer kalmıyor. Tarihi söyle, biz masayı — ve
              mümkünse gölgeyi — tutalım.
            </p>
            <GardenReservationForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
