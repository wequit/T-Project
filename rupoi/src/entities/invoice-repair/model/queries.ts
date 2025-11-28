import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { invoiceRepairService } from '../api/service'
import type { InvoiceRepairListDTO, InvoiceRepairDTO, InvoiceRepairListParams } from './types'
import { invoiceRepairKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Invoice Repair Queries ===
export function useInvoiceRepairList(params?: Ref<InvoiceRepairListParams | undefined>) {
  return useQuery<InvoiceRepairListDTO>({
    queryKey: invoiceRepairKeys.list(params),
    queryFn: () => invoiceRepairService.getList(params?.value),
  })
}

export function useInvoiceRepairOne(id: Ref<ID>) {
  const enabled = computed(() => Number(id.value) > 0)

  return useQuery<InvoiceRepairDTO>({
    queryKey: invoiceRepairKeys.getOneRefId(id),
    queryFn: () => invoiceRepairService.getById(id.value),
    enabled,
  })
}

