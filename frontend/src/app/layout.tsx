import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Catalog | Music Catalog Insights",
    template: "%s | Catalog"
  },
  description: "Advanced Music Catalog Insights powered by Gemini. Track library metadata, view analytic distributions, and receive intelligent recommendations for managing your audio acquisitions.",
  keywords: ["music catalog", "audio analytics", "ai insights", "gemini", "music management", "catalog dashboard"],
  authors: [{ name: "Catalog Team" }],
  creator: "Catalog Engineering",
  publisher: "Catalog Inc.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://catalog.ai",
    siteName: "Catalog",
    title: "Catalog | Music Catalog Insights",
    description: "Advanced Music Catalog Insights powered by Gemini.",
    images: [
      {
        url: "https://catalog.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Catalog Dashboard Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalog | Music Catalog Insights",
    description: "Advanced Music Catalog Insights powered by Gemini.",
    images: ["https://catalog.ai/twitter-image.png"],
    creator: "@catalog_app",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster theme="dark" richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
