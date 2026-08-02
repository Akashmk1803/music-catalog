import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 font-label-caps text-[9px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-surface-container-highest text-on-surface border border-transparent",
        primary: "bg-primary/20 text-primary border border-primary/20",
        success: "bg-success/20 text-success border border-success/20",
        warning: "bg-warning/20 text-warning border border-warning/20",
        error: "bg-error/20 text-error border border-error/20",
        outline: "text-on-surface-variant border border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
