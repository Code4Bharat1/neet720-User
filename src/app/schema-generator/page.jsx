export const metadata = {
  title: "Free Schema Generator Tool | NEET720",
  description:
    "Use this free schema generator tool to create JSON-LD structured data for better SEO and improved search visibility.",
};

export default function SchemaGenerator() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Free Schema Generator</h1>
      <p>
        This tool helps generate structured data schema for better SEO and search
        engine visibility.
      </p>

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <iframe
          src="https://seosmoothie.com/free-seo-tools/embed-website.html"
          title="Website Schema Generator"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          loading="lazy"
        ></iframe>
      </div>

      <p>
        This free schema generator allows website owners and SEO professionals to
        easily create JSON-LD schema markup for websites, search actions, and rich
        results, helping improve overall website performance in search engines.
      </p>
    </div>
  );
}
