import type { ComponentProps } from "react"
import { Input as ShadcnInput } from "@/shared/ui/shadcn/input"
import { cn } from "@/shared/ui/shadcn/lib/utils"

export interface InputProps extends ComponentProps<typeof ShadcnInput> {
  error?: boolean
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <ShadcnInput
      aria-invalid={error ? true : undefined}
      className={cn("hover:border-ring/60", className)}
      {...props}
    />
  )
}
