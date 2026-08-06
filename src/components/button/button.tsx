import type { ComponentProps } from "react"
import { Button as ShadcnButton } from "@/shared/ui/shadcn/button"
import { cn } from "@/shared/ui/shadcn/lib/utils"

export interface ButtonProps extends ComponentProps<typeof ShadcnButton> {
  error?: boolean
}

const sizeClassNames: Partial<
  Record<NonNullable<ButtonProps["size"]>, string>
> = {
  xs: "h-6 px-2 text-xs",
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-lg",
}

export function Button({
  error,
  variant,
  className,
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      variant={variant}
      aria-invalid={error ? true : undefined}
      size={size}
      className={cn(
        (variant === undefined || variant === "default") &&
          "from-button-gradient-from to-button-gradient-to hover:from-button-gradient-from/90 hover:to-button-gradient-to/90 border-transparent bg-transparent bg-gradient-to-r text-white hover:bg-transparent",
        size && sizeClassNames[size],
        className
      )}
      {...props}
    />
  )
}
