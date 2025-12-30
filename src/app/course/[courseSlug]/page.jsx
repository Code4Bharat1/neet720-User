// ❌ NO "use client" — Server Component

// ✅ Metadata (Next.js 15 compatible)
export async function generateMetadata({ params }) {
  const { courseSlug } = await params;

  const courseSEO = {
    "neet-2026": {
      title: "NEET 2026 Crash Course | NEET720",
      description:
        "Join NEET720’s NEET 2026 Crash Course with full syllabus coverage, mock tests, PYQs, and expert guidance to score 720.",
    },
  };

  return {
    title: courseSEO[courseSlug]?.title || "Course | NEET720",
    description:
      courseSEO[courseSlug]?.description ||
      "Explore NEET preparation courses by NEET720.",
  };
}

export default async function CoursePage({ params }) {
  const { courseSlug } = await params;

  // Temporary static data (replace with API later)
  const courseData = {
    "neet-2026": {
      name: "NEET 2026 Crash Course",
      description:
        "This course is designed for NEET 2026 aspirants with full syllabus coverage, practice tests, PYQs, and performance analytics.",
    },
  };

  const course = courseData[courseSlug];

  if (!course) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Course Not Found</h1>
        <p>The requested course does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{course.name}</h1>
      <p>{course.description}</p>

      {/* ✅ Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.name,
            provider: {
              "@type": "Organization",
              name: "NEET720",
              url: "https://neet720.com",
            },
          }),
        }}
      />
    </div>
  );
}
