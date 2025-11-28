import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orderShoeService } from '../api/service'
import type { OrderShoeListDTO, OrderShoeDTO, OrderShoeListParams } from './types'
import { orderShoeKeys } from './keys'
import type { ID, OrderStatusHistory } from '@rupoi/shared/model'

// === Order Shoe Queries ===
export function useOrderShoeList(params?: Ref<OrderShoeListParams | undefined>) {
  return useQuery<OrderShoeListDTO>({
    queryKey: orderShoeKeys.list(params),
    queryFn: () => orderShoeService.getList(params?.value),
  })
}

export function useOrderShoeOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderShoeDTO>({
    queryKey: orderShoeKeys.getOneRefId(id),
    queryFn: () => orderShoeService.getById(id.value),
    enabled,
  })
}

export function useOrderShoeHistory(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderStatusHistory>({
    queryKey: orderShoeKeys.history(id),
    queryFn: () => orderShoeService.getHistory(id.value),
    enabled,
  })
}
