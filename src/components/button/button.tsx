import type { ComponentProps } from "react"
import { Button as ShadcnButton } from "@/shared/ui/shadcn/button"

export interface ButtonProps extends ComponentProps<typeof ShadcnButton> {
  error?: boolean
}

export function Button({ error, ...props }: ButtonProps) {
  return <ShadcnButton aria-invalid={error ? true : undefined} {...props} />
}
