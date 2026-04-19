import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevFmt — Format. Convert. Ship.",
    template: "%s | DevFmt",
  },
  description:
    "JSON formatter, CSV converter, and developer data tools — fast, private, no signup.",
  keywords: [
    "json formatter",
    "csv converter",
    "developer tools",
    "data formatter",
    "json to csv",
    "base64 encode",
    "sql formatter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        {ADSENSE_ID && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_ID} />
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
              strategy="beforeInteractive"
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
