export enum InvoiceStatus {
  ACTIVE = "ACTIVE",
  SENT = "SENT",
  REVERTED = "REVERTED",
  RE_SENT = "RE_SENT",
  PROCESSED = "PROCESSED",
}

export const invoiceStatuses = Object.values(InvoiceStatus)

export const invoiceStatusOptions = [
  { label: 'Активный', value: InvoiceStatus.ACTIVE },
  { label: 'Отправленный', value: InvoiceStatus.SENT },
  { label: 'Отклоненный', value: InvoiceStatus.REVERTED },
  { label: 'Переотправленный', value: InvoiceStatus.RE_SENT },
  { label: 'Обработанный', value: InvoiceStatus.PROCESSED },
]

