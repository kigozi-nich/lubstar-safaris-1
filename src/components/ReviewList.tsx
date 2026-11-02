import { connection } from "next/server";
import { getApprovedReviews } from "@/lib/db";
import { getTour } from "@/data/tours";
import { formatDate } from "@/lib/form";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

// Reads approved reviews from the database at request time.
export default async function ReviewList({
  limit = 50,
  emptyText,
}: {
  limit?: number;
  emptyText?: string;
}) {
  await connection();
  const reviews = await getApprovedReviews(limit);

  if (!reviews.length) {
    return emptyText ? <p className="text-stone-600">{emptyText}</p> : null;
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => (
        <li key={r.id} className="bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <p className="text-amber-600" aria-label={`${r.rating} out of 5 stars`}>
            {stars(r.rating)}
          </p>
          <p className="mt-3 text-stone-700">&ldquo;{r.comment}&rdquo;</p>
          <p className="mt-4 text-sm font-semibold">
            {r.name}
            {r.country ? `, ${r.country}` : ""}
          </p>
          <p className="text-xs text-stone-500">
            {r.tour_slug ? `${getTour(r.tour_slug)?.name ?? ""} · ` : ""}
            {formatDate(r.created_at.slice(0, 10))}
          </p>
        </li>
      ))}
    </ul>
  );
}
