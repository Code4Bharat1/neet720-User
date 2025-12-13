// ❌ NO "use client" here — RootLayout must be server component
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./LP_clientLayout"; // client component (contains Toaster & pageview)
import Script from "next/script";

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
    "NEET720",
    "NEET 720 marks",
    "NEET 720/720",
    "720 out of 720 in NEET",
    "NEET 720 topper",
    "Who scored 720 in NEET",
    "How to score 720 in NEET",
    "NEET perfect score 720",
    "NEET 720 rank",
    "NEET 720 strategy",
    "NEET 720 full marks",
    "NEET 720 achievers",
    "NEET 2026",
    "NEET mock test",
    "How to score full marks in NEET",
    "How many students scored 720 in NEET 2024",
    "NEET perfect score strategy",
    "NEET 720/720 preparation tips",
    "Daily timetable to score 720 in NEET",
    "Mistakes to avoid to score 720 in NEET",
    "NEET topper study plan for 720",
    "NEET 2026 topper marks",
    "NEET 720 marks real stories",
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
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FWW584RNVM"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWW584RNVM');
          `}
        </Script>

        {/* AEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NEET",
              "url": "https://neet720.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://neet720.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Client-only wrapper (contains Toaster & pageview tracking) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
