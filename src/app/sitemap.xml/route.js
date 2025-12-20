import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://neet720.com";
  const today = new Date().toISOString().split("T")[0];

  // 🔥 Dynamic batch slugs (replace API if needed)
  const batchSlugs = [
    "neet-2026",
    "neet-2025",
    // "physics-crash-course",
  ];

  const staticUrls = [
    { path: "", priority: "1.0" },
    { path: "homepage", priority: "0.9" },
    { path: "test-series", priority: "0.9" },
    { path: "pyq", priority: "0.8" },
    { path: "collegeprediction", priority: "0.8" },
    { path: "faqs", priority: "0.7" },
    { path: "pricing", priority: "0.7" },
    { path: "refund", priority: "0.5" },
    { path: "terms", priority: "0.5" },
    { path: "privacy", priority: "0.5" },
    { path: "dashboard", priority: "0.9" },
    { path: "fulltest", priority: "0.8" },
    { path: "fast_quiz", priority: "0.8" },
    { path: "createtest", priority: "0.8" },
    { path: "chatbot", priority: "0.6" },
    { path: "exam_plan", priority: "0.6" },
    { path: "subjectwise_frontend", priority: "0.7" },
    { path: "result", priority: "0.7" },
    { path: "analytics", priority: "0.7" },
    { path: "previousyearquestions", priority: "0.7" },
    { path: "noticeSection", priority: "0.6" },
    { path: "scholarship_frontend", priority: "0.6" },
    { path: "notification", priority: "0.6" },
    { path: "upcomingActivity", priority: "0.6" },
    { path: "top10_frontend", priority: "0.6" },
    { path: "customTask", priority: "0.6" },
  ];

  const batchUrls = batchSlugs.map((slug) => ({
    path: `batch/${slug}`,
    priority: "0.9",
  }));

  const urls = [...staticUrls, ...batchUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ path, priority }) => {
    const loc = path ? `${baseUrl}/${path}` : baseUrl;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
