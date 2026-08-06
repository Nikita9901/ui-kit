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
      className={cn(
        "border-input hover:border-input-focus-ring/60 focus-visible:border-input-focus-ring/60 bg-input-background dark:bg-input-background h-12 rounded-lg border px-4 py-3 text-base outline-none focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}
