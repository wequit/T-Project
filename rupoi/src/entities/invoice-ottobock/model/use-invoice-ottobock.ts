import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { invoiceOttobockKeys } from './keys'
import type { InvoiceOttobockListParams } from './types'
import {
  useCreateInvoiceOttobock,
  useUpdateInvoiceOttobock,
  useDeleteInvoiceOttobock,
  usePatchInvoiceOttobockStatus,
} from './mutations'
import { useInvoiceOttobockOne, useInvoiceOttobockList } from './queries'

export type UseInvoiceOttobockProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<InvoiceOttobockListParams | undefined>
}

export function useInvoiceOttobock(props: UseInvoiceOttobockProps = {}) {
  const invoiceOttobockId = computed<ID | null>(() => toValue(props.id) ?? null)
  const invoiceOttobockIdRef = ref(invoiceOttobockId.value ?? 0 as ID) as Ref<ID>
  
  watch(invoiceOttobockId, (newId) => {
    if (newId) invoiceOttobockIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const invoiceOttobockQuery = useInvoiceOttobockOne(invoiceOttobockIdRef)
  
  // Query для списка (опционально)
  const invoiceOttobockListQuery = props.listParams ? useInvoiceOttobockList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentInvoiceOttobockId = computed(() => 
    invoiceOttobockQuery.data.value?.id ?? invoiceOttobockId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createInvoiceOttobockMutation = useCreateInvoiceOttobock()
  const updateInvoiceOttobockMutation = useUpdateInvoiceOttobock()
  const deleteInvoiceOttobockMutation = useDeleteInvoiceOttobock()
  const patchStatusMutation = usePatchInvoiceOttobockStatus()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    invoiceOttobockQuery.isFetching.value ||
    (invoiceOttobockListQuery?.isFetching.value ?? false) ||
    createInvoiceOttobockMutation.isPending.value ||
    updateInvoiceOttobockMutation.isPending.value ||
    deleteInvoiceOttobockMutation.isPending.value ||
    patchStatusMutation.isPending.value
  )

  return {
    // Keys
    keys: invoiceOttobockKeys,
    
    // Query для одной сущности
    query: invoiceOttobockQuery,
    invoiceOttobock: invoiceOttobockQuery.data,
    
    // Query для списка
    listQuery: invoiceOttobockListQuery,
    invoiceOttobockList: invoiceOttobockListQuery?.data,
    
    // Computed IDs
    invoiceOttobockId,
    currentInvoiceOttobockId,
    
    // Mutations для InvoiceOttobock
    createInvoiceOttobockMutation,
    updateInvoiceOttobockMutation,
    deleteInvoiceOttobockMutation,
    patchStatusMutation,
    
    // Состояния
    isLoading,
  }
}


