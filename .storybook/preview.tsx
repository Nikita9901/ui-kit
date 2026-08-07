import type { Preview } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"
import theme from "./theme"

import "../src/styles/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { theme },
    a11y: {
      test: "error",
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => (
      <div className="bg-background text-foreground flex rounded-lg px-12 py-6">
        <Story />
      </div>
    ),
  ],
}

export default preview
