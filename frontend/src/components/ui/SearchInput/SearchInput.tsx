import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  onEnter?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onEnter, placeholder = "Search...", ...props }, ref) => {
    return (
      <div className={cn("group relative flex items-center bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl transition-all duration-300 hover:bg-surface-container-high/40 focus-within:bg-surface-container-high/60 focus-within:border-primary/50 shadow-lg", className)}>
        <Search className="ml-6 text-primary" size={24} />
        <input
          type="text"
          ref={ref}
          className="w-full bg-transparent border-none py-4 px-6 font-headline-md text-[20px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              onEnter()
            }
          }}
          {...props}
        />
        <div className="mr-6 flex items-center gap-2">
          <span className="text-label-caps text-[10px] text-on-surface-variant opacity-40 uppercase tracking-[0.2em]">Press</span>
          <kbd className="bg-surface-container-highest px-2 py-1 rounded font-data-md text-[12px] text-primary">Enter</kbd>
        </div>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"
