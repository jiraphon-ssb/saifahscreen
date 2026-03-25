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
        <div className="hidden md:block bg-muted/40 border-b border-border/50 transition-colors">
            <div className="container flex items-center justify-between h-10 text-xs text-muted-foreground font-medium">
                <p className="tracking-wide">SAIFAH: บริการออกแบบและผลิตเสื้อครบวงจร</p>
                <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                        <Link 
                            key={social.label}
                            href={social.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300" 
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
      className="w-full bg-background/80 backdrop-blur-xl z-50 sticky top-0 border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-500 supports-[backdrop-filter]:bg-background/60"
    >
      <TopHeader />
      <div className="container flex h-20 items-center">
          {/* --- Desktop Layout --- */}
          <div className="hidden md:flex flex-1 items-center justify-between gap-8">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Logo className="h-10 w-auto" />
                    <Separator orientation="vertical" className="h-8" />
                </Link>
                <p className="ml-2 text-sm text-muted-foreground whitespace-nowrap">Welcome to SAIFAH Screen</p>
                
                <div className="ml-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              className="text-xs font-bold group bg-primary data-[state=open]:bg-primary/90 text-primary-foreground h-8"
                            >
                                <Menu className="mr-1.5 h-3 w-3" />
                                Browse Categories
                                <ChevronDown className="ml-1.5 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {categories.map((cat) => (
                            <DropdownMenuItem key={cat.label} asChild>
                                <Link href={cat.href}>{cat.label}</Link>
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-x-2 text-sm font-medium">
                {navLinks.map(link => (
                    <Button key={link.href} variant="ghost" asChild className="text-base font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 data-[state=open]:bg-primary/10 rounded-full px-5">
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </Button>
                ))}
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-base font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 data-[state=open]:bg-primary/10 rounded-full px-5">
                            ข้อมูลเพิ่มเติม
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl shadow-xl border-border/50 bg-background/95 backdrop-blur-xl">
                        {moreLinks.map(link => (
                            <DropdownMenuItem key={link.href} asChild className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer transition-colors"><Link href={link.href}>{link.label}</Link></DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="default" asChild className="text-base font-semibold transition-all duration-300 rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 ml-2">
                    <Link href="/contact">
                        ติดต่อเรา
                    </Link>
                </Button>
            </nav>
          </div>

        {/* --- Mobile Layout --- */}
        <div className="flex w-full items-center justify-between md:hidden">
            <div className="flex-1 flex justify-start">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-10">
                          <Menu className="h-6 w-6" />
                          <span className="sr-only">Toggle Menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="pr-0 bg-background w-[80vw] max-w-xs">
                      <SheetHeader className="sr-only">
                          <SheetTitle>Menu</SheetTitle>
                          <SheetDescription>Main navigation menu</SheetDescription>
                      </SheetHeader>
                      <Link href="/" className="px-6 flex items-center mb-8 mt-6">
                          <Logo className="h-10 w-auto" />
                      </Link>
                      <div className="flex flex-col space-y-4 px-6">
                          <p className="font-bold text-primary">MENU</p>
                          {[...navLinks, ...moreLinks].map(({ href, label }) => (
                          <Link
                              key={label}
                              href={href}
                              className="text-lg transition-colors hover:text-primary"
                          >
                              {label}
                          </Link>
                          ))}
                          <Link href="/contact" className="text-lg transition-colors hover:text-primary">
                              ติดต่อเรา
                          </Link>
                          <Separator className="my-4"/>
                          <p className="font-bold text-primary">CATEGORIES</p>
                          {categories.map(({ href, label }) => (
                          <Link
                              key={label}
                              href={href}
                              className="text-lg transition-colors hover:text-primary"
                          >
                              {label}
                          </Link>
                          ))}
                      </div>
                  </SheetContent>
              </Sheet>
            </div>

            <Link href="/" className="flex-shrink-0">
                <Logo className="h-10 w-auto" />
            </Link>

            <div className="flex-1 flex justify-end items-center">
                {/* Auth button could go here if re-enabled */}
            </div>
        </div>
      </div>
    </header>
  );
}
