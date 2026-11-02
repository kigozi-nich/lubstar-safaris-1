import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import TourCard from "@/components/TourCard";
import ReviewList from "@/components/ReviewList";
import { destinations, tours } from "@/data/tours";

const reasons = [
  { title: "Local expert guides", text: "Licensed Ugandan guides who know every trail and waterhole." },
  { title: "Tailor-made trips", text: "Adjust dates, lodges and activities to fit your dream." },
  { title: "Small groups", text: "Quality time with wildlife, away from the crowds." },
];

export default function Home() {
  const popular = tours.slice(0, 3);
  const maxSaving = Math.max(0, ...tours.map((t) => t.offer?.percent ?? 0));

  return (
    <>
      <Link
        href="/offers"
        className="block bg-amber-800 px-6 py-3 text-center text-sm text-white hover:bg-amber-900"
      >
        <strong>Save up to {maxSaving}% on selected tours</strong> &mdash; see our current offers &rarr;
      </Link>

      <section className="relative isolate text-white">
        <Image
          src="/images/gorilla.jpg"
          alt="Mountain gorilla in Bwindi, Uganda"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-36">
          <h1 className="font-serif text-4xl sm:text-6xl">
            Travel with us to your preferred destination
          </h1>
          <p className="mt-4 text-lg text-amber-100">Where dreams turn into reality</p>
          <div className="mx-auto mt-10 max-w-4xl text-left text-stone-900">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-stone-900">Find your dream vacation in...</h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            Tours that cover and look beyond the highlights, revealing hidden gems and
            cultural encounters across Uganda.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.name}
              href={`/tours?destination=${encodeURIComponent(d.name)}`}
              className="group relative isolate block aspect-[3/4] overflow-hidden text-white"
            >
              <Image
                src={d.image}
                alt={d.imageAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="-z-10 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-serif text-2xl">{d.name}</h3>
                <p className="text-sm text-stone-200">{d.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl text-stone-900">Our most popular tours</h2>
            <Link href="/tours" className="text-xs uppercase tracking-[0.2em] underline">
              View all
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center font-serif text-3xl text-stone-900">Why travel with us</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <h3 className="font-serif text-xl text-amber-800">{r.title}</h3>
              <p className="mt-2 text-stone-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl text-stone-900">What our travellers think</h2>
            <Link href="/reviews" className="text-xs uppercase tracking-[0.2em] underline">
              All reviews
            </Link>
          </div>
          <div className="mt-10">
            <Suspense fallback={null}>
              <ReviewList
                limit={3}
                emptyText="No reviews yet. Traveled with us? Share your experience."
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="relative isolate text-center text-white">
        <Image
          src="/images/falls.jpg"
          alt="Murchison Falls on the Nile, Uganda"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="px-6 py-24">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl sm:text-4xl">
            Get in contact today to start building your perfect tour
          </h2>
          <Link
            href="/custom-tours"
            className="mt-8 inline-block bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 hover:bg-amber-100"
          >
            Plan a custom tour
          </Link>
        </div>
      </section>
    </>
  );
}
