import { Anton, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SoundProvider from "@/components/SoundProvider";
import { SITE } from "@/lib/site";

import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Lil Bardi — Official Digital World",
    template: "%s — Lil Bardi",
  },
  description: SITE.description,
  keywords: ["Lil Bardi", "Ride or Die", "Foreign Season", "rap", "new music"],
  openGraph: {
    type: "website",
    title: "Lil Bardi — Official Digital World",
    description: SITE.description,
    siteName: "Lil Bardi",
    images: [{ url: "/Rideordie.png", width: 1000, height: 1000, alt: "Ride or Die by Lil Bardi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Bardi — Official Digital World",
    description: SITE.description,
    images: ["/Rideordie.png"],
  },
};

export const viewport = {
  themeColor: "#f8fbff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${grotesk.variable} ${plexMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-cloud text-ink">
        <SoundProvider>
          <a
            href="#main"
            className="type-label fixed top-3 left-1/2 z-[80] -translate-x-1/2 -translate-y-24 rounded-full bg-ink px-4 py-2 text-cloud transition-transform focus-visible:translate-y-0"
          >
            Skip to content
          </a>

          <Navbar />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />
        </SoundProvider>
      </body>
    </html>
  );
}
