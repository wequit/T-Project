import { OrderStatus } from '@rupoi/shared/constant'
import { UserRole } from '@rupoi/shared/constant'

/**
 * Допустимые переходы статусов для каждой роли
 * Структура: { роль: { текущий_статус: [доступные_следующие_статусы] } }
 */
export type StatusTransitions = Record<string, Record<string, OrderStatus[]>>

export const orderStatusTransitions: StatusTransitions = {
  [UserRole.ADMINISTRATOR]: {
    // Администратор может переводить из любого статуса в любой
    [OrderStatus.NEW]: [
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.UNDER_REVIEW]: [
      OrderStatus.NEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.APPROVED]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.WITH_DISPATCHER]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.IN_PRODUCTION]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.FOR_FITTING]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.READY]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.IN_WAREHOUSE,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.IN_WAREHOUSE]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.DELIVERED,
    ],
    [OrderStatus.DELIVERED]: [
      OrderStatus.NEW,
      OrderStatus.UNDER_REVIEW,
      OrderStatus.APPROVED,
      OrderStatus.WITH_DISPATCHER,
      OrderStatus.IN_PRODUCTION,
      OrderStatus.FOR_FITTING,
      OrderStatus.READY,
      OrderStatus.IN_WAREHOUSE,
    ],
  },
  [UserRole.MEDICAL_DEPARTMENT]: {
    [OrderStatus.NEW]: [OrderStatus.UNDER_REVIEW],
  },
  [UserRole.CHIEF_DOCTOR]: {
    [OrderStatus.UNDER_REVIEW]: [OrderStatus.APPROVED, OrderStatus.NEW],
  },
  [UserRole.DISPATCHER]: {
    [OrderStatus.APPROVED]: [OrderStatus.WITH_DISPATCHER],
    [OrderStatus.WITH_DISPATCHER]: [OrderStatus.IN_PRODUCTION],
    [OrderStatus.IN_PRODUCTION]: [OrderStatus.FOR_FITTING],
    [OrderStatus.FOR_FITTING]: [OrderStatus.READY],
  },
  // [UserRole.WORKSHOP]: {

  // },
  [UserRole.WAREHOUSE]: {
    [OrderStatus.READY]: [OrderStatus.IN_WAREHOUSE],
    [OrderStatus.IN_WAREHOUSE]: [OrderStatus.DELIVERED],
  },
}

/**
 * Проверяет, может ли пользователь с данными ролями изменить статус
 * @param currentStatus - текущий статус заказа
 * @param newStatus - целевой статус
 * @param userRoles - массив ролей пользователя
 * @returns true, если переход разрешен хотя бы одной из ролей
 */
export function canChangeStatus(
  currentStatus: OrderStatus,
  newStatus: OrderStatus,
  userRoles: UserRole[]
): boolean {
  // Если у пользователя нет ролей, доступ запрещен
  if (!userRoles || userRoles.length === 0) {
    return false
  }

  // Проверяем, есть ли у пользователя хотя бы одна роль, которая позволяет этот переход
  return userRoles.some(role => {
    const roleTransitions = orderStatusTransitions[role]
    if (!roleTransitions) {
      return false
    }

    const allowedStatuses = roleTransitions[currentStatus]
    if (!allowedStatuses) {
      return false
    }

    return allowedStatuses.includes(newStatus)
  })
}

/**
 * Получает список доступных статусов для перехода
 * @param currentStatus - текущий статус заказа
 * @param userRoles - массив ролей пользователя
 * @returns массив доступных статусов (объединение всех доступных статусов со всех ролей)
 */
export function getAvailableStatuses(
  currentStatus: OrderStatus,
  userRoles: UserRole[]
): OrderStatus[] {
  // Если у пользователя нет ролей, нет доступных статусов
  if (!userRoles || userRoles.length === 0) {
    return []
  }

  // Собираем все доступные статусы со всех ролей пользователя
  const availableStatusesSet = new Set<OrderStatus>()

  userRoles.forEach(role => {
    const roleTransitions = orderStatusTransitions[role]
    if (roleTransitions && roleTransitions[currentStatus]) {
      roleTransitions[currentStatus].forEach(status => {
        availableStatusesSet.add(status)
      })
    }
  })

  return Array.from(availableStatusesSet)
}

