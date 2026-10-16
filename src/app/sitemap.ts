import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://upshift-seo-studio.it-boffins-9422.chatgpt.site";
  return ["/", "/guides/seo-for-small-business/", "/privacy/", "/terms/"].map(path => ({ url: `${base}${path}`, changeFrequency: path === "/" ? "monthly" : "yearly", priority: path === "/" ? 1 : path.includes("guides") ? 0.7 : 0.2 }));
}
