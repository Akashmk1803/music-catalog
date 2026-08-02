import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { VariantProps, cva } from "class-variance-authority"

const spinnerVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}
