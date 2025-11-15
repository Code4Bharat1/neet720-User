import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./LP_clientLayout"; // ✅ Make sure this path is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Add this
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
  description:
    "NEET720 is the all-in-one NEET exam portal featuring AI-powered rank predictor, college predictor, test series, and performance analytics for NEET 2026.",
  keywords: [
    "NEET720",
    "neet720 portal",
    "neet720 rank predictor",
    "NEET exam 2026",
    "NEET college predictor AI",
    "NEET performance analytics",
    "NEET test series platform",
    "smart NEET preparation",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Toast Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              zIndex: 999999, // 🔥 makes it appear above modals
              background: "#333",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#16a34a", // green-600
                secondary: "#ecfdf5", // green-50
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626", // red-600
                secondary: "#fee2e2", // red-50
              },
            },
          }}
        />

        {/* ✅ Your app layout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
