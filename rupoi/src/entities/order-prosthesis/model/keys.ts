import type { Ref } from 'vue'
import type { OrderProsthesisListParams } from './types'
import type { ID } from '@rupoi/shared/model'

export const orderProsthesisKeys = {
  key: () => ['order-prosthesis'] as const,

  list: (params?: Ref<OrderProsthesisListParams | undefined>) => [...orderProsthesisKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...orderProsthesisKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...orderProsthesisKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...orderProsthesisKeys.key(), 'status', id] as const,
  history: (id: Ref<ID>) => [...orderProsthesisKeys.key(), 'history', id] as const,
}
