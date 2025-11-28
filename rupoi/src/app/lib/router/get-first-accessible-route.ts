import type { UserRole } from '@rupoi/shared/constant'
import { RouteConfig } from '@rupoi/shared/constant'
import { hasAnyRole } from '@rupoi/shared/lib'

/**
 * Определяет первый доступный роут для пользователя на основе его ролей
 * 
 * Роуты проверяются в порядке приоритета:
 * 1. Личные дела
 * 2. Заказы
 * 3. Накладные
 * 4. Склад
 * 5. Диспетчер
 * 6. Цех
 * 7. Главный врач
 * 8. Реестры
 * 9. Отчеты
 * 
 * @param userRoles - массив ролей пользователя
 * @returns путь к первому доступному роуту или '/forbidden' если нет доступа
 * 
 * @example
 * ```ts
 * const firstRoute = getFirstAccessibleRoute(userStore.roles)
 * router.push(firstRoute)
 * ```
 */
export function getFirstAccessibleRoute(userRoles: UserRole[]): string {
  // Порядок приоритета страниц
  const routePriority = [
    // Личные дела
    {
      path: RouteConfig.Person.list.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_REGISTRATION', 'RUPOI_MEDICAL_DEPARTMENT', 'RUPOI_CHIEF_DOCTOR', 'RUPOI_DISPATCHER'] as UserRole[]
    },
    // Заказы
    {
      path: RouteConfig.Order.prosthesis.list.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_MEDICAL_DEPARTMENT', 'RUPOI_CHIEF_DOCTOR', 'RUPOI_DISPATCHER', 'RUPOI_WORKSHOP'] as UserRole[]
    },
    // Накладные
    {
      path: RouteConfig.Invoice.prosthesis.list.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_MEDICAL_DEPARTMENT', 'RUPOI_CHIEF_DOCTOR', 'RUPOI_WAREHOUSE', 'RUPOI_WORKSHOP'] as UserRole[]
    },
    // Склад
    {
      path: RouteConfig.Warehouse.index.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_WAREHOUSE'] as UserRole[]
    },
    // Диспетчер
    {
      path: RouteConfig.Dispatcher.index.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_DISPATCHER'] as UserRole[]
    },
    // Цех
    {
      path: RouteConfig.Workshop.index.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_DISPATCHER'] as UserRole[]
    },
    // Главный врач
    {
      path: RouteConfig.ChiefDoctor.index.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_CHIEF_DOCTOR'] as UserRole[]
    },
    // Реестры
    {
      path: RouteConfig.WorkshopRegistry.list.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_DISPATCHER'] as UserRole[]
    },
    // Отчеты (доступны всем)
    {
      path: RouteConfig.Reports.index.path,
      roles: ['RUPOI_ADMINISTRATOR', 'RUPOI_REGISTRATION', 'RUPOI_MEDICAL_DEPARTMENT', 'RUPOI_CHIEF_DOCTOR', 'RUPOI_DISPATCHER', 'RUPOI_WORKSHOP', 'RUPOI_WAREHOUSE'] as UserRole[]
    },
  ]

  // Ищем первую доступную страницу
  for (const route of routePriority) {
    if (hasAnyRole(userRoles, route.roles)) {
      return route.path
    }
  }

  // Если ничего не найдено, отправляем на Forbidden
  return '/forbidden'
}

