import type { ComponentProps } from "react"
import { Input as ShadcnInput } from "@/shared/ui/shadcn/input"

export interface InputProps extends ComponentProps<typeof ShadcnInput> {
  error?: boolean
}

export function Input({ error, ...props }: InputProps) {
  return <ShadcnInput aria-invalid={error ? true : undefined} {...props} />
}
