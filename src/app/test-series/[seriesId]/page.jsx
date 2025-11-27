

export async function generateMetadata({ params }) {
  const { seriesId } = await params;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

import UserTestsBySeries from "@/components/TestSeries/UserTestsBySeries";

export default function Page() {
  return <UserTestsBySeries />;
}
