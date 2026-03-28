import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

export const metadata: Metadata = {
  title: {
    default: 'SAIFAH Design Studio',
    template: '%s | SAIFAH Design Studio',
  },
  description: "ออกแบบเสื้อของคุณเอง สกรีนคุณภาพสูง ราคาคุ้มค่า",
};

const prompt = Prompt({ 
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          prompt.className,
          "min-h-screen bg-background antialiased flex flex-col"
        )}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
