import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { invoiceProsthesisKeys } from './keys'
import type { InvoiceProsthesisListParams } from './types'
import {
  useCreateInvoiceProsthesis,
  useUpdateInvoiceProsthesis,
  useDeleteInvoiceProsthesis,
  usePatchInvoiceProsthesisStatus,
} from './mutations'
import { useInvoiceProsthesisOne, useInvoiceProsthesisList } from './queries'

export type UseInvoiceProsthesisProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<InvoiceProsthesisListParams | undefined>
}

export function useInvoiceProsthesis(props: UseInvoiceProsthesisProps = {}) {
  const invoiceProsthesisId = computed<ID | null>(() => toValue(props.id) ?? null)
  const invoiceProsthesisIdRef = ref(invoiceProsthesisId.value ?? 0 as ID) as Ref<ID>
  
  watch(invoiceProsthesisId, (newId) => {
    if (newId) invoiceProsthesisIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const invoiceProsthesisQuery = useInvoiceProsthesisOne(invoiceProsthesisIdRef)
  
  // Query для списка (опционально)
  const invoiceProsthesisListQuery = props.listParams ? useInvoiceProsthesisList(props.listParams) : null
  
  // Computed для получения ID из query data
  const currentInvoiceProsthesisId = computed(() => 
    invoiceProsthesisQuery.data.value?.id ?? invoiceProsthesisId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createInvoiceProsthesisMutation = useCreateInvoiceProsthesis()
  const updateInvoiceProsthesisMutation = useUpdateInvoiceProsthesis()
  const deleteInvoiceProsthesisMutation = useDeleteInvoiceProsthesis()
  const patchStatusMutation = usePatchInvoiceProsthesisStatus()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    invoiceProsthesisQuery.isFetching.value ||
    (invoiceProsthesisListQuery?.isFetching.value ?? false) ||
    createInvoiceProsthesisMutation.isPending.value ||
    updateInvoiceProsthesisMutation.isPending.value ||
    deleteInvoiceProsthesisMutation.isPending.value ||
    patchStatusMutation.isPending.value
  )

  return {
    // Keys
    keys: invoiceProsthesisKeys,
    
    // Query для одной сущности
    query: invoiceProsthesisQuery,
    invoiceProsthesis: invoiceProsthesisQuery.data,
    
    // Query для списка
    listQuery: invoiceProsthesisListQuery,
    invoiceProsthesisList: invoiceProsthesisListQuery?.data,
    
    // Computed IDs
    invoiceProsthesisId,
    currentInvoiceProsthesisId,
    
    // Mutations для InvoiceProsthesis
    createInvoiceProsthesisMutation,
    updateInvoiceProsthesisMutation,
    deleteInvoiceProsthesisMutation,
    patchStatusMutation,
    
    // Состояния
    isLoading,
  }
}

