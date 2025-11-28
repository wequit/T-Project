import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { invoiceShoeKeys } from './keys'
import type { InvoiceShoeListParams } from './types'
import {
  useCreateInvoiceShoe,
  useUpdateInvoiceShoe,
  useDeleteInvoiceShoe,
  usePatchInvoiceShoeStatus,
} from './mutations'
import { useInvoiceShoeOne, useInvoiceShoeList } from './queries'

export type UseInvoiceShoeProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<InvoiceShoeListParams | undefined>
}

export function useInvoiceShoe(props: UseInvoiceShoeProps = {}) {
  const invoiceShoeId = computed<ID | null>(() => toValue(props.id) ?? null)
  const invoiceShoeIdRef = ref(invoiceShoeId.value ?? 0 as ID) as Ref<ID>
  
  watch(invoiceShoeId, (newId) => {
    if (newId) invoiceShoeIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const invoiceShoeQuery = useInvoiceShoeOne(invoiceShoeIdRef)
  
  // Query для списка (опционально)
  const invoiceShoeListQuery = props.listParams ? useInvoiceShoeList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentInvoiceShoeId = computed(() => 
    invoiceShoeQuery.data.value?.id ?? invoiceShoeId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createInvoiceShoeMutation = useCreateInvoiceShoe()
  const updateInvoiceShoeMutation = useUpdateInvoiceShoe()
  const deleteInvoiceShoeMutation = useDeleteInvoiceShoe()
  const patchStatusMutation = usePatchInvoiceShoeStatus()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    invoiceShoeQuery.isFetching.value ||
    (invoiceShoeListQuery?.isFetching.value ?? false) ||
    createInvoiceShoeMutation.isPending.value ||
    updateInvoiceShoeMutation.isPending.value ||
    deleteInvoiceShoeMutation.isPending.value ||
    patchStatusMutation.isPending.value
  )

  return {
    // Keys
    keys: invoiceShoeKeys,
    
    // Query для одной сущности
    query: invoiceShoeQuery,
    invoiceShoe: invoiceShoeQuery.data,
    
    // Query для списка
    listQuery: invoiceShoeListQuery,
    invoiceShoeList: invoiceShoeListQuery?.data,
    
    // Computed IDs
    invoiceShoeId,
    currentInvoiceShoeId,
    
    // Mutations для InvoiceShoe
    createInvoiceShoeMutation,
    updateInvoiceShoeMutation,
    deleteInvoiceShoeMutation,
    patchStatusMutation,
    
    // Состояния
    isLoading,
  }
}

