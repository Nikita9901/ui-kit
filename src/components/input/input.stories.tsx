import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within, waitFor } from "storybook/test"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "./input"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Enter text...",
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Enter text...")

    await userEvent.click(input)

    await expect(input).toHaveFocus()
  },
}

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Enter text...")

    await userEvent.type(input, "Hello world!")

    await expect(input).toHaveValue("Hello world!")
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Enter text...")

    await expect(input).toHaveAttribute("aria-invalid", "true")
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Enter text...")

    await expect(input).toBeDisabled()
    await expect(input).toHaveStyle({ pointerEvents: "none" })
  },
}

const schema = z.object({
  email: z.email("Invalid email"),
})

type FormValues = z.infer<typeof schema>

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  return (
    <form
      onSubmit={handleSubmit(() => {
        reset()
      })}
      className="flex w-64 flex-col gap-1"
    >
      <Input
        {...register("email")}
        placeholder={"Email"}
        error={!!errors.email}
      />
      {errors.email && (
        <span className="text-destructive text-sm">{errors.email.message}</span>
      )}
      <button type="submit" className="mt-2 text-sm underline">
        Submit
      </button>
    </form>
  )
}

export const WithReactHookForm: Story = {
  render: () => <LoginForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const submitButton = canvas.getByRole("button", { name: "Submit" })
    const input = canvas.getByPlaceholderText("Email")

    // empty -> invalid
    await userEvent.click(submitButton)
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(canvas.getByText("Invalid email")).toBeInTheDocument()

    // wrong format -> still invalid
    await userEvent.clear(input)
    await userEvent.type(input, "testing")
    await userEvent.click(submitButton)
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(canvas.getByText("Invalid email")).toBeInTheDocument()

    // valid -> success, form resets
    await userEvent.clear(input)
    await userEvent.type(input, "testing@gmail.com")
    await userEvent.click(submitButton)
    await waitFor(() => {
      expect(input).not.toHaveAttribute("aria-invalid")
      expect(canvas.queryByText("Invalid email")).not.toBeInTheDocument()
    })
    await expect(input).toHaveValue("")
  },
}
