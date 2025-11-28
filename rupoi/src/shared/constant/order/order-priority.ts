export enum OrderPriority {
  MEDIUM = 'NORMAL',
  URGENT = 'URGENT',
}

export const orderPriorities = Object.values(OrderPriority)

export const orderPriorityOptions = [
  { label: 'Средний', value: OrderPriority.MEDIUM },
  { label: 'Срочный', value: OrderPriority.URGENT },
]
