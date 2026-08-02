import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ className, icon: Icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn("w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-white/5 shadow-lg", className)}
      {...props}
    >
      {Icon && (
        <div className="relative mb-8">
          <Icon className="text-on-surface-variant/20 w-24 h-24" strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
          </div>
        </div>
      )}
      <h3 className="font-headline-md text-[24px] text-on-surface mb-4">{title}</h3>
      {description && (
        <p className="font-body-lg text-[16px] text-on-surface-variant max-w-lg mx-auto leading-relaxed mb-8">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
