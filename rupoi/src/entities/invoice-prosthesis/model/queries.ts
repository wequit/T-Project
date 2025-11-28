import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { invoiceProsthesisService } from '../api/service'
import type { InvoiceProsthesisListDTO, InvoiceProsthesisDTO, InvoiceProsthesisListParams } from './types'
import { invoiceProsthesisKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Invoice Prosthesis Queries ===
export function useInvoiceProsthesisList(params?: Ref<InvoiceProsthesisListParams | undefined>) {
  return useQuery<InvoiceProsthesisListDTO>({
    queryKey: invoiceProsthesisKeys.list(params),
    queryFn: () => invoiceProsthesisService.getList(params?.value),
  })
}

export function useInvoiceProsthesisOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<InvoiceProsthesisDTO>({
    queryKey: invoiceProsthesisKeys.getOneRefId(id),
    queryFn: () => invoiceProsthesisService.getById(id.value),
    enabled,
  })
}

