import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orderReadyMadeService } from '../api/service'
import type { OrderReadyMadeListDTO, OrderReadyMadeDTO, OrderReadyMadeListParams } from './types'
import { orderReadyMadeKeys } from './keys'
import type { ID, OrderStatusHistory } from '@rupoi/shared/model'

// === Order Ready Made Queries ===
export function useOrderReadyMadeList(params?: Ref<OrderReadyMadeListParams | undefined>) {
  return useQuery<OrderReadyMadeListDTO>({
    queryKey: orderReadyMadeKeys.list(params),
    queryFn: () => orderReadyMadeService.getList(params?.value),
  })
}

export function useOrderReadyMadeOne(id: Ref<ID>) {
  const enabled = computed(() => {
    const value = id.value
    return typeof value === 'number' ? value > 0 : Boolean(value)
  })

  return useQuery<OrderReadyMadeDTO>({
    queryKey: orderReadyMadeKeys.getOneRefId(id),
    queryFn: () => orderReadyMadeService.getById(id.value),
    enabled,
  })
}

export function useOrderReadyMadeHistory(id: Ref<ID>) {
  const enabled = computed(() => {
    const value = id.value
    return typeof value === 'number' ? value > 0 : Boolean(value)
  })

  return useQuery<OrderStatusHistory>({
    queryKey: orderReadyMadeKeys.history(id),
    queryFn: () => orderReadyMadeService.getHistory(id.value),
    enabled,
  })
}
