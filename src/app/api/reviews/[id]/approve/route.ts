import { timingSafeEqual } from "node:crypto";
import { getDb } from "@/lib/db";

// Approve a review: POST /api/reviews/<id>/approve with "Authorization: Bearer <ADMIN_TOKEN>".
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const token = process.env.ADMIN_TOKEN;
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(token ?? "");
  if (!token || a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await ctx.params;
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId)) return new Response("Bad request", { status: 400 });

  const sql = await getDb();
  const rows = (await sql`UPDATE reviews SET approved = true WHERE id = ${reviewId} RETURNING id`) as { id: number }[];
  return Response.json({ updated: rows.length });
}
