import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azapkapi.com"),
  title: {
    default: "Azapkapı · Haliç, İstanbul",
    template: "%s · Azapkapı",
  },
  description:
    "Haliç kıyısında samimi bir vaha: kuşlu avlu, birkaç oda ve yakında teras.",
  keywords: [
    "Azapkapı",
    "Azapkapı Garden",
    "Azapkapı Roof",
    "Azapkapı Rooms",
    "Haliç etkinlik",
    "İstanbul butik mekan",
    "avlu kafe",
    "teras İstanbul",
  ],
  authors: [{ name: "Azapkapı" }],
  creator: "Azapkapı",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://azapkapi.com",
    title: "Azapkapı · Haliç, İstanbul",
    description:
      "Haliç kıyısında samimi bir vaha: kuşlu avlu, birkaç oda ve yakında teras.",
    siteName: "Azapkapı",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azapkapı · Haliç, İstanbul",
    description:
      "Haliç kıyısında samimi bir vaha: kuşlu avlu, birkaç oda ve yakında teras.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${figtree.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}