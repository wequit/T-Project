import type { Ref } from 'vue'
import type { InvoiceProsthesisListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const invoiceProsthesisKeys = {
  key: () => ['invoice-prosthesis'] as const,

  list: (params?: Ref<InvoiceProsthesisListParams | undefined>) => [...invoiceProsthesisKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...invoiceProsthesisKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...invoiceProsthesisKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...invoiceProsthesisKeys.key(), 'status', id] as const,
}

