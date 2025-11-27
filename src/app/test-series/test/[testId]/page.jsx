export async function generateMetadata({ params }) {
  // Do NOT await params — check if needed
  const resolved = await Promise.resolve(params);

  const { seriesId, testId } = resolved;

  if (!seriesId || !testId) {
    console.warn("⚠ Missing route params:", resolved);
    return {
      title: "NEET Test – NEET720",
      description: "Attempt NEET tests on NEET720",
    };
  }

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


import TestPage from "@/components/TestSeries/TestPage";

export default function Page() {
  return <TestPage />;
}
