import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Offers",
  description: "Current discounts on Uganda gorilla, chimpanzee and wildlife safari tours.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const deals = tours.filter((t) => t.offer);
  return (
    <>
      <PageHero title="Offers" subtitle="Save on selected tours and departures. Terms apply." image="/images/giraffe.jpg" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        {deals.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        ) : (
          <p className="text-stone-600">No offers right now. Check back soon.</p>
        )}
      </div>
    </>
  );
}
