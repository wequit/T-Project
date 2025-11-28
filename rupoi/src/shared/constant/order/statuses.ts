export enum OrderStatus {
  NEW = "NEW",                    // Новый
  UNDER_REVIEW = "UNDER_REVIEW",  // На согласовании
  APPROVED = "APPROVED",          // Одобрен
  WITH_DISPATCHER = "WITH_DISPATCHER", // У диспетчера
  IN_PRODUCTION = "IN_PRODUCTION", // В производстве
  FOR_FITTING = "FOR_FITTING",    // На примерке
  READY = "READY",               // Готов
  IN_WAREHOUSE = "IN_WAREHOUSE", // На складе
  DELIVERED = "DELIVERED"        // Выдан
}

export const orderStatuses = Object.values(OrderStatus)

export const orderStatusOptions = [
  { label: 'Новый', value: OrderStatus.NEW },
  { label: 'На согласовании', value: OrderStatus.UNDER_REVIEW },
  { label: 'Одобрен', value: OrderStatus.APPROVED },
  { label: 'У диспетчера', value: OrderStatus.WITH_DISPATCHER },
  { label: 'В производстве', value: OrderStatus.IN_PRODUCTION },
  { label: 'На примерке', value: OrderStatus.FOR_FITTING },
  { label: 'Готов', value: OrderStatus.READY },
  { label: 'На складе', value: OrderStatus.IN_WAREHOUSE },
  { label: 'Выдан', value: OrderStatus.DELIVERED },
]
