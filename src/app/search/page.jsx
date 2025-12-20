import { redirect } from "next/navigation";

// ✅ SEO: prevent indexing of search pages
export const metadata = {
  title: "Search Results | NEET720",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim();

  // 🚫 If no query, redirect to homepage
  if (!query) {
    redirect("/");
  }

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Search Results</h1>

      <p>
        Showing results for: <strong>{query}</strong>
      </p>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔍 Placeholder for future search results */}
      <p>No results found yet.</p>

      {/* 
        Later you can add:
        - Course search
        - Batch search
        - Blog search
      */}
    </main>
  );
}
