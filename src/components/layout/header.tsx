'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, ChevronDown, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Logo from "../icons/logo";
import LineIcon from '../icons/line-icon';
import TiktokIcon from '../icons/tiktok-icon';
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const socialLinks = [
    { href: "https://www.facebook.com/saifahscreen", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/saifahscreen", icon: Instagram, label: "Instagram" },
    { href: "https://www.tiktok.com/@saifahscreen", icon: TiktokIcon, label: "TikTok" },
    { href: "https://www.youtube.com/channel/UC2Urszk8yRvR5aoIaab8sKg", icon: Youtube, label: "YouTube" },
    { href: "https://lin.ee/gxqYXSY", icon: LineIcon, label: "LINE" },
    { href: "mailto:saifahprinting@gmail.com", icon: Mail, label: "Email" },
];

const categories = [
    { href: "/portfolio?category=company", label: "เสื้อบริษัท/องค์กร" },
    { href: "/portfolio?category=organization", label: "เสื้อหน่วยงาน" },
    { href: "/portfolio?category=university", label: "เสื้อโรงเรียน/มหาวิทยาลัย" },
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

function TopHeader() {
    return (
        <div className="hidden lg:block bg-secondary/50 border-b border-border/30 transition-colors">
            <div className="container flex items-center justify-between h-9 text-xs text-muted-foreground font-medium">
                <p className="tracking-wide">SAIFAH: บริการออกแบบและผลิตเสื้อครบวงจร</p>
                <div className="flex items-center gap-3">
                    {socialLinks.slice(0, 4).map((social) => (
                        <Link 
                            key={social.label}
                            href={social.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-muted-foreground hover:text-primary transition-colors" 
                            prefetch={false}
                        >
                            <social.icon className="h-4 w-4" />
                            <span className="sr-only">{social.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Header() {
  return (
    <header
      className="w-full bg-background/95 backdrop-blur-md z-50 sticky top-0 border-b border-border/30 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300"
    >
      <TopHeader />
      <div className="container flex h-16 items-center">
          <div className="hidden lg:flex flex-1 items-center justify-between">
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Logo className="h-9 w-auto" />
                </Link>
                <Separator orientation="vertical" className="h-6" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-sm font-medium gap-1 h-9 px-3 hover:bg-secondary"
                        >
                            หมวดหมู่
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52" align="start">
                        {categories.map((cat) => (
                        <DropdownMenuItem key={cat.label} asChild className="cursor-pointer">
                            <Link href={cat.href}>{cat.label}</Link>
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <nav className="flex items-center gap-x-1">
                {navLinks.map(link => (
                    <Button key={link.href} variant="ghost" asChild className="text-sm font-medium hover:bg-secondary px-4">
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </Button>
                ))}
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-sm font-medium hover:bg-secondary px-4">
                            ข้อมูลเพิ่มเติม
                            <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        {moreLinks.map(link => (
                            <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                                <Link href={link.href}>{link.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button asChild className="text-sm font-medium ml-2">
                    <Link href="/contact">
                        ติดต่อเรา
                    </Link>
                </Button>
            </nav>
          </div>

        <div className="flex lg:hidden w-full items-center justify-between">
            <div className="flex-1 flex justify-start">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-10 h-10">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Toggle Menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                      <SheetHeader className="sr-only">
                          <SheetTitle>Menu</SheetTitle>
                          <SheetDescription>Main navigation menu</SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col h-full">
                          <Link href="/" className="flex items-center gap-2 mb-8 mt-4">
                              <Logo className="h-9 w-auto" />
                          </Link>
                          <nav className="flex flex-col gap-1">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">เมนูหลัก</p>
                              {navLinks.map(({ href, label }) => (
                              <Link
                                  key={label}
                                  href={href}
                                  className="text-base font-medium px-2 py-2 rounded-md hover:bg-secondary transition-colors"
                              >
                                  {label}
                              </Link>
                              ))}
                              <Link href="/contact" className="text-base font-medium px-2 py-2 rounded-md hover:bg-secondary transition-colors">
                                  ติดต่อเรา
                              </Link>
                              
                              <Separator className="my-4"/>
                              
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">หมวดหมู่</p>
                              {categories.map(({ href, label }) => (
                              <Link
                                  key={label}
                                  href={href}
                                  className="text-sm text-muted-foreground px-2 py-2 rounded-md hover:bg-secondary transition-colors"
                              >
                                  {label}
                              </Link>
                              ))}
                              
                              <Separator className="my-4"/>
                              
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">ติดตามเรา</p>
                              <div className="flex gap-3 px-2">
                                  {socialLinks.map((social) => (
                                      <Link 
                                          key={social.label}
                                          href={social.href} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="p-2 rounded-full hover:bg-secondary transition-colors"
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

            <Link href="/" className="flex-shrink-0">
                <Logo className="h-9 w-auto" />
            </Link>

            <div className="flex-1 flex justify-end">
                <Button variant="ghost" size="sm" asChild className="text-sm font-medium">
                    <Link href="/contact">
                        ติดต่อ
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
