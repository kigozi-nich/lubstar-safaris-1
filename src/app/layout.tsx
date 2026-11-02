import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, SLOGAN } from "@/lib/site";

const description = `${SLOGAN} Book gorilla trekking, chimpanzee tracking and wildlife safaris in Uganda.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lubstar Safaris | Uganda Safaris & Tour Bookings",
    template: "%s | Lubstar Safaris",
  },
  description,
  keywords: [
    "Uganda safari",
    "gorilla trekking Uganda",
    "Bwindi",
    "Murchison Falls",
    "Queen Elizabeth National Park",
    "Lubstar Safaris",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Lubstar Safaris | Uganda Safaris & Tour Bookings",
    description,
    url: "/",
    images: [{ url: "/images/gorilla.jpg", alt: "Mountain gorilla in Bwindi, Uganda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lubstar Safaris",
    description,
    images: ["/images/gorilla.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  slogan: SLOGAN,
  image: `${SITE_URL}/images/gorilla.jpg`,
  areaServed: "Uganda",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
