import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { orderOttobockKeys } from './keys'
import type { OrderOttobockListParams } from './types'
import {
  useCreateOrderOttobock,
  useUpdateOrderOttobock,
  useDeleteOrderOttobock,
  usePatchOrderOttobockStatus,
  useAssignWorkshopOrderOttobock,
  useAddFileOrderOttobock,
  useRemoveFileOrderOttobock,
} from './mutations'
import { useOrderOttobockOne, useOrderOttobockList, useOrderOttobockHistory } from './queries'

export type UseOrderOttobockProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<OrderOttobockListParams | undefined>
}

export function useOrderOttobock(props: UseOrderOttobockProps = {}) {
  const orderOttobockId = computed<ID | null>(() => toValue(props.id) ?? null)
  const orderOttobockIdRef = ref(orderOttobockId.value ?? 0 as ID) as Ref<ID>
  
  watch(orderOttobockId, (newId) => {
    if (newId) orderOttobockIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const orderOttobockQuery = useOrderOttobockOne(orderOttobockIdRef)
  
  // Query для списка (опционально)
  const orderOttobockListQuery = props.listParams ? useOrderOttobockList(props.listParams) : null
  
  // Query для истории статусов
  const orderOttobockHistoryQuery = useOrderOttobockHistory(orderOttobockIdRef)
  
  // Computed для получения ID из query data
  const currentOrderOttobockId = computed(() => 
    orderOttobockQuery.data.value?.id ?? orderOttobockId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createOrderOttobockMutation = useCreateOrderOttobock()
  const updateOrderOttobockMutation = useUpdateOrderOttobock()
  const deleteOrderOttobockMutation = useDeleteOrderOttobock()
  const patchStatusMutation = usePatchOrderOttobockStatus()
  const assignWorkshopMutation = useAssignWorkshopOrderOttobock()
  const addFileMutation = useAddFileOrderOttobock()
  const removeFileMutation = useRemoveFileOrderOttobock()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    orderOttobockQuery.isFetching.value ||
    (orderOttobockListQuery?.isFetching.value ?? false) ||
    orderOttobockHistoryQuery.isFetching.value ||
    createOrderOttobockMutation.isPending.value ||
    updateOrderOttobockMutation.isPending.value ||
    deleteOrderOttobockMutation.isPending.value ||
    patchStatusMutation.isPending.value ||
    assignWorkshopMutation.isPending.value ||
    addFileMutation.isPending.value ||
    removeFileMutation.isPending.value
  )

  return {
    // Keys
    keys: orderOttobockKeys,
    
    // Query для одной сущности
    query: orderOttobockQuery,
    orderOttobock: orderOttobockQuery.data,
    
    // Query для списка
    listQuery: orderOttobockListQuery,
    orderOttobockList: orderOttobockListQuery?.data,
    
    // Query для истории статусов
    historyQuery: orderOttobockHistoryQuery,
    orderOttobockHistory: orderOttobockHistoryQuery.data,
    
    // Computed IDs
    orderOttobockId,
    currentOrderOttobockId,
    
    // Mutations для OrderOttobock
    createOrderOttobockMutation,
    updateOrderOttobockMutation,
    deleteOrderOttobockMutation,
    patchStatusMutation,
    assignWorkshopMutation,
    addFileMutation,
    removeFileMutation,
    
    // Состояния
    isLoading,
  }
}

