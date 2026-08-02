import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-label-caps uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-container",
        secondary: "bg-surface-container-high hover:bg-surface-container-highest text-on-surface",
        outline: "border border-white/10 bg-transparent hover:bg-surface-container-low text-on-surface hover:border-white/20",
        ghost: "hover:bg-surface-container-high/40 text-on-surface-variant hover:text-on-surface",
        danger: "bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20",
        dangerSolid: "bg-error text-on-error hover:opacity-90",
      },
      size: {
        sm: "h-8 px-4 text-[9px]",
        default: "h-10 px-6 text-[10px]",
        lg: "h-12 px-8 text-[11px]",
        icon: "h-10 w-10 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <Button
        className={cn("w-10 h-10 p-0 rounded-full", className)}
        size="icon"
        ref={ref}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)
IconButton.displayName = "IconButton"

export { Button, IconButton, buttonVariants }
