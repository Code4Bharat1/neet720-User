import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Global Metadata for NEET720
export const metadata = {
  metadataBase: new URL("https://neet720.com/"),
  title: "NEET 720 | Best NEET Coaching for Full Score Preparation",
  description:
    "NEET720 provides top-rank NEET coaching with chapter-wise tests, full syllabus mock exams, PYQs, and score-boosting strategies to help students aim for a perfect 720.",
  keywords: [
    "NEET 720",
    "Best NEET Coaching",
    "NEET Test Series",
    "NEET Online Classes",
    "NEET Preparation 2025",
    "Full Marks NEET Strategy",
    "NEET Topper Tips",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NEET720 | India’s Most Accurate NEET Practice Platform",
    description:
      "Practice high-accuracy NEET mock tests, AI-based performance analysis, and score-boosting recommendations.",
    url: "https://neet720.com/",
    siteName: "NEET720",
    images: [
      {
        url: "https://neet720.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NEET720 Coaching Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET720 | Full Score NEET Coaching",
    description:
      "Achieve a perfect NEET score with India’s most focused practice platform.",
    images: ["https://neet720.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://neet720.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <Navbar />
        {children}
        <Footer />

        {/* Schema Markup for SEO */}
        <Script
          id="schema-coaching"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "NEET720",
            description:
              "Top-tier NEET coaching & mock test platform designed to help students achieve 700+ scores.",
            url: "https://neet720.com/",
            logo: "https://neet720.com/og-image.jpg",
            sameAs: [
              "https://www.facebook.com/neet720",
              "https://www.instagram.com/neet720",
              "https://www.youtube.com/@neet720",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "India",
              addressRegion: "IN",
              addressCountry: "India",
            },
          })}
        </Script>
      </body>
    </html>
  );
}
