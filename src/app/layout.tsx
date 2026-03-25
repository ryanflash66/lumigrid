import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingCTA } from "@/components/layout/floating-cta";
import { PageTransition } from "@/components/layout/page-transition";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PageLoader } from "@/components/ui/page-loader";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { GrainOverlay } from "@/components/ui/grain-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumigrid.example.com"),
  title: {
    default: "Lumigrid | Web Development Agency",
    template: "%s | Lumigrid",
  },
  description:
    "Lumigrid builds high-performing websites and digital experiences for NGOs, startups, and enterprises.",
  keywords: [
    "Lumigrid",
    "web development agency",
    "Next.js agency site",
    "tailwind website",
    "digital product studio",
  ],
  openGraph: {
    title: "Lumigrid | Web Development Agency",
    description:
      "Custom-built websites, human-centered UX, and blazing-fast performance for mission-driven teams.",
    url: "https://lumigrid.example.com",
    siteName: "Lumigrid",
    images: [
      {
        url: "/assets/images/hero/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumigrid hero image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@lumigrid",
    title: "Lumigrid | Web Development Agency",
    description:
      "Custom-built websites, human-centered UX, and blazing-fast performance for mission-driven teams.",
    images: ["/assets/images/hero/hero-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3YRTKBC73F"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3YRTKBC73F');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <AmbientBackground />
            <CustomCursor />
            <GrainOverlay />
            <div className="flex min-h-screen flex-col relative z-0">
              <SiteHeader />
              <PageTransition>{children}</PageTransition>
              <SiteFooter />
            </div>
            <FloatingCTA />
            <PageLoader />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
