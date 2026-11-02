import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about booking and travelling on a Lubstar Safaris tour in Uganda.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "How do I book a tour?",
    a: "Pick a tour and departure date, then submit the booking form. We confirm availability and send payment details by email.",
  },
  {
    q: "Can I change the dates or customise a trip?",
    a: "Yes. Send us a custom tour request with your preferred dates and interests and we will build a proposal.",
  },
  {
    q: "What is the best time for gorilla trekking?",
    a: "Gorillas can be trekked year-round. The drier months, roughly June to September and December to February, make trails easier.",
  },
  {
    q: "Do I need a permit for gorilla or chimpanzee tracking?",
    a: "Yes. We arrange the permits as part of our primate tours, subject to availability, so book early.",
  },
  {
    q: "What should I pack?",
    a: "Sturdy waterproof hiking boots, long sleeves and trousers, rain jacket, insect repellent, sun protection and binoculars.",
  },
  {
    q: "Is travel insurance included?",
    a: "No. We strongly recommend insurance covering medical care, cancellations and evacuation.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title="Frequently Asked Questions" image="/images/chimp.jpg" />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-serif text-lg text-stone-900">
                {f.q}
              </summary>
              <p className="mt-2 text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-stone-700">
          More questions?{" "}
          <Link href="/contact" className="underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
