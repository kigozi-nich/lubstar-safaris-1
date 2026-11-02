import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTour, tours } from "@/data/tours";
import { formatDate } from "@/lib/form";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: tour.name,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: { images: [{ url: tour.image, alt: tour.imageAlt }] },
  };
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <article>
      <div className="relative isolate h-[50vh] min-h-[320px] text-white">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 to-transparent" />
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10">
          <p className="text-xs uppercase tracking-[0.3em]">
            {tour.destination} &middot; {tour.type}
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{tour.name}</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-stone-700">{tour.summary}</p>

          <h2 className="mt-10 font-serif text-2xl">Highlights</h2>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-stone-700">
            {tour.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-serif text-2xl">Itinerary</h2>
          <ol className="mt-4 space-y-5">
            {tour.itinerary.map((d, i) => (
              <li key={d.title} className="border-l-2 border-amber-700 pl-5">
                <p className="text-xs uppercase tracking-widest text-amber-800">Day {i + 1}</p>
                <h3 className="font-semibold">{d.title}</h3>
                <p className="text-stone-600">{d.text}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-10 font-serif text-2xl">Departure dates</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {tour.departures.map((d) => (
              <li key={d} className="flex items-center justify-between border border-stone-200 px-4 py-3">
                <span>{formatDate(d)}</span>
                <Link
                  href={`/booking?tour=${tour.slug}&date=${d}`}
                  className="text-xs uppercase tracking-widest text-amber-800 underline"
                >
                  Book
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit bg-stone-100 p-6 lg:sticky lg:top-32">
          <p className="text-sm text-stone-500">
            {tour.days} days / {tour.days - 1} nights
          </p>
          {tour.offer && (
            <p className="mt-2 inline-block bg-amber-700 px-2 py-1 text-xs uppercase tracking-widest text-white">
              {tour.offer.label}: save {tour.offer.percent}%
            </p>
          )}
          <Link
            href={`/booking?tour=${tour.slug}`}
            className="mt-6 block bg-amber-700 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-amber-800"
          >
            Book now
          </Link>
          <Link
            href="/contact"
            className="mt-3 block border border-stone-900 py-3 text-center text-xs uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white"
          >
            Send an inquiry
          </Link>
        </aside>
      </div>
    </article>
  );
}
