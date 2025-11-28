import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { orderReadyMadeKeys } from './keys'
import type { OrderReadyMadeListParams } from './types'
import {
  useCreateOrderReadyMade,
  useUpdateOrderReadyMade,
  useDeleteOrderReadyMade,
  usePatchOrderReadyMadeStatus,
  useAssignWorkshopOrderReadyMade,
  useAddFileOrderReadyMade,
  useRemoveFileOrderReadyMade,
} from './mutations'
import { useOrderReadyMadeOne, useOrderReadyMadeList, useOrderReadyMadeHistory } from './queries'

export type UseOrderReadyMadeProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<OrderReadyMadeListParams | undefined>
}

export function useOrderReadyMade(props: UseOrderReadyMadeProps = {}) {
  const orderReadyMadeId = computed<ID | null>(() => toValue(props.id) ?? null)
  const orderReadyMadeIdRef = ref(orderReadyMadeId.value ?? 0 as ID) as Ref<ID>
  
  watch(orderReadyMadeId, (newId) => {
    if (newId) orderReadyMadeIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const orderReadyMadeQuery = useOrderReadyMadeOne(orderReadyMadeIdRef)
  
  // Query для списка (опционально)
  const orderReadyMadeListQuery = props.listParams ? useOrderReadyMadeList(props.listParams) : null
  
  // Query для истории статусов
  const orderReadyMadeHistoryQuery = useOrderReadyMadeHistory(orderReadyMadeIdRef)
  
  // Computed для получения ID из query data
  const currentOrderReadyMadeId = computed(() => 
    orderReadyMadeQuery.data.value?.id ?? orderReadyMadeId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createOrderReadyMadeMutation = useCreateOrderReadyMade()
  const updateOrderReadyMadeMutation = useUpdateOrderReadyMade()
  const deleteOrderReadyMadeMutation = useDeleteOrderReadyMade()
  const patchStatusMutation = usePatchOrderReadyMadeStatus()
  const assignWorkshopMutation = useAssignWorkshopOrderReadyMade()
  const addFileMutation = useAddFileOrderReadyMade()
  const removeFileMutation = useRemoveFileOrderReadyMade()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    orderReadyMadeQuery.isFetching.value ||
    (orderReadyMadeListQuery?.isFetching.value ?? false) ||
    orderReadyMadeHistoryQuery.isFetching.value ||
    createOrderReadyMadeMutation.isPending.value ||
    updateOrderReadyMadeMutation.isPending.value ||
    deleteOrderReadyMadeMutation.isPending.value ||
    patchStatusMutation.isPending.value ||
    assignWorkshopMutation.isPending.value ||
    addFileMutation.isPending.value ||
    removeFileMutation.isPending.value
  )

  return {
    // Keys
    keys: orderReadyMadeKeys,
    
    // Query для одной сущности
    query: orderReadyMadeQuery,
    orderReadyMade: orderReadyMadeQuery.data,
    
    // Query для списка
    listQuery: orderReadyMadeListQuery,
    orderReadyMadeList: orderReadyMadeListQuery?.data,
    
    // Query для истории статусов
    historyQuery: orderReadyMadeHistoryQuery,
    orderReadyMadeHistory: orderReadyMadeHistoryQuery.data,
    
    // Computed IDs
    orderReadyMadeId,
    currentOrderReadyMadeId,
    
    // Mutations для OrderReadyMade
    createOrderReadyMadeMutation,
    updateOrderReadyMadeMutation,
    deleteOrderReadyMadeMutation,
    patchStatusMutation,
    assignWorkshopMutation,
    addFileMutation,
    removeFileMutation,
    
    // Состояния
    isLoading,
  }
}

