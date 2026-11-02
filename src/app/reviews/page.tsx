import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read what travellers say about their Lubstar Safaris tours in Uganda.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Traveller Reviews" subtitle="Real experiences from guests who travelled with us." image="/images/gorilla.jpg" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Suspense fallback={<p>Loading reviews...</p>}>
          <ReviewList emptyText="No reviews yet. Be the first to share your experience below." />
        </Suspense>

        <div className="mx-auto mt-16 max-w-xl">
          <h2 className="font-serif text-2xl text-stone-900">Share your experience</h2>
          <p className="mb-6 mt-2 text-sm text-stone-600">
            Reviews are checked before they appear on the site.
          </p>
          <ReviewForm />
        </div>
      </div>
    </>
  );
}
