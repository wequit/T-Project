import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orderRepairService } from '../api/service'
import type { OrderRepairListDTO, OrderRepairDTO, OrderRepairListParams } from './types'
import { orderRepairKeys } from './keys'
import type { ID, OrderStatusHistory } from '@rupoi/shared/model'

// === Order Repair Queries ===
export function useOrderRepairList(params?: Ref<OrderRepairListParams | undefined>) {
  return useQuery<OrderRepairListDTO>({
    queryKey: orderRepairKeys.list(params),
    queryFn: () => orderRepairService.getList(params?.value),
  })
}

export function useOrderRepairOne(id: Ref<ID>) {
  const enabled = computed(() => {
    const value = id.value
    return typeof value === 'number' ? value > 0 : Boolean(value)
  })

  return useQuery<OrderRepairDTO>({
    queryKey: orderRepairKeys.getOneRefId(id),
    queryFn: () => orderRepairService.getById(id.value),
    enabled,
  })
}

export function useOrderRepairHistory(id: Ref<ID>) {
  const enabled = computed(() => {
    const value = id.value
    return typeof value === 'number' ? value > 0 : Boolean(value)
  })

  return useQuery<OrderStatusHistory>({
    queryKey: orderRepairKeys.history(id),
    queryFn: () => orderRepairService.getHistory(id.value),
    enabled,
  })
}
