import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { invoiceShoeService } from '../api/service'
import type { InvoiceShoeListDTO, InvoiceShoeDTO, InvoiceShoeListParams } from './types'
import { invoiceShoeKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Invoice Shoe Queries ===
export function useInvoiceShoeList(params?: Ref<InvoiceShoeListParams | undefined>) {
  return useQuery<InvoiceShoeListDTO>({
    queryKey: invoiceShoeKeys.list(params),
    queryFn: () => invoiceShoeService.getList(params?.value),
  })
}

export function useInvoiceShoeOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<InvoiceShoeDTO>({
    queryKey: invoiceShoeKeys.getOneRefId(id),
    queryFn: () => invoiceShoeService.getById(id.value),
    enabled,
  })
}

