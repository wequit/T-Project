import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orderOttobockService } from '../api/service'
import type { OrderOttobockListDTO, OrderOttobockDTO, OrderOttobockListParams } from './types'
import { orderOttobockKeys } from './keys'
import type { ID, OrderStatusHistory } from '@rupoi/shared/model'

// === Order Ottobock Queries ===
export function useOrderOttobockList(params?: Ref<OrderOttobockListParams | undefined>) {
  return useQuery<OrderOttobockListDTO>({
    queryKey: orderOttobockKeys.list(params),
    queryFn: () => orderOttobockService.getList(params?.value),
  })
}

export function useOrderOttobockOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderOttobockDTO>({
    queryKey: orderOttobockKeys.getOneRefId(id),
    queryFn: () => orderOttobockService.getById(id.value),
    enabled,
  })
}

export function useOrderOttobockHistory(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderStatusHistory>({
    queryKey: orderOttobockKeys.history(id),
    queryFn: () => orderOttobockService.getHistory(id.value),
    enabled,
  })
}
