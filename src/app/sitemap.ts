import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { SITE_URL } from "@/lib/site";

const routes = [
  "",
  "/tours",
  "/offers",
  "/custom-tours",
  "/booking",
  "/travel-info",
  "/faq",
  "/reviews",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r}`,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    ...tours.map((t) => ({
      url: `${SITE_URL}/tours/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
