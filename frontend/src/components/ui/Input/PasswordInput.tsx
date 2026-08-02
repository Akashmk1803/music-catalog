import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input, InputProps } from "./Input"
import { IconButton } from "../Button"

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          ref={ref}
          {...props}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <IconButton
            type="button"
            icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onClick={() => setShowPassword(!showPassword)}
            className="text-on-surface-variant hover:text-on-surface"
            aria-label={showPassword ? "Hide password" : "Show password"}
          />
        </div>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
