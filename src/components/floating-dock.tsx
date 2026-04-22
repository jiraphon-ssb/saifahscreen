"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Paintbrush2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FloatingDock() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  // Don't show on design tool page to not obstruct workspace
  const isDesignPage = pathname?.startsWith("/design");

  useEffect(() => {
    // Delay initial entrance for a wow effect
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isDesignPage) return null;

  // Render the Line SVG cleanly
  const LineIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] z-10 relative drop-shadow">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{
            opacity: scrollDirection === "down" && !isMinimized ? 0 : 1,
            y: scrollDirection === "down" && !isMinimized ? 120 : 0,
            scale: 1,
            pointerEvents: scrollDirection === "down" && !isMinimized ? "none" : "auto",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 flex flex-col items-end"
        >
          {/* Ambient Glow */}
          <div className="absolute -z-10 w-[120%] h-[120%] bottom-[-20%] right-[-10%] bg-purple-500/15 blur-[40px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isMinimized ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "relative flex flex-col gap-3 p-4 rounded-2xl w-[90vw] sm:w-[320px]",
                  "bg-white/80 dark:bg-black/40",
                  "backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                )}
              >
                {/* Close/Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white shadow-sm hover:scale-110 transition-transform z-10"
                >
                  <X size={14} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-white/10">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    พร้อมสกรีนรึยัง? เริ่มเลย ⚡️
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5">
                  {/* Design CTA */}
                  <Link href="/design" className="flex-1 group relative outline-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 opacity-100 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]" />
                    <div className="relative flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl overflow-hidden text-white font-medium text-[13px] tracking-wide transform transition-transform group-active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <Paintbrush2 size={16} className="z-10 drop-shadow-sm" />
                      <span className="z-10 drop-shadow-sm text-center line-clamp-1">เริ่มออกแบบ</span>
                    </div>
                  </Link>

                  {/* Line CTA */}
                  <a
                    href="https://line.me/R/ti/p/@saifahscreen"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 group relative outline-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00c300] to-[#009e00] opacity-100 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,195,0,0.4)]" />
                    <div className="relative flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl overflow-hidden text-white font-medium text-[13px] tracking-wide transform transition-transform group-active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <LineIcon />
                      <span className="z-10 drop-shadow-sm text-center">ปรึกษาแอดมิน</span>
                      
                      {/* Pulse Badge */}
                      <span className="absolute top-1 right-1 lg:top-1.5 lg:right-2.5 flex h-2.5 w-2.5 z-20">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
                      </span>
                    </div>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="minimized"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setIsMinimized(false)}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md z-50 text-purple-600 dark:text-purple-400"
              >
                <MessageCircle size={24} />
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-[2px] border-white dark:border-zinc-900"></span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
