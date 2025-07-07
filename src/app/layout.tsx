import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "../../providers/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clypp - Watch Movies & Shows Online in HD",
  description:
    "Clypp is a modern streaming platform where you can explore and watch the latest movies, series, and animations in high-definition. Experience cinema like never before.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "Clypp",
    "movie streaming",
    "watch movies online",
    "HD movies",
    "stream TV shows",
    "online cinema",
    "free streaming",
    "VOD platform",
  ],
  authors: [
    { name: "Mubassim Ahmed Khan", url: "https://mubassim.vercel.app" },
  ],
  creator: "Clypp",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Clypp - Watch Movies & Shows Online in HD",
    description:
      "Stream top movies, series, and animations on Clypp. Smooth experience, HD quality, and cinematic stories at your fingertips.",
    url: "https://clypp.vercel.app",
    siteName: "Clypp",
    images: [
      {
        url: "https://github.com/Mubassim-Khan/Clypp/blob/main/public/images/Preview_1.png",
        width: 1200,
        height: 630,
        alt: "Clypp - Watch Movies & Shows Online in HD",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
