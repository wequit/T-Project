import { OrderStatus } from '@rupoi/shared/constant'
import type { StatusButtonConfig } from '../model/types'

/**
 * Конфигурация внешнего вида кнопок для каждого статуса
 */
export const statusButtonConfigs: Record<OrderStatus, StatusButtonConfig> = {
  [OrderStatus.NEW]: {
    status: OrderStatus.NEW,
    label: 'На доработку',
    color: 'secondary',
    icon: 'ni-bold-right',
    order: 0,
  },
  [OrderStatus.UNDER_REVIEW]: {
    status: OrderStatus.UNDER_REVIEW,
    label: 'Отправить на согласование',
    color: 'info',
    icon: 'ni-collection',
    order: 1,
  },
  [OrderStatus.APPROVED]: {
    status: OrderStatus.APPROVED,
    label: 'Одобрить',
    color: 'success',
    icon: 'ni-check-bold',
    order: 2,
  },
  [OrderStatus.WITH_DISPATCHER]: {
    status: OrderStatus.WITH_DISPATCHER,
    label: 'Отправить диспетчеру',
    color: 'primary',
    icon: 'ni-badge',
    order: 3,
  },
  [OrderStatus.IN_PRODUCTION]: {
    status: OrderStatus.IN_PRODUCTION,
    label: 'Отправить в производство',
    color: 'warning',
    icon: 'ni-settings',
    order: 4,
  },
  [OrderStatus.FOR_FITTING]: {
    status: OrderStatus.FOR_FITTING,
    label: 'Отправить на примерку',
    color: 'info',
    icon: 'ni-ruler-pencil',
    order: 5,
  },
  [OrderStatus.READY]: {
    status: OrderStatus.READY,
    label: 'Готово',
    color: 'success',
    icon: 'ni-like-2',
    order: 6,
  },
  [OrderStatus.IN_WAREHOUSE]: {
    status: OrderStatus.IN_WAREHOUSE,
    label: 'Принять на склад',
    color: 'dark',
    icon: 'ni-box-2',
    order: 7,
  },
  [OrderStatus.DELIVERED]: {
    status: OrderStatus.DELIVERED,
    label: 'Выдать',
    color: 'success',
    icon: 'ni-delivery-fast',
    order: 8,
  },
}

