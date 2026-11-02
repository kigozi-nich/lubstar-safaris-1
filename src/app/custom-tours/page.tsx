import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Custom Tours",
  description: "Design a private tailor-made safari in Uganda around your dates, interests and budget.",
  alternates: { canonical: "/custom-tours" },
};

export default function CustomToursPage() {
  return (
    <>
      <PageHero title="Custom Tours" subtitle="A private, tailor-made trip built around you." image="/images/gorilla.jpg" />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="mb-8 text-stone-700">
          Tell us who is travelling, when, and what you want to see. Our team will reply with a
          proposed itinerary.
        </p>
        <ContactForm
          kind="custom"
          placeholder="Travel dates, number of guests, places and activities you are interested in, budget..."
        />
      </div>
    </>
  );
}
