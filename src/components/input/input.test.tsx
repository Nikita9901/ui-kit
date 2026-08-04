import { describe, expect, it } from "vitest"
import { userEvent } from "vitest/browser"
import { render } from "vitest-browser-react"

import "@/styles/globals.css"

import { Input } from "./input"

describe("Input", () => {
  it("changes border color on real hover", async () => {
    const screen = await render(<Input placeholder="Email" />)
    const input = screen.getByRole("textbox")

    const initial = getComputedStyle(input.element()).borderColor

    await userEvent.hover(input)

    await expect
      .poll(() => getComputedStyle(input.element()).borderColor)
      .not.toBe(initial)
  })
})
