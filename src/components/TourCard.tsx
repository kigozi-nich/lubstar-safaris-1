import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block overflow-hidden bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-white/90 px-3 py-1 text-xs uppercase tracking-widest">
          {tour.type}
        </span>
        {tour.offer && (
          <span className="absolute right-3 top-3 bg-amber-700 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            Save {tour.offer.percent}%
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-stone-900">{tour.name}</h3>
        <p className="mt-1 text-sm text-stone-500">
          {tour.days} days / {tour.days - 1} nights &middot; {tour.destination}
        </p>
      </div>
    </Link>
  );
}
