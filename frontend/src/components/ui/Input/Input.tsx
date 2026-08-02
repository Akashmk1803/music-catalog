import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-transparent border-b border-white/10 py-2 font-body-md text-[14px] text-on-surface outline-none transition-colors focus:border-primary disabled:opacity-50",
          error && "border-error focus:border-error text-error placeholder:text-error/50",
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
