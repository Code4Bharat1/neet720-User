export const dynamic = 'force-dynamic';

import UserTestSeriesList from "@/components/TestSeries/UserTestSeriesList";

export async function generateMetadata({ params }) {
  const { seriesId } = params;
  const formattedName = seriesId.replace(/-/g, " ");
  const title = `NEET Test Series – ${formattedName} | NEET720`;
  const description = `Practice NEET chapter-wise and full-length test series: ${formattedName}. Improve accuracy with real-exam simulation on NEET720.`;

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

export default function Page() {
  return (
    <div>
      <UserTestSeriesList />
    </div>
  );
}
