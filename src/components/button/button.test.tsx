import { describe, expect, it } from "vitest"
import { userEvent } from "vitest/browser"
import { render } from "vitest-browser-react"
import "@/styles/globals.css"

import { Button } from "./button"

describe("Button", () => {
  it("changes background color on real hover", async () => {
    const screen = await render(<Button>Button</Button>)
    const button = screen.getByRole("button")

    const initial = getComputedStyle(button.element()).backgroundImage

    await userEvent.hover(button)

    await expect
      .poll(() => getComputedStyle(button.element()).backgroundImage)
      .not.toBe(initial)
  })
})
