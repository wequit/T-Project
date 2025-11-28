import type { Ref } from 'vue'
import type { InvoiceRepairListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const invoiceRepairKeys = {
  key: () => ['invoice-repair'] as const,

  list: (params?: Ref<InvoiceRepairListParams | undefined>) => [...invoiceRepairKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...invoiceRepairKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...invoiceRepairKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...invoiceRepairKeys.key(), 'status', id] as const,
}

