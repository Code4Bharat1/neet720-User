export async function generateMetadata({ params }) {
  const { seriesId } = params;

  const formatted = seriesId.replace(/-/g, " ");

  const title = `NEET Test Series – ${formatted} | NEET720`;
  const description = `Practice NEET chapter-wise and full-length test series: ${formatted}. Boost your score with real-exam simulation.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://neet720.com/test-series/${seriesId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neet720.com/test-series/${seriesId}`,
      type: "article",
      images: [
        {
          url: "https://neet720.com/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://neet720.com/og-image.jpg"],
    },
  };
}

import UserTestsBySeries from "@/components/TestSeries/UserTestsBySeries";

export default function Page() {
  return <UserTestsBySeries />;
}
