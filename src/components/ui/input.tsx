import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  addon?: string
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, addon, ...props }, ref) => {
    if (addon) {
        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        "pl-7",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">{addon}</div>
            </div>
        )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
