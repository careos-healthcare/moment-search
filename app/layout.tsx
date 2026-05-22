import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import {
  BRAND,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${BRAND.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: BRAND.name,
  keywords: [
    "YouTube timestamp search",
    "podcast moment search",
    "find exact video moment",
    "podcast search by topic",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: BRAND.twitterHandle,
  },
  alternates: {
    canonical: BRAND.siteUrl,
  },
};

export const viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
