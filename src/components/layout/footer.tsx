"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone } from "lucide-react";
import LineIcon from "../icons/line-icon";
import TiktokIcon from "../icons/tiktok-icon";
import { Separator } from "../ui/separator";
import Logo from "../icons/logo";
import { Button } from "../ui/button";

const socialLinks = [
  {
    href: "https://www.facebook.com/saifahscreen",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/saifahscreen",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@saifahscreen",
    icon: TiktokIcon,
    label: "TikTok",
  },
  {
    href: "https://www.youtube.com/channel/UC2Urszk8yRvR5aoIaab8sKg",
    icon: Youtube,
    label: "YouTube",
  },
  { href: "https://lin.ee/gxqYXSY", icon: LineIcon, label: "LINE" },
];

const mainLinks = [
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/design", label: "เริ่มออกแบบ" },
  { href: "/privileges", label: "สิทธิพิเศษ" },
  { href: "/how-to-design", label: "วิธีออกแบบ" },
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
];

export default function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="container mx-auto px-4 py-12 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-6 inline-block">
            <Logo className="h-16 w-auto transition-all duration-500 hover:scale-110 drop-shadow-xl" />
          </Link>
          <p className="max-w-md text-sm text-foreground/80 font-medium leading-relaxed">
            พลังแห่งสายฟ้าในงานสกรีนและเสื้อ Print-on-Demand
            สร้างสรรค์เสื้อที่เป็นเอกลักษณ์ของคุณได้อย่างง่ายดาย
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 my-10">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-all hover:-translate-y-1 hover:drop-shadow-lg"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Quick Contact Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span className="font-medium">093-974-2624</span>
          </div>
          <Link
            href="https://lin.ee/gxqYXSY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 hover:bg-green-500/10 hover:text-green-600 hover:border-green-500/50 transition-all"
            >
              <LineIcon className="h-4 w-4" />
              แชทผ่าน LINE
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">กรุงเทพฯ, ประเทศไทย</span>
          </div>
        </div>

        <Separator className="my-10 bg-border/50 shadow-sm" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-muted-foreground/80 text-center md:text-left order-2 md:order-1">
            © {new Date().getFullYear()} SAIFAH Screen. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-muted-foreground/80 hover:text-primary hover:bg-primary/10 hover:scale-125 transition-all duration-300"
                prefetch={false}
              >
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
