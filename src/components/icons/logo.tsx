import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt">;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <Image
      src="/images/mainlogo.png"
      alt="SAIFAH Logo"
      width={150}
      height={50}
      className={cn(className)}
      {...props}
    />
  );
}
