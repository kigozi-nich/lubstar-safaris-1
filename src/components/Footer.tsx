import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import Logo from "@/components/Logo";

const socials = [
  { name: "Facebook", href: "https://facebook.com/lubstarsafaris" },
  { name: "Instagram", href: "https://instagram.com/lubstarsafaris" },
  { name: "X", href: "https://x.com/lubstarsafaris" },
  { name: "YouTube", href: "https://youtube.com/@lubstarsafaris" },
  { name: "TikTok", href: "https://tiktok.com/@lubstarsafaris" },
  { name: "WhatsApp", href: "https://wa.me/256000000000" },
];

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/tours", label: "All tours" },
      { href: "/offers", label: "Offers" },
      { href: "/custom-tours", label: "Custom tours" },
      { href: "/booking", label: "Book online" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/travel-info", label: "Visas & travel info" },
      { href: "/faq", label: "FAQs" },
      { href: "/reviews", label: "Reviews" },
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 text-sm md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed">
            Travel with us to your preferred destination where dreams turn into reality.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white">{c.title}</h3>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-amber-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white">Join our mailing list</h3>
          <p className="mb-4 mt-4">For the latest news and promotions.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-stone-800 px-6 py-6 text-center text-xs text-stone-500">
        &copy; 2026 Lubstar Safaris. All rights reserved. Photos via Wikimedia Commons
        (Giles Laurent, Vanmulondo, Rod Waddington, Charles J. Sharp, Diego Delso; CC BY-SA).
      </div>
    </footer>
  );
}
