"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { destinations } from "@/data/tours";
import Logo from "@/components/Logo";

const PHONE = "+256 000 000 000";

const links = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "All Tours" },
  { href: "/offers", label: "Offers" },
  { href: "/custom-tours", label: "Custom Tours" },
  { href: "/travel-info", label: "Travel Info" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden bg-stone-900 text-xs text-stone-200 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Questions? Call us or your travel advisor: {PHONE}</span>
          <Link href="/contact" className="uppercase tracking-widest hover:text-amber-300">
            Send an inquiry
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={close} aria-label="Lubstar Safaris home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] lg:flex">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <div className="group relative">
            <Link href="/tours" className="py-6 hover:text-amber-700">Destinations</Link>
            <ul className="invisible absolute left-0 top-full w-56 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {destinations.map((d) => (
                <li key={d.name}>
                  <Link
                    href={`/tours?destination=${encodeURIComponent(d.name)}`}
                    className="block px-5 py-2 normal-case tracking-normal hover:bg-stone-100"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/tours" className="hover:text-amber-700">Tours</Link>
          <Link href="/offers" className="hover:text-amber-700">Offers</Link>
          <Link href="/custom-tours" className="hover:text-amber-700">Custom</Link>
          <Link href="/about" className="hover:text-amber-700">About</Link>
          <Link href="/contact" className="hover:text-amber-700">Contact</Link>
          <Link href="/booking" className="bg-amber-700 px-5 py-2.5 text-white hover:bg-amber-800">
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-current transition ${open ? "translate-y-[7px] rotate-45 bg-white" : ""}`} />
          <span className={`h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-current transition ${open ? "-translate-y-[7px] -rotate-45 bg-white" : ""}`} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-stone-900 py-20 text-white lg:hidden"
        >
          <ul className="space-y-5 text-center">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="font-serif text-3xl hover:text-amber-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center text-sm text-stone-300">
            <p className="mb-2 text-xs uppercase tracking-widest text-stone-500">Destinations</p>
            {destinations.map((d) => (
              <Link
                key={d.name}
                href={`/tours?destination=${encodeURIComponent(d.name)}`}
                onClick={close}
                className="block py-1 hover:text-amber-300"
              >
                {d.name}
              </Link>
            ))}
          </div>
          <Link
            href="/booking"
            onClick={close}
            className="bg-amber-700 px-8 py-3 text-xs uppercase tracking-[0.2em]"
          >
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
