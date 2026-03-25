import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

export default function LineIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path d="M16.979 13.919H15.06v-3.84h1.92v3.84zm-5.761 0H9.298V8.16h1.92v5.76zm-3.84 0H5.458v-3.84h1.92v3.84zM19.82 4H4.18C2.98 4 2 4.898 2 6.002v10.08c0 1.104.98 1.92 2.18 1.92h7.02l2.88 2.88 2.88-2.88h3.86c1.2 0 2.18-.816 2.18-1.92V6.002C22 4.898 21.02 4 19.82 4z" />
    </svg>
  );
}
