import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-olive/15 bg-limestone">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-medium tracking-tight text-charcoal">
            {site.name}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal/75">
            Azapkapı’da, Haliç’e yaslanmış yeşil bir avlu. Kuşlar gezer, çim
            yumuşak, kapı açık. Oda da var, teras da yolda.
          </p>
        </div>

        <div>
          <p className="text-sm text-olive">Nereye</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-charcoal/75 transition-colors hover:text-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-olive">Ulaş</p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-charcoal/75">
            <li>{site.address}</li>
            <li>{site.hours}</li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-charcoal">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-charcoal">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-olive/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-charcoal/50 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Azapkapı</span>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-charcoal"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
