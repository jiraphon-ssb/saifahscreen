"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  LayoutGrid,
} from "lucide-react";
import Logo from "../icons/logo";
import LineIcon from "../icons/line-icon";
import TiktokIcon from "../icons/tiktok-icon";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  { href: "mailto:saifahprinting@gmail.com", icon: Mail, label: "Email" },
];

const categories = [
  { href: "/portfolio?category=company", label: "เสื้อบริษัท/องค์กร" },
  {
    href: "/portfolio?category=university",
    label: "เสื้อโรงเรียน/มหาวิทยาลัย",
  },
  { href: "/portfolio?category=event", label: "เสื้อกิจกรรม" },
  { href: "/portfolio?category=sme", label: "เสื้อธุรกิจSME" },
  { href: "/portfolio?category=other", label: "เสื้อดีไซน์อื่นๆ" },
];

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/design", label: "ออกแบบ" },
];

const moreLinks = [
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/privileges", label: "สิทธิพิเศษ" },
  { href: "/how-to-design", label: "วิธีออกแบบ" },
  { href: "/#decision-helper", label: "คำนวณราคา/ไซส์" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
];

const TOP_BAR_HEIGHT = 36;

function TopHeader() {
  return (
    <div className="hidden lg:block bg-secondary/50 border-b border-border/30 w-full">
      <div className="container flex items-center justify-between text-xs text-muted-foreground font-medium" style={{ height: TOP_BAR_HEIGHT }}>
        <p className="tracking-wide">
          SAIFAH: บริการออกแบบและผลิตเสื้อครบวงจร
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.slice(0, 4).map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
              prefetch={false}
            >
              <social.icon className="h-4 w-4" />
              <span className="sr-only">{social.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && scrollY > 20) return true;
            if (prev && scrollY < 5) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        top: isScrolled ? -TOP_BAR_HEIGHT : 0,
      }}
      className={`w-full z-50 sticky transition-[top,background-color,box-shadow] duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
          : "bg-background border-b border-border/30"
      }`}
    >
      <TopHeader />
      <div className="container flex h-16 items-center">
        <div className="hidden lg:flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Logo className="h-9 w-auto group-hover:scale-105 transition-transform" />
            </Link>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sm font-semibold gap-1.5 h-9 px-4 rounded-xl border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all shadow-sm group"
                >
                  <LayoutGrid className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  หมวดหมู่
                  <ChevronDown className="h-3 w-3 opacity-70 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 rounded-2xl shadow-xl border-border/50"
                align="start"
              >
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat.label}
                    asChild
                    className="cursor-pointer rounded-xl hover:bg-secondary"
                  >
                    <Link href={cat.href}>{cat.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <nav className="flex items-center gap-x-1">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className={`text-sm font-medium hover:bg-secondary/80 px-4 rounded-xl transition-all hover:scale-105 ${pathname === link.href ? "bg-primary/10 text-primary" : ""}`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </motion.div>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium hover:bg-secondary/80 px-4 rounded-xl transition-all"
                >
                  ข้อมูลเพิ่มเติม
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 rounded-2xl shadow-xl border-border/50">
                {moreLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    asChild
                    className="cursor-pointer rounded-xl hover:bg-secondary"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              className="text-sm font-semibold ml-4 rounded-full px-6 shadow-md hover:shadow-lg hover:scale-105 transition-all bg-primary hover:bg-primary/90"
            >
              <Link href="/contact">ติดต่อเรา</Link>
            </Button>
          </nav>
        </div>

        <div className="flex lg:hidden w-full items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl hover:bg-secondary"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] border-r border-border/50 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Main navigation menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <Link href="/" className="flex items-center gap-2 mb-8 mt-4">
                    <Logo className="h-9 w-auto" />
                  </Link>
                  <nav className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      เมนูหลัก
                    </p>
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={label}
                        href={href}
                        className="text-base font-medium px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      className="text-base font-medium px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      ติดต่อเรา
                    </Link>

                    <Separator className="my-4" />

                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      หมวดหมู่
                    </p>
                    {categories.map(({ href, label }) => (
                      <Link
                        key={label}
                        href={href}
                        className="text-sm text-muted-foreground px-4 py-2 rounded-xl hover:bg-secondary transition-colors"
                      >
                        {label}
                      </Link>
                    ))}

                    <Separator className="my-4" />

                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      ติดตามเรา
                    </p>
                    <div className="flex gap-3 px-2 mt-2">
                      {socialLinks.map((social) => (
                        <Link
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full hover:bg-secondary shadow-sm hover:scale-110 transition-all"
                        >
                          <social.icon className="h-5 w-5" />
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex-shrink-0 group">
            <Logo className="h-9 w-auto hover:scale-105 transition-transform" />
          </Link>

          <div className="flex-1 flex justify-end">
            <Button
              size="sm"
              asChild
              className="text-sm font-semibold rounded-full shadow-md"
            >
              <Link href="/contact">ติดต่อ</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
