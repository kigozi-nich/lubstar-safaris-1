import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

const g = globalThis as unknown as { __sql?: Sql; __dbReady?: Promise<void> };

async function init(sql: Sql) {
  await sql`CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    tour_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    travel_date TEXT NOT NULL,
    guests INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    kind TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    rating INTEGER NOT NULL,
    tour_slug TEXT,
    comment TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
}

// Returns the Neon client after making sure the tables exist.
export async function getDb(): Promise<Sql> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  g.__sql ??= neon(url);
  const sql = g.__sql;
  g.__dbReady ??= init(sql).catch((err) => {
    g.__dbReady = undefined;
    throw err;
  });
  await g.__dbReady;
  return sql;
}

export type Review = {
  id: number;
  name: string;
  country: string | null;
  rating: number;
  tour_slug: string | null;
  comment: string;
  created_at: string;
};

export async function getApprovedReviews(limit = 50): Promise<Review[]> {
  const sql = await getDb();
  const rows = await sql`
    SELECT id, name, country, rating, tour_slug, comment,
           to_char(created_at, 'YYYY-MM-DD') AS created_at
    FROM reviews WHERE approved = true ORDER BY id DESC LIMIT ${limit}`;
  return rows as unknown as Review[];
}
