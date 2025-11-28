# Router Utilities

Утилиты для работы с роутингом приложения.

## Файлы

### `get-first-accessible-route.ts`
Определяет первый доступный роут для пользователя.

```typescript
import { getFirstAccessibleRoute } from '@rupoi/app/lib'

// При редиректе после логина
const firstRoute = getFirstAccessibleRoute(userStore.roles)
router.push(firstRoute)
```

## Приоритет роутов

Функция проверяет доступ в следующем порядке:
1. Личные дела
2. Заказы
3. Накладные
4. Склад
5. Диспетчер
6. Цех
7. Главный врач
8. Реестры
9. Отчеты

Если ни один роут недоступен, возвращается `/forbidden`.

## Обновление

При добавлении нового модуля обновите массив `routePriority` в этом файле.

## Связанные файлы

- `app/router/routes.ts` - использует эту функцию для редиректа с Home
- `app/router/router.ts` - navigation guard логика

