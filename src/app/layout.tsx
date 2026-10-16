import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://upshift-seo-studio.it-boffins-9422.chatgpt.site"),
  title: { default: "UPSHIFT — SEO that turns searches into customers", template: "%s | UPSHIFT" },
  description: "Get found. Get chosen. Practical SEO for existing websites and search-ready new builds. UK SEO packages from £495/month, with clear scope and straight answers.",
  applicationName: "UPSHIFT",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  keywords: ["UK SEO services", "small business SEO", "local SEO", "SEO website improvements", "Next.js web design"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_GB", siteName: "UPSHIFT", title: "Good business. Meet better visibility.", description: "SEO for the website you have. Or the one you need. Clear UK packages from £495/month." },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f5f4ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><head><link rel="preload" href="/fonts/font-1.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-2.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
