export enum InvoicePriority {
  NORMAL = 'NORMAL',
  URGENT = 'URGENT',
}

export const invoicePriorities = Object.values(InvoicePriority)

export const invoicePriorityOptions = [
  { label: 'Средний', value: InvoicePriority.NORMAL },
  { label: 'Срочный', value: InvoicePriority.URGENT },
]

