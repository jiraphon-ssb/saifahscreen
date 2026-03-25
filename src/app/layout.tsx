
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";
import { allFonts } from "@/lib/fonts";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export const metadata: Metadata = {
  title: {
    default: 'SAIFAH Design Studio',
    template: '%s | SAIFAH Design Studio',
  },
  description: "พลังแห่งสายฟ้าในงานสกรีนและเสื้อ Print-on-Demand",
};

// Function to generate the Google Fonts URL
const createGoogleFontsUrl = () => {
  const fontFamilies = allFonts.map(font => {
    // Assuming font names are suitable for URL, e.g., "Space Grotesk"
    const fontName = font.name.replace(/ /g, '+');
    // Common weights, can be adjusted
    const weights = [300, 400, 500, 700, 900].join(',');
    return `family=${fontName}:wght@${weights}`;
  });
  
  const baseUrl = "https://fonts.googleapis.com/css2?";
  return `${baseUrl}${fontFamilies.join('&')}&display=swap`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleFontsUrl = createGoogleFontsUrl();

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontsUrl} rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased flex flex-col"
        )}
      >
        <FirebaseClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
