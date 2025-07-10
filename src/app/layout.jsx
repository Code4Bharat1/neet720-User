import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
  description:
    "NEET720 is your all-in-one NEET exam portal with AI-based college predictors, rank vs marks analysis, test series, and performance tracking.",
  keywords: [
    "NEET720",
    "NEET exam portal",
    "NEET 2025",
    "NEET rank predictor",
    "NEET college predictor",
    "NEET test series",
    "NEET performance tracker",
    "medical college admission",
  ],
  authors: [{ name: "NEET720 Team", url: "https://neet720.com" }],
  creator: "NEET720",
  publisher: "NEET720",
  openGraph: {
    title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
    description:
      "Prepare for NEET 2025 smarter with NEET720. Get AI-powered insights, college predictions, personalized test analytics, and more.",
    url: "https://neet720.com",
    siteName: "NEET720",
    images: [
      {
        url: "https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/NEET720.jpeg", // or use a general homepage image
        width: 1200,
        height: 630,
        alt: "NEET720 Exam Portal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEET720 – Smart NEET Exam Portal & AI Rank Predictor",
    description:
      "Explore NEET test analytics, rank prediction, and college guidance with NEET720.",
    images: ["https://s3.ap-southeast-1.wasabisys.com/neet720/seoImages/NEET720.jpeg"],
    site: "@neet720",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
