import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { invoiceReadyMadeService } from '../api/service'
import type { InvoiceReadyMadeListDTO, InvoiceReadyMadeDTO, InvoiceReadyMadeListParams } from './types'
import { invoiceReadyMadeKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Invoice Ready Made Queries ===
export function useInvoiceReadyMadeList(params?: Ref<InvoiceReadyMadeListParams | undefined>) {
  return useQuery<InvoiceReadyMadeListDTO>({
    queryKey: invoiceReadyMadeKeys.list(params),
    queryFn: () => invoiceReadyMadeService.getList(params?.value),
  })
}

export function useInvoiceReadyMadeOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<InvoiceReadyMadeDTO>({
    queryKey: invoiceReadyMadeKeys.getOneRefId(id),
    queryFn: () => invoiceReadyMadeService.getById(id.value),
    enabled,
  })
}

