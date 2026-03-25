import { cn } from "@/lib/utils";

type LogoProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      src="https://img5.pic.in.th/file/secure-sv1/Asset-161eacceec1b30d377f.png"
      alt="SAIFAH Logo"
      className={cn(className)}
      {...props}
    />
  );
}
