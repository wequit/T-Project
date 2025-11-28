import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orderProsthesisService } from '../api/service'
import type { OrderProsthesisListDTO, OrderProsthesisDTO, OrderProsthesisListParams } from './types'
import { orderProsthesisKeys } from './keys'
import type { ID, OrderStatusHistory } from '@rupoi/shared/model'

// === Order Prosthesis Queries ===
export function useOrderProsthesisList(params?: Ref<OrderProsthesisListParams | undefined>) {
  return useQuery<OrderProsthesisListDTO>({
    queryKey: orderProsthesisKeys.list(params),
    queryFn: () => orderProsthesisService.getList(params?.value),
  })
}

export function useOrderProsthesisOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderProsthesisDTO>({
    queryKey: orderProsthesisKeys.getOneRefId(id),
    queryFn: () => orderProsthesisService.getById(id.value),
    enabled,
  })
}

export function useOrderProsthesisHistory(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<OrderStatusHistory>({
    queryKey: orderProsthesisKeys.history(id),
    queryFn: () => orderProsthesisService.getHistory(id.value),
    enabled,
  })
}
