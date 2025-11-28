import type { Ref } from 'vue'
import type { InvoiceOttobockListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const invoiceOttobockKeys = {
  key: () => ['invoice-ottobock'] as const,

  list: (params?: Ref<InvoiceOttobockListParams | undefined>) => [...invoiceOttobockKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...invoiceOttobockKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...invoiceOttobockKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...invoiceOttobockKeys.key(), 'status', id] as const,
}


