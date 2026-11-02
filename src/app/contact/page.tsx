import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lubstar Safaris to plan your Uganda trip.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Questions? Send us an inquiry and we will get back to you." image="/images/chimp.jpg" />
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="space-y-3 text-stone-700">
          <h2 className="font-serif text-2xl text-stone-900">Get in touch</h2>
          <p>Email: info@lubstarsafaris.com</p>
          <p>Phone: +256 779879243</p>
        </aside>
      </div>
    </>
  );
}
