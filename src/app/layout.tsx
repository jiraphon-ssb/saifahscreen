import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

export const metadata: Metadata = {
  title: {
    default:
      "SAIFAH Design Studio - สกรีนเสื้อด่วน สกรีนเสื้อ DTF คุณภาพพรีเมียม",
    template: "%s | SAIFAH Design Studio",
  },
  description:
    "โรงสกรีนเสื้อคุณภาพสูง ออกแบบเสื้อของคุณเองได้ทันที สกรีนเสื้อด่วน สกรีนเสื้อ DTF ราคาคุ้มค่า เริ่มต้นไม่มีขั้นต่ำ ส่งทั่วประเทศไทย",
  keywords: [
    "สกรีนเสื้อด่วน",
    "สกรีนเสื้อ DTF",
    "ออกแเบบเสื้อเอง",
    "โรงสกรีนเสื้อ",
    "SAIFAH Studio",
    "สกรีนเสื้อคุณภาพ",
  ],
  authors: [{ name: "SAIFAH Studio" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://saifahscreen.com",
    siteName: "SAIFAH Design Studio",
    title: "SAIFAH Design Studio - สกรีนเสื้อด่วน สกรีนเสื้อ DTF",
    description:
      "สกรีนเสื้อคุณภาพสูง ออกแบบเสื้อของคุณเอง สกรีนเสื้อด่วน สกรีนเสื้อ DTF ราคาคุ้มค่า",
    images: [
      {
        url: "/images/carousel-desktop-1.png",
        width: 1200,
        height: 630,
        alt: "SAIFAH Design Studio - สกรีนเสื้อด่วน",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAIFAH Design Studio - สกรีนเสื้อด่วน",
    description:
      "สกรีนเสื้อคุณภาพสูง ออกแบบเสื้อของคุณเอง สกรีนเสื้อด่วน สกรีนเสื้อ DTF",
    images: ["/images/carousel-desktop-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SAIFAH Design Studio",
  image: "/images/mainlogo.png",
  "@id": "https://saifahscreen.com",
  url: "https://saifahscreen.com",
  telephone: "+66-XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "เลขที่ XXX",
    addressLocality: "Bangkok",
    postalCode: "10XXX",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://facebook.com/saifahscreen",
    "https://line.me/R/ti/p/@saifahscreen",
  ],
};

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          prompt.className,
          "min-h-screen bg-background antialiased flex flex-col",
        )}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
