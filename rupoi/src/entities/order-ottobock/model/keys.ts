import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { OrderOttobockListParams } from './types'

export const orderOttobockKeys = {
  key: () => ['order-ottobock'] as const,

  list: (params?: Ref<OrderOttobockListParams | undefined>) => [...orderOttobockKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...orderOttobockKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...orderOttobockKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...orderOttobockKeys.key(), 'status', id] as const,
  history: (id: Ref<ID>) => [...orderOttobockKeys.key(), 'history', id] as const,
}
