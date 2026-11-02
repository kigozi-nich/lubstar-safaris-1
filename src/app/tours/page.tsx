import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SearchForm from "@/components/SearchForm";
import TourCard from "@/components/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Uganda Safari Tours",
  description:
    "Gorilla trekking, chimpanzee tracking, lion safaris and Murchison Falls tours in Uganda.",
  alternates: { canonical: "/tours" },
};

type Params = { destination?: string; type?: string; month?: string };

async function Results({ searchParams }: { searchParams: Promise<Params> }) {
  const { destination = "", type = "", month = "" } = await searchParams;

  const list = tours
    .filter((t) => !destination || t.destination === destination)
    .filter((t) => !type || t.type === type)
    .filter((t) => !month || t.departures.some((d) => d.startsWith(month)));

  return (
    <>
      <p className="mt-6 text-xs uppercase tracking-widest text-stone-500">
        {list.length} tours
      </p>

      {list.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-stone-600">
          No tours match your search.{" "}
          <Link href="/tours" className="underline">
            Clear filters
          </Link>
        </p>
      )}
    </>
  );
}

async function Search({ searchParams }: { searchParams: Promise<Params> }) {
  const { destination, type, month } = await searchParams;
  return <SearchForm destination={destination} type={type} month={month} />;
}

export default function ToursPage({ searchParams }: { searchParams: Promise<Params> }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-4xl text-stone-900">Our Tours</h1>
      <div className="mt-8 max-w-4xl">
        <Suspense fallback={<SearchForm />}>
          <Search searchParams={searchParams} />
        </Suspense>
      </div>
      <Suspense fallback={<p className="mt-8">Loading tours...</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
