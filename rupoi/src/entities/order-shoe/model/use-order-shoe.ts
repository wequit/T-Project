import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { orderShoeKeys } from './keys'
import type { OrderShoeListParams } from './types'
import {
  useCreateOrderShoe,
  useUpdateOrderShoe,
  useDeleteOrderShoe,
  usePatchOrderShoeStatus,
  useAssignWorkshopOrderShoe,
  useAddFileOrderShoe,
  useRemoveFileOrderShoe,
} from './mutations'
import { useOrderShoeOne, useOrderShoeList, useOrderShoeHistory } from './queries'

export type UseOrderShoeProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<OrderShoeListParams | undefined>
}

export function useOrderShoe(props: UseOrderShoeProps = {}) {
  const orderShoeId = computed<ID | null>(() => toValue(props.id) ?? null)
  const orderShoeIdRef = ref(orderShoeId.value ?? 0 as ID) as Ref<ID>
  
  watch(orderShoeId, (newId) => {
    if (newId) orderShoeIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const orderShoeQuery = useOrderShoeOne(orderShoeIdRef)
  
  // Query для списка (опционально)
  const orderShoeListQuery = props.listParams ? useOrderShoeList(props.listParams) : null
  
  // Query для истории статусов
  const orderShoeHistoryQuery = useOrderShoeHistory(orderShoeIdRef)
  
  // Computed для получения ID из query data
  const currentOrderShoeId = computed(() => 
    orderShoeQuery.data.value?.id ?? orderShoeId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createOrderShoeMutation = useCreateOrderShoe()
  const updateOrderShoeMutation = useUpdateOrderShoe()
  const deleteOrderShoeMutation = useDeleteOrderShoe()
  const patchStatusMutation = usePatchOrderShoeStatus()
  const assignWorkshopMutation = useAssignWorkshopOrderShoe()
  const addFileMutation = useAddFileOrderShoe()
  const removeFileMutation = useRemoveFileOrderShoe()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    orderShoeQuery.isFetching.value ||
    (orderShoeListQuery?.isFetching.value ?? false) ||
    orderShoeHistoryQuery.isFetching.value ||
    createOrderShoeMutation.isPending.value ||
    updateOrderShoeMutation.isPending.value ||
    deleteOrderShoeMutation.isPending.value ||
    patchStatusMutation.isPending.value ||
    assignWorkshopMutation.isPending.value ||
    addFileMutation.isPending.value ||
    removeFileMutation.isPending.value
  )

  return {
    // Keys
    keys: orderShoeKeys,
    
    // Query для одной сущности
    query: orderShoeQuery,
    orderShoe: orderShoeQuery.data,
    
    // Query для списка
    listQuery: orderShoeListQuery,
    orderShoeList: orderShoeListQuery?.data,
    
    // Query для истории статусов
    historyQuery: orderShoeHistoryQuery,
    orderShoeHistory: orderShoeHistoryQuery.data,
    
    // Computed IDs
    orderShoeId,
    currentOrderShoeId,
    
    // Mutations для OrderShoe
    createOrderShoeMutation,
    updateOrderShoeMutation,
    deleteOrderShoeMutation,
    patchStatusMutation,
    assignWorkshopMutation,
    addFileMutation,
    removeFileMutation,
    
    // Состояния
    isLoading,
  }
}

