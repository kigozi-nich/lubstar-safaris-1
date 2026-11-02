import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lubstar Safaris offers guided wildlife and cultural tours in Uganda led by experienced local guides.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Lubstar Safaris" subtitle="Travel with us to your preferred destination where dreams turn into reality." image="/images/giraffe.jpg" />
      <div className="mx-auto max-w-3xl px-6 py-16 text-lg leading-relaxed text-stone-700">
        <p>
          Lubstar Safaris offers guided wildlife, cultural and adventure tours across
          Uganda, led by experienced local guides. We focus on responsible tourism and
          memorable, personal experiences.
        </p>
        <p className="mt-6">
          Whether you want to meet mountain gorillas, follow chimpanzees, search for
          tree-climbing lions or watch the Nile thunder through Murchison Falls, we
          will shape the trip around you.
        </p>
        <Link
          href="/custom-tours"
          className="mt-10 inline-block bg-amber-700 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-amber-800"
        >
          Plan your trip
        </Link>
      </div>
    </>
  );
}
