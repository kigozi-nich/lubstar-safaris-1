import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Visas & Travel Info",
  description: "Visa, passport, health and packing information for travelling to Uganda.",
  alternates: { canonical: "/travel-info" },
};

const sections = [
  {
    title: "Visas",
    text: "Most visitors need a visa to enter Uganda. Apply online through the official Uganda immigration e-visa portal before you travel. Requirements change, so always check the official portal for your nationality.",
  },
  {
    title: "Passport",
    text: "Your passport should be valid for at least six months beyond your arrival date and have blank pages for stamps.",
  },
  {
    title: "Health",
    text: "A yellow fever vaccination certificate is commonly required for entry. Speak to a travel clinic about malaria prevention and other vaccinations well before departure.",
  },
  {
    title: "Before your trip",
    text: "Arrange travel insurance, notify your bank, bring copies of your documents, and pack for both warm days and cool, wet forest mornings.",
  },
  {
    title: "Gorilla and chimpanzee etiquette",
    text: "Keep your distance, stay quiet and do not trek if you are ill. Rangers brief every group before the trek.",
  },
];

export default function TravelInfoPage() {
  return (
    <>
      <PageHero title="Visas & Travel Info" subtitle="Everything to prepare before you fly to Uganda." image="/images/lion.jpg" />
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-16">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-2xl text-stone-900">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-stone-700">{s.text}</p>
          </section>
        ))}
        <p className="text-sm text-stone-500">
          This is general guidance only. Confirm current entry and health requirements with the
          official authorities before travelling.
        </p>
      </div>
    </>
  );
}
