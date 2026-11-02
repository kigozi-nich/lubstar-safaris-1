"use server";

import { getDb } from "@/lib/db";
import { notifyOwner } from "@/lib/email";
import type { FormState } from "@/lib/form";
import { getTour, tours } from "@/data/tours";

const str = (fd: FormData, key: string, max = 200) =>
  String(fd.get(key) ?? "").trim().slice(0, max);

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Hidden "website" field: bots fill it, humans never see it.
const isBot = (fd: FormData) => str(fd, "website").length > 0;

const fail = (errors: Record<string, string>): FormState => ({
  ok: false,
  message: "Please fix the highlighted fields.",
  errors,
});

export async function createBooking(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you!" };

  const tour = getTour(str(fd, "tour"));
  const name = str(fd, "name", 100);
  const email = str(fd, "email", 150);
  const phone = str(fd, "phone", 40);
  const date = str(fd, "date", 10);
  const guests = Number(str(fd, "guests", 3));
  const notes = str(fd, "notes", 1000);

  const errors: Record<string, string> = {};
  if (!tour) errors.tour = "Choose a tour.";
  if (!name) errors.name = "Enter your name.";
  if (!emailOk(email)) errors.email = "Enter a valid email.";
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
  if (!parsed || Number.isNaN(parsed.getTime())) errors.date = "Choose a travel date.";
  else if (parsed.getTime() < Date.now()) errors.date = "Choose a future date.";
  if (!Number.isInteger(guests) || guests < 1 || guests > 50) errors.guests = "Guests must be 1-50.";
  if (Object.keys(errors).length) return fail(errors);

  const sql = await getDb();
  await sql`INSERT INTO bookings (tour_slug, name, email, phone, travel_date, guests, notes)
    VALUES (${tour!.slug}, ${name}, ${email}, ${phone}, ${date}, ${guests}, ${notes})`;

  await notifyOwner(
    `New booking request: ${tour!.name}`,
    `Tour: ${tour!.name}\nDate: ${date}\nGuests: ${guests}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes}`,
  );
  return { ok: true, message: "Thank you! We received your booking request and will contact you shortly." };
}

export async function createInquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you!" };

  const kind = str(fd, "kind", 20) === "custom" ? "custom" : "general";
  const name = str(fd, "name", 100);
  const email = str(fd, "email", 150);
  const phone = str(fd, "phone", 40);
  const message = str(fd, "message", 3000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Enter your name.";
  if (!emailOk(email)) errors.email = "Enter a valid email.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return fail(errors);

  const sql = await getDb();
  await sql`INSERT INTO inquiries (kind, name, email, phone, message)
    VALUES (${kind}, ${name}, ${email}, ${phone}, ${message})`;

  await notifyOwner(
    `New ${kind} inquiry from ${name}`,
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  );
  return { ok: true, message: "Thank you! Your message has been sent. We will reply soon." };
}

export async function subscribe(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you!" };
  const email = str(fd, "email", 150).toLowerCase();
  if (!emailOk(email)) return fail({ email: "Enter a valid email." });

  const sql = await getDb();
  await sql`INSERT INTO subscribers (email) VALUES (${email}) ON CONFLICT DO NOTHING`;
  return { ok: true, message: "You're subscribed. Welcome!" };
}

export async function submitReview(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thank you!" };

  const name = str(fd, "name", 100);
  const country = str(fd, "country", 80);
  const rating = Number(str(fd, "rating", 1));
  const tourSlug = str(fd, "tour", 80);
  const comment = str(fd, "comment", 2000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Enter your name.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Choose 1-5 stars.";
  if (tourSlug && !tours.some((t) => t.slug === tourSlug)) errors.tour = "Unknown tour.";
  if (comment.length < 10) errors.comment = "Write at least 10 characters.";
  if (Object.keys(errors).length) return fail(errors);

  const sql = await getDb();
  const rows = (await sql`INSERT INTO reviews (name, country, rating, tour_slug, comment)
    VALUES (${name}, ${country}, ${rating}, ${tourSlug || null}, ${comment}) RETURNING id`) as { id: number }[];

  await notifyOwner(
    `New review awaiting approval (#${rows[0]?.id})`,
    `${name} (${country}) rated ${rating}/5:\n${comment}`,
  );
  return { ok: true, message: "Thank you! Your review will appear once approved." };
}
