"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  [key: string]: any;
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  ...props
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "opacity-0", // Start hidden
        isInView && "animate-fade-in-up", // Apply animation when in view
        className,
      )}
      style={isInView ? { animationDelay: `${delay}ms` } : {}}
      {...props}
    >
      {children}
    </Tag>
  );
}
