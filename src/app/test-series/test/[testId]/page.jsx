export async function generateMetadata({ params }) {
  const { seriesId, testId } = params;

  const title = `NEET Test – ${testId.replace(/-/g, " ")} | ${seriesId.replace(
    /-/g,
    " "
  )} | NEET720`;

  const description = `Attempt NEET mock test ${testId.replace(
    /-/g,
    " "
  )} under ${seriesId.replace(
    /-/g,
    " "
  )}. Includes timer, analytics, performance review & accuracy tracking.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://neet720.com/test-series/${seriesId}/test/${testId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://neet720.com/test-series/${seriesId}/test/${testId}`,
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

import TestPage from "@/components/TestSeries/TestPage";

export default function Page() {
  return <TestPage />;
}
