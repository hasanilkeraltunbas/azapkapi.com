import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { images, site } from "@/lib/site";

const brands = [
  {
    href: "/garden",
    kicker: "Kuşlu avlu",
    title: "Garden",
    text: "Suni çim, yeşil gölge, ördekler masanın yanından geçer. Kahve iç, kal.",
    image: images.gardenHero,
  },
  {
    href: "/rooms",
    kicker: "Birkaç oda",
    title: "Rooms",
    text: "Avlunun üstünde sakin odalar. Pencereyi açınca kuş sesi.",
    image: images.roomsHero,
  },
  {
    href: "/teras",
    kicker: "Yakında",
    title: "Teras",
    text: "Çatıda Haliç’e bakıp bir şeyler içeceğimiz yer. Henüz kuruluyor.",
    image: images.terasHero,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src={images.heroHome}
          alt="Haliç kıyısı, İstanbul"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-olive/35 to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <p className="text-sm text-clay">{site.location}</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] font-medium tracking-tight text-cream md:text-7xl lg:text-8xl">
            Azapkapı
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-cream/90 md:text-lg">
            Haliç’in kıyısında, biraz salaş, biraz yeşil bir vaha. Avluda kuşlar,
            içeride birkaç oda, çatıda yakında bir teras.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <FadeIn>
          <p className="text-sm text-olive">Üç yer, aynı kapı</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight font-medium tracking-tight text-charcoal md:text-5xl">
            Bahçeye otur, odada kal, teras için bekle.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-charcoal/75">
            Burası vitrin gibi duran bir yer değil. Beyoğlu’nun Haliç tarafında,
            çimlerin üstünde vakit geçirdiğin, kuşların arasına karıştığın bir
            avlu. Gel, otur, kal.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {brands.map((brand, i) => (
            <FadeIn key={brand.href} delay={i * 0.08}>
              <Link href={brand.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={brand.image}
                    alt={brand.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-sm text-clay">{brand.kicker}</p>
                    <h3 className="mt-1 font-display text-3xl font-medium text-cream">
                      {brand.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-charcoal/75">{brand.text}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
