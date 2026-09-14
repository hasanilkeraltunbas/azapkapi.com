export const site = {
  name: "Azapkapı",
  location: "Azapkapı, Beyoğlu · İstanbul",
  address: "Azapkapı Mahallesi, Haliç, Beyoğlu / İstanbul",
  phone: "+90 212 000 00 00",
  email: "merhaba@azapkapi.com",
  instagram: "https://instagram.com/azapkapi",
  hours: "Her gün 09:00 — 00:00",
};

export const navLinks = [
  { href: "/garden", label: "Garden" },
  { href: "/rooms", label: "Rooms" },
  { href: "/teras", label: "Teras" },
] as const;

export const images = {
  heroHome:
    "/heroview.jpg",
  gardenHero:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2400&q=80",
  gardenLawn:
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80",
  gardenTable:
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80",
  duck: "https://images.unsplash.com/photo-1555855758-8d6e2580c0e8?auto=format&fit=crop&w=1200&q=80",
  quail:
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80",
  goose:
    "https://images.unsplash.com/photo-1516469501380-7e624c46d810?auto=format&fit=crop&w=1200&q=80",
  parrot:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80",
  pigeon:
    "https://images.unsplash.com/photo-1452570053594-c2caa7c262db?auto=format&fit=crop&w=1200&q=80",
  roomsHero:
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=2400&q=80",
  roomSuite:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  roomGarden:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  roomHaliç:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
  terasHero:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2400&q=80",
};

export const gardenResidents = [
  {
    name: "Ördekler",
    note: "Çimin ıslak köşesinde, ağır ağır gezerler.",
    image: images.duck,
  },
  {
    name: "Bıldırcınlar",
    note: "Masaların altından geçer, pek aldırış etmezler.",
    image: images.quail,
  },
  {
    name: "Kazlar",
    note: "Avlunun bekçileri. Biraz kibirli, biraz sevimli.",
    image: images.goose,
  },
  {
    name: "Papağanlar",
    note: "Renkleri, kahve fincanından daha önce fark edilir.",
    image: images.parrot,
  },
  {
    name: "Güvercinler",
    note: "Haliç’ten iner, çimde toplanır, yine uçar.",
    image: images.pigeon,
  },
];

export const gardenMenu = [
  {
    category: "Sabah",
    items: [
      { name: "Avlu kahvaltısı", note: "peynir, recel, yumurta, taze ekmek", price: "890" },
      { name: "Simit & kaymak", note: "bal ve nane ile", price: "320" },
      { name: "Menemen", note: "köy yumurtası, biber, lor", price: "410" },
    ],
  },
  {
    category: "Sofra",
    items: [
      { name: "Paylaşımlık mezeler", note: "üç tabak, ortaya", price: "680" },
      { name: "Izgara levrek", note: "limon, zeytinyağı, ot", price: "1.240" },
      { name: "Kuzu tandır", note: "yavaş pişmiş, ev gibi", price: "1.480" },
      { name: "Sebze güveci", note: "ne mevsimdeyse o", price: "640" },
    ],
  },
  {
    category: "Tatlı & içecek",
    items: [
      { name: "Künefe", note: "fıstık, dondurma", price: "420" },
      { name: "Limonlu kek", note: "hafif, ev usulü", price: "380" },
      { name: "Ev spritz", note: "nar, sodalı, buzlu", price: "390" },
    ],
  },
];

export const rooms = [
  {
    slug: "avlu",
    name: "Avlu Odası",
    size: "28 m²",
    guests: "2 kişi",
    price: "12.500",
    description:
      "Pencereden çim ve kuş sesi. Sabah Garden’da kahvaltı, gece açık pencere.",
    image: images.roomGarden,
    amenities: ["Avluya bakış", "Geniş yatak", "Eski ev banyosu"],
  },
  {
    slug: "halic",
    name: "Haliç Odası",
    size: "42 m²",
    guests: "2 kişi",
    price: "18.900",
    description:
      "Suya bakan daha geniş oda. Akşamları Haliç ışıkları içeri süzülür.",
    image: images.roomHaliç,
    amenities: ["Haliç manzarası", "Oturma köşesi", "Küvet"],
  },
  {
    slug: "teras-oda",
    name: "Teras Odası",
    size: "36 m²",
    guests: "2 kişi",
    price: "16.400",
    description:
      "Küçük balkon, keten örtüler, sokak sesi uzaktan. Ev gibi, otel gibi değil.",
    image: images.roomSuite,
    amenities: ["Balkon", "Çalışma masası", "Yağmur duşu"],
  },
] as const;

export const gardenTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];
