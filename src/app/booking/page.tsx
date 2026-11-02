import { Suspense } from "react";
import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Book a Tour",
  description: "Request a booking for a Lubstar Safaris tour in Uganda.",
  alternates: { canonical: "/booking" },
};

type Props = { searchParams: Promise<{ tour?: string; date?: string }> };

async function Form({ searchParams }: Props) {
  const { tour, date } = await searchParams;
  return <BookingForm defaultTour={tour} defaultDate={date} />;
}

export default function BookingPage({ searchParams }: Props) {
  return (
    <>
      <PageHero title="Book a Tour" subtitle="Choose your tour and departure date and we will confirm shortly." image="/images/lion.jpg" />
      <div className="mx-auto max-w-xl px-6 py-16">
        <Suspense fallback={<p>Loading...</p>}>
          <Form searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
