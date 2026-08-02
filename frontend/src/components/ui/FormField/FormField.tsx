import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  htmlFor?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, htmlFor, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2 w-full", className)} ref={ref} {...props}>
        <label htmlFor={htmlFor} className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-[0.2em]">
          {label}
        </label>
        {children}
        {error && <span className="text-error text-[12px] mt-1">{error}</span>}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField as default }
