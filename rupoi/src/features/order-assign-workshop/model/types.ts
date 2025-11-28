import type { ID } from '@rupoi/shared/model'
import type { OrderKind } from '@rupoi/features/order-change-status'

/**
 * Данные формы назначения мастерской
 */
export interface AssignWorkshopFormData {
  workshopId: number | null
  deadline: string | null
}

/**
 * Props для модалки назначения мастерской
 */
export interface OrderAssignWorkshopModalProps {
  /** ID заказа */
  orderId: ID
  /** Тип заказа */
  orderKind: OrderKind
  /** Открыта ли модалка */
  isOpen: boolean
}

/**
 * События модалки назначения мастерской
 */
export interface OrderAssignWorkshopModalEmits {
  /** Успешное назначение мастерской */
  (event: 'success'): void
  /** Отмена */
  (event: 'cancel'): void
  /** Изменение видимости модалки */
  (event: 'update:isOpen', value: boolean): void
}

