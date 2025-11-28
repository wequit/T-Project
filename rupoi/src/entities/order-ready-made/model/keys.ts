import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { OrderReadyMadeListParams } from './types'

export const orderReadyMadeKeys = {
  key: () => ['order-ready-made'] as const,

  list: (params?: Ref<OrderReadyMadeListParams | undefined>) => [...orderReadyMadeKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...orderReadyMadeKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...orderReadyMadeKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...orderReadyMadeKeys.key(), 'status', id] as const,
  history: (id: Ref<ID>) => [...orderReadyMadeKeys.key(), 'history', id] as const,
}
