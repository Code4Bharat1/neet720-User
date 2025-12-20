// ❌ NO "use client" here — RootLayout must be a Server Component
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./LP_clientLayout";
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

// Viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// ✅ SEO Metadata (XTORC-style, adapted for NEET720)
export const metadata = {
  metadataBase: new URL("https://neet720.com"),

  title: {
    default: "NEET 720 – Smart NEET Exam Portal & 720 Strategy",
    template: "%s | NEET 720",
  },

  description:
    "NEET 720 is India’s smart NEET exam portal offering AI-powered rank prediction, college prediction, mock tests, PYQs, performance analytics, and proven strategies to score 720/720 in NEET.",

  keywords: [
    // 🔹 Primary Keywords
    "NEET 720",
    "NEET exam portal",
    "neet 720 coaching",
    "NEET mock test",
    "NEET AI rank predictor",
    "NEET college predictor",
    "NEET preparation platform",
    "Neet 720 strategy",
    "NEET 2026 Strategy",
    "Neet 720 preparation",
    "NEET 720 Score Predictor",
    "Neet exam registration",

    // 🔹 Long-Tail Keywords
    "How to score 720 in NEET",
    "NEET 720 Score Predictor",
    "NEET 720 preparation strategy",
    "NEET topper study plan for 720",
    "NEET 720 marks strategy",
    "NEET daily practice tests",
    "NEET topper 720 marks",
    "NEET Physics Most Expected Qs",
    "Passing marks in NEET out of 720",
    "Passing marks in neet out of 720 for mbbs",

    // 🔹 Feature-Based Keywords
    "NEET PYQ practice",
    "NEET performance analytics",
    "AI based NEET preparation",
    "NEET full syllabus mock tests",
    "NEET personalized learning",
    "NEET Physics Formula Sheet",
    "Can I score 720 in 3 months?",

    // 🔹 Year & Intent Keywords
    "NEET 2026 preparation",
    "NEET 2025 mock tests",
    "NEET exam strategy India",

    
    // 🔹 People Also Ask (PAA)
   "What is the full form of NEET?",
    "What is the eligibility for the NEET exam?",
    "What is the age limit for the NEET exam?",
    "What is the syllabus of the NEET exam?",
    "What is the exam pattern of NEET?",
    "What are the best preparation tips for the NEET exam?",
    "Neet exam preparation tips",
  ],

  alternates: {
    canonical: "https://neet720.com/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "NEET 720 | AI Rank Predictor, Mock Tests & 720 Strategy",
    description:
      "Prepare smarter for NEET with NEET 720. Access AI-powered rank prediction, college prediction, mock tests, PYQs, and expert strategies to score a perfect 720.",
    url: "https://neet720.com/",
    siteName: "NEET 720",
    // images: [
    //   {
    //     // url: "/og-image.jpg", // place inside /public
    //     width: 1200,
    //     height: 630,
    //     alt: "NEET 720 – Smart NEET Preparation Platform",
    //   },
    // ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NEET 720 | Smart NEET Exam Preparation Platform",
    description:
      "Crack NEET with confidence using NEET 720. AI rank predictor, mock tests, PYQs, and proven strategies to score 720/720.",
    // images: ["/og-image.jpg"],
  },

  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
  //     { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
  //     { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
  //   ],
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NEET720",
              "url": "https://neet720.com",
              "logo": "https://neet720.com/logo.png",
              "description": "NEET720 is India’s smart NEET exam portal offering AI rank prediction, mock tests, PYQs, and 720-scoring strategies.",
              "sameAs": [
                "https://www.instagram.com/neet720",
                "https://www.facebook.com/neet720",
                "https://www.linkedin.com/company/neet720"
              ]
            }`,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Analytics (inside body only) */}
        {/* <Script
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
        </Script> */}

        {/* ✅ Client-side wrapper */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
