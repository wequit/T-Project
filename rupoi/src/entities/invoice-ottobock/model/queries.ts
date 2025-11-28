import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { invoiceOttobockService } from '../api/service'
import type { InvoiceOttobockListDTO, InvoiceOttobockDTO, InvoiceOttobockListParams } from './types'
import { invoiceOttobockKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Invoice Ottobock Queries ===
export function useInvoiceOttobockList(params?: Ref<InvoiceOttobockListParams | undefined>) {
  return useQuery<InvoiceOttobockListDTO>({
    queryKey: invoiceOttobockKeys.list(params),
    queryFn: () => invoiceOttobockService.getList(params?.value),
  })
}

export function useInvoiceOttobockOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<InvoiceOttobockDTO>({
    queryKey: invoiceOttobockKeys.getOneRefId(id),
    queryFn: () => invoiceOttobockService.getById(id.value),
    enabled,
  })
}


