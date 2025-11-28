import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { OrderShoeListParams } from './types'

export const orderShoeKeys = {
  key: () => ['order-shoe'] as const,

  list: (params?: Ref<OrderShoeListParams | undefined>) => [...orderShoeKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...orderShoeKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...orderShoeKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...orderShoeKeys.key(), 'status', id] as const,
  history: (id: Ref<ID>) => [...orderShoeKeys.key(), 'history', id] as const,
}
