import type { Ref } from 'vue'
import type { InvoiceReadyMadeListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const invoiceReadyMadeKeys = {
  key: () => ['invoice-ready-made'] as const,

  list: (params?: Ref<InvoiceReadyMadeListParams | undefined>) => [...invoiceReadyMadeKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...invoiceReadyMadeKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...invoiceReadyMadeKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...invoiceReadyMadeKeys.key(), 'status', id] as const,
}

