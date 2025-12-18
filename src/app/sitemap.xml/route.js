import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://neet720.com";

  const urls = [
    { path: "", priority: "1.0" },
    { path: "about", priority: "0.9" },
    { path: "courses", priority: "0.9" },
    { path: "batch", priority: "0.9" },
    { path: "pyq", priority: "0.8" },
    { path: "test-series", priority: "0.8" },
    { path: "analytics", priority: "0.8" },
    { path: "contact", priority: "0.8" },

    { path: "blog/neet-preparation-tips", priority: "0.7" },
    { path: "blog/physics-strategy", priority: "0.7" },
    { path: "blog/chemistry-scoring-topics", priority: "0.7" },
    { path: "blog/biology-highweightage", priority: "0.7" },
    { path: "blog/neet-cutoff", priority: "0.7" },
  ];

  const today = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ path, priority }) => {
    const loc = path ? `${baseUrl}/${path}` : baseUrl;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
