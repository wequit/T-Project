import type { ID } from '@rupoi/shared/model'
import type { OrderStatus } from '@rupoi/shared/constant'
import type { OrderKind } from '../constant'

/**
 * Данные для изменения статуса заказа
 */
export interface OrderStatusChangeData {
  newStatus: OrderStatus
  comment: string
}

/**
 * Props для атомарного компонента OrderChangeStatus
 */
export interface OrderChangeStatusProps {
  orderId: ID
  orderKind: OrderKind
  targetStatus: OrderStatus
  disabled?: boolean
  iconOnly?: boolean
}

/**
 * Props для контейнера OrderChangeStatusControl
 */
export interface OrderChangeStatusControlProps {
  orderId: ID
  orderKind: OrderKind
  currentStatus: OrderStatus
  disabled?: boolean
  iconOnly?: boolean
}

/**
 * Конфигурация для кнопки изменения статуса
 */
export interface StatusButtonConfig {
  status: OrderStatus
  label: string
  color: 'success' | 'secondary' | 'info' | 'primary' | 'warning' | 'dark' | 'danger'
  icon: string
  order: number
}
