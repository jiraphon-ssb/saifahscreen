import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import LineIcon from '../icons/line-icon';
import TiktokIcon from '../icons/tiktok-icon';
import { Separator } from '../ui/separator';

const socialLinks = [
    { href: "https://www.facebook.com/saifahscreen", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/saifahscreen", icon: Instagram, label: "Instagram" },
    { href: "https://www.tiktok.com/@saifahscreen", icon: TiktokIcon, label: "TikTok" },
    { href: "https://www.youtube.com/channel/UC2Urszk8yRvR5aoIaab8sKg", icon: Youtube, label: "YouTube" },
    { href: "https://lin.ee/gxqYXSY", icon: LineIcon, label: "LINE" },
];

const mainLinks = [
    { href: "/portfolio", label: "ผลงาน" },
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/design", label: "เริ่มออกแบบ" },
    { href: "/how-to-design", label: "วิธีออกแบบ" },
    { href: "/contact", label: "ติดต่อเรา" },
    { href: "/faq", label: "คำถามที่พบบ่อย" },
];


export default function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/2 pointer-events-none" />
      <div className="container mx-auto px-4 py-10 md:px-6 relative z-10">

        <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-4">
                <img
                    src="/images/logo-footer.png"
                    alt="SAIFAH Footer Logo"
                    className="h-12 w-auto transition-transform hover:scale-105"
                />
            </Link>
            <p className="max-w-md text-sm text-muted-foreground">
              พลังแห่งสายฟ้าในงานสกรีนและเสื้อ Print-on-Demand สร้างสรรค์เสื้อที่เป็นเอกลักษณ์ของคุณได้อย่างง่ายดาย
            </p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 my-8">
            {mainLinks.map((link) => (
                <Link 
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:-translate-y-0.5"
                    prefetch={false}
                >
                    {link.label}
                </Link>
            ))}
        </div>

        <Separator className="my-8 bg-border/50" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-xs text-muted-foreground/80 text-center md:text-left order-2 md:order-1">
                © {new Date().getFullYear()} SAIFAH Screen. All rights reserved.
            </p>
            <div className="flex items-center gap-5 order-1 md:order-2">
                {socialLinks.map((social) => (
                    <Link 
                        key={social.label}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300"
                        prefetch={false}
                    >
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.label}</span>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
