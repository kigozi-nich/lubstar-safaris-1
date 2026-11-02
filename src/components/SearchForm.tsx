import { MONTHS, destinations } from "@/data/tours";

// Plain GET form: submits to /tours?destination=...&type=...&month=..., no client JS needed.
export default function SearchForm({
  destination = "",
  type = "",
  month = "",
}: {
  destination?: string;
  type?: string;
  month?: string;
}) {
  const field = "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800";
  return (
    <form
      action="/tours"
      className="grid gap-3 bg-white p-4 shadow-lg sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <select name="destination" defaultValue={destination} aria-label="Destination" className={field}>
        <option value="">All destinations</option>
        {destinations.map((d) => (
          <option key={d.name} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>
      <select name="type" defaultValue={type} aria-label="Trip type" className={field}>
        <option value="">All trip types</option>
        <option>Primates</option>
        <option>Big Game</option>
        <option>Scenery</option>
      </select>
      <select name="month" defaultValue={month} aria-label="Departure month" className={field}>
        <option value="">Any departure date</option>
        {MONTHS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-amber-700 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-amber-800"
      >
        Find my trip
      </button>
    </form>
  );
}
