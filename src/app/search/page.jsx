export default function SearchPage({ searchParams }) {
  const query = searchParams?.q?.toLowerCase();

  if (!query) {
    return <h1>No search query</h1>;
  }

  // Searchable routes
  const searchablePages = [
    {
      type: "Course",
      title: "NEET 2026 Crash Course",
      url: "/course/neet-2026",
    },
    {
      type: "Batch",
      title: "NEET 2026 Batch",
      url: "/batch/neet-2026",
    },
    {
      type: "Page",
      title: "Colleges",
      url: "/colleges",
    },
    {
      type: "Tool",
      title: "College Predictor",
      url: "/collegepredictor",
    },
  ];

  const results = searchablePages.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: "24px" }}>
      <h1>Search Results</h1>
      <p>
        Showing results for: <strong>{query}</strong>
      </p>

      <hr />

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((item, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              <a href={item.url}>
                {item.title} <small>({item.type})</small>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
