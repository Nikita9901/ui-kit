Тестовое задание Security Lab - Mini UI-Kit

# UI-Kit

Мини UI-kit: `Button` и `Input`, собранные на [shadcn/ui](https://ui.shadcn.com/) + [base-ui](https://base-ui.com/) примитивах.

## Установка

```bash
pnpm add ui-kit
```

Peer-зависимости — `react` и `react-dom` версии 19+.

## Использование

Импорт компонентов:

```tsx
import { Button, Input } from "ui-kit"
// или
import { Button } from "ui-kit/button"
import { Input } from "ui-kit/input"
```

**Подключение стилей:**

```ts
import "ui-kit/styles.css"
```

Собственный Tailwind в проекте разработчика для этого не обязателен.

### Пример

```tsx
import { Button, Input } from "ui-kit"
import "ui-kit/styles.css"

function LoginForm() {
  return (
    <form>
      <Input placeholder="Email" />
      <Button type="submit">Войти</Button>
    </form>
  )
}
```

### С react-hook-form

`Input` — обычный контролируемый инпут, работает с `register()`:

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input, Button } from "ui-kit"

const schema = z.object({ email: z.email() })

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input {...register("email")} error={!!errors.email} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

> Для будущих компонентов, не основанных на нативных инпутах (например `Select`, `Checkbox`), напрямую `register()` работать не будет. Такие компоненты нужно оборачивать через `Controller` из `react-hook-form`.

## Темизация

Светлая и тёмная темы переключаются классом `.dark` на любом родительском элементе.

## Состояния компонентов

Оба компонента поддерживают `default`, `hover`, `focus`, `error` (через проп `error`) и `disabled` состояния.

## Разработка

```bash
pnpm install
pnpm storybook        # локальная документация компонентов
pnpm test             # vitest (unit + storybook interaction tests)
pnpm test:coverage
pnpm lint
pnpm typecheck
pnpm build             # собирает dist/ через tsup + tailwind cli
```

## Версионирование

Используется [changesets](https://github.com/changesets/changesets). Перед PR с изменением компонентов:

```bash
pnpm changeset
```
