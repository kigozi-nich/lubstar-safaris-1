import Image from "next/image";

export default function PageHero({
  title,
  subtitle,
  image = "/images/falls.jpg",
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-stone-200">{subtitle}</p>}
      </div>
    </section>
  );
}
