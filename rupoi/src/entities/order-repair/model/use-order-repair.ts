import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { orderRepairKeys } from './keys'
import type { OrderRepairListParams } from './types'
import {
  useCreateOrderRepair,
  useUpdateOrderRepair,
  useDeleteOrderRepair,
  usePatchOrderRepairStatus,
  useAssignWorkshopOrderRepair,
  useAddFileOrderRepair,
  useRemoveFileOrderRepair,
} from './mutations'
import { useOrderRepairOne, useOrderRepairList, useOrderRepairHistory } from './queries'

export type UseOrderRepairProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<OrderRepairListParams | undefined>
}

export function useOrderRepair(props: UseOrderRepairProps = {}) {
  const orderRepairId = computed<ID | null>(() => toValue(props.id) ?? null)
  const orderRepairIdRef = ref(orderRepairId.value ?? 0 as ID) as Ref<ID>
  
  watch(orderRepairId, (newId) => {
    if (newId) orderRepairIdRef.value = newId
  }, { immediate: true })
  
  // Query для одной сущности
  const orderRepairQuery = useOrderRepairOne(orderRepairIdRef)
  
  // Query для списка (опционально)
  const orderRepairListQuery = props.listParams ? useOrderRepairList(props.listParams) : null
  
  // Query для истории статусов
  const orderRepairHistoryQuery = useOrderRepairHistory(orderRepairIdRef)
  
  // Computed для получения ID из query data
  const currentOrderRepairId = computed(() => 
    orderRepairQuery.data.value?.id ?? orderRepairId.value ?? null
  )
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createOrderRepairMutation = useCreateOrderRepair()
  const updateOrderRepairMutation = useUpdateOrderRepair()
  const deleteOrderRepairMutation = useDeleteOrderRepair()
  const patchStatusMutation = usePatchOrderRepairStatus()
  const assignWorkshopMutation = useAssignWorkshopOrderRepair()
  const addFileMutation = useAddFileOrderRepair()
  const removeFileMutation = useRemoveFileOrderRepair()
  
  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() => 
    orderRepairQuery.isFetching.value ||
    (orderRepairListQuery?.isFetching.value ?? false) ||
    orderRepairHistoryQuery.isFetching.value ||
    createOrderRepairMutation.isPending.value ||
    updateOrderRepairMutation.isPending.value ||
    deleteOrderRepairMutation.isPending.value ||
    patchStatusMutation.isPending.value ||
    assignWorkshopMutation.isPending.value ||
    addFileMutation.isPending.value ||
    removeFileMutation.isPending.value
  )

  return {
    // Keys
    keys: orderRepairKeys,
    
    // Query для одной сущности
    query: orderRepairQuery,
    orderRepair: orderRepairQuery.data,
    
    // Query для списка
    listQuery: orderRepairListQuery,
    orderRepairList: orderRepairListQuery?.data,
    
    // Query для истории статусов
    historyQuery: orderRepairHistoryQuery,
    orderRepairHistory: orderRepairHistoryQuery.data,
    
    // Computed IDs
    orderRepairId,
    currentOrderRepairId,
    
    // Mutations для OrderRepair
    createOrderRepairMutation,
    updateOrderRepairMutation,
    deleteOrderRepairMutation,
    patchStatusMutation,
    assignWorkshopMutation,
    addFileMutation,
    removeFileMutation,
    
    // Состояния
    isLoading,
  }
}

