"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingDock from "@/components/floating-dock";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDesignPage = pathname.startsWith("/design");

  return (
    <>
      {!isDesignPage && <Header />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isDesignPage && <Footer />}
      <FloatingDock />
    </>
  );
}
