import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { invoiceReadyMadeKeys } from './keys'
import type { InvoiceReadyMadeListParams } from './types'
import {
  useCreateInvoiceReadyMade,
  useUpdateInvoiceReadyMade,
  useDeleteInvoiceReadyMade,
  usePatchInvoiceReadyMadeStatus,
} from './mutations'
import { useInvoiceReadyMadeOne, useInvoiceReadyMadeList } from './queries'

export type UseInvoiceReadyMadeProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<InvoiceReadyMadeListParams | undefined>
}

export function useInvoiceReadyMade(props: UseInvoiceReadyMadeProps = {}) {
  const invoiceReadyMadeId = computed<ID | null>(() => toValue(props.id) ?? null)
  const invoiceReadyMadeIdRef = ref(invoiceReadyMadeId.value ?? 0 as ID) as Ref<ID>
  
  watch(invoiceReadyMadeId, (newId) => {
    if (newId) invoiceReadyMadeIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const invoiceReadyMadeQuery = useInvoiceReadyMadeOne(invoiceReadyMadeIdRef)
  
  // Query для списка (опционально)
  const invoiceReadyMadeListQuery = props.listParams ? useInvoiceReadyMadeList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentInvoiceReadyMadeId = computed(() => 
    invoiceReadyMadeQuery.data.value?.id ?? invoiceReadyMadeId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createInvoiceReadyMadeMutation = useCreateInvoiceReadyMade()
  const updateInvoiceReadyMadeMutation = useUpdateInvoiceReadyMade()
  const deleteInvoiceReadyMadeMutation = useDeleteInvoiceReadyMade()
  const patchStatusMutation = usePatchInvoiceReadyMadeStatus()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    invoiceReadyMadeQuery.isFetching.value ||
    (invoiceReadyMadeListQuery?.isFetching.value ?? false) ||
    createInvoiceReadyMadeMutation.isPending.value ||
    updateInvoiceReadyMadeMutation.isPending.value ||
    deleteInvoiceReadyMadeMutation.isPending.value ||
    patchStatusMutation.isPending.value
  )

  return {
    // Keys
    keys: invoiceReadyMadeKeys,
    
    // Query для одной сущности
    query: invoiceReadyMadeQuery,
    invoiceReadyMade: invoiceReadyMadeQuery.data,
    
    // Query для списка
    listQuery: invoiceReadyMadeListQuery,
    invoiceReadyMadeList: invoiceReadyMadeListQuery?.data,
    
    // Computed IDs
    invoiceReadyMadeId,
    currentInvoiceReadyMadeId,
    
    // Mutations для InvoiceReadyMade
    createInvoiceReadyMadeMutation,
    updateInvoiceReadyMadeMutation,
    deleteInvoiceReadyMadeMutation,
    patchStatusMutation,
    
    // Состояния
    isLoading,
  }
}

