import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { OrderRepairListParams } from './types'

export const orderRepairKeys = {
  key: () => ['order-repair'] as const,

  list: (params?: Ref<OrderRepairListParams | undefined>) => [...orderRepairKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID>) => [...orderRepairKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...orderRepairKeys.key(), 'getOne', id] as const,
  status: (id: ID) => [...orderRepairKeys.key(), 'status', id] as const,
  history: (id: Ref<ID>) => [...orderRepairKeys.key(), 'history', id] as const,
}
