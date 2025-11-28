import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { invoiceRepairKeys } from './keys'
import type { InvoiceRepairListParams } from './types'
import {
  useCreateInvoiceRepair,
  useUpdateInvoiceRepair,
  useDeleteInvoiceRepair,
  usePatchInvoiceRepairStatus,
} from './mutations'
import { useInvoiceRepairOne, useInvoiceRepairList } from './queries'

export type UseInvoiceRepairProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<InvoiceRepairListParams | undefined>
}

export function useInvoiceRepair(props: UseInvoiceRepairProps = {}) {
  const invoiceRepairId = computed<ID | null>(() => toValue(props.id) ?? null)
  const invoiceRepairIdRef = ref(invoiceRepairId.value ?? 0 as ID) as Ref<ID>
  
  watch(invoiceRepairId, (newId) => {
    if (newId) invoiceRepairIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const invoiceRepairQuery = useInvoiceRepairOne(invoiceRepairIdRef)
  
  // Query для списка (опционально)
  const invoiceRepairListQuery = props.listParams ? useInvoiceRepairList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentInvoiceRepairId = computed(() => 
    invoiceRepairQuery.data.value?.id ?? invoiceRepairId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createInvoiceRepairMutation = useCreateInvoiceRepair()
  const updateInvoiceRepairMutation = useUpdateInvoiceRepair()
  const deleteInvoiceRepairMutation = useDeleteInvoiceRepair()
  const patchStatusMutation = usePatchInvoiceRepairStatus()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    invoiceRepairQuery.isFetching.value ||
    (invoiceRepairListQuery?.isFetching.value ?? false) ||
    createInvoiceRepairMutation.isPending.value ||
    updateInvoiceRepairMutation.isPending.value ||
    deleteInvoiceRepairMutation.isPending.value ||
    patchStatusMutation.isPending.value
  )

  return {
    // Keys
    keys: invoiceRepairKeys,
    
    // Query для одной сущности
    query: invoiceRepairQuery,
    invoiceRepair: invoiceRepairQuery.data,
    
    // Query для списка
    listQuery: invoiceRepairListQuery,
    invoiceRepairList: invoiceRepairListQuery?.data,
    
    // Computed IDs
    invoiceRepairId,
    currentInvoiceRepairId,
    
    // Mutations для InvoiceRepair
    createInvoiceRepairMutation,
    updateInvoiceRepairMutation,
    deleteInvoiceRepairMutation,
    patchStatusMutation,
    
    // Состояния
    isLoading,
  }
}

