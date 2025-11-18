// ❌ NO "use client" here — RootLayout must be server component
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./LP_clientLayout"; // Keep this client component

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport config
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// SEO Metadata
export const metadata = {
  title: "NEET – Smart NEET Exam Portal & AI Rank Predictor",
  description:
    "NEET is the all-in-one NEET exam portal featuring AI-powered rank predictor, college predictor, test series, and performance analytics for NEET 2026.",
  keywords: [
    "NEET",
    "NEET 2026",
    "NEET mock test",
    "NEET free mock test",
    "best NEET mock test online",
    "NEET test series",
    "NEET online test series",
    "NEET full syllabus mock test",
    "NEET chapter-wise test",
    "NEET chapter test free",
    "NEET online practice",
    "NEET previous year questions",
    "NEET PYQ chapter wise",
    "NEET NCERT based questions",
    "NEET free study material",
    "NEET rank predictor",
    "NEET AIR predictor",
    "NEET marks vs rank",
    "NEET AI predictor",
    "NEET college predictor",
    "NEET cutoff 2026",
    "NEET government college cutoff",
    "NEET timetable for droppers",
    "NEET study plan for 12th",
    "how to prepare for NEET 2026",
    "how to score 600+ in NEET",
    "best NEET preparation website",
    "NEET online learning platform",
    "NEET performance analytics",
    "NEET smart preparation",
    "NEET720",
    "NEET720 portal",
  ],

  applicationName: "NEET720",
  authors: [{ name: "NEET720 Team", url: "https://neet720.com" }],
  creator: "NEET720",
  publisher: "NEET720",
  metadataBase: new URL("https://neet720.com"),
  alternates: {
    canonical: "https://neet720.com",
  },

  openGraph: {
    title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
    description:
      "Prepare for NEET 2026 smarter with NEET720. Get AI-powered insights, college predictions, personalized test analytics, and more.",
    url: "https://neet720.com",
    siteName: "NEET720",
    images: [
      {
        url: "https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/NEET720.jpeg",
        width: 1200,
        height: 630,
        alt: "NEET720 – NEET Exam Portal with AI Rank Prediction",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
    description:
      "Explore NEET test analytics, AI-powered rank prediction, and college guidance with NEET720.",
    images: [
      "https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/NEET720.jpeg",
    ],
    site: "@neet720",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    keywords:
      "NEET720, NEET rank predictor, NEET2026 portal, NEET AI analysis, best NEET preparation platform",
  },
};

// RootLayout (Server Component)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NEET",
              "url": "https://neet720.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://neet720.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Toasts */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              zIndex: 999999,
              background: "#333",
              color: "#fff",
            },
          }}
        />

        {/* Client-only wrapper */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
