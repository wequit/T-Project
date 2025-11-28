import type { Ref } from 'vue'
import type { InvoiceShoeListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const invoiceShoeKeys = {
  key: () => ['invoice-shoe'] as const,

  list: (params?: Ref<InvoiceShoeListParams | undefined>) => [...invoiceShoeKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...invoiceShoeKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...invoiceShoeKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...invoiceShoeKeys.key(), 'status', id] as const,
}

