import { computed, ref, watch, type MaybeRefOrGetter, toValue, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { orderProsthesisKeys } from './keys'
import type { OrderProsthesisListParams } from './types'
import {
  useCreateOrderProsthesis,
  useUpdateOrderProsthesis,
  useDeleteOrderProsthesis,
  usePatchOrderProsthesisStatus,
  useAssignWorkshopOrderProsthesis,
  useAddFileOrderProsthesis,
  useRemoveFileOrderProsthesis,
} from './mutations'
import { useOrderProsthesisOne, useOrderProsthesisList, useOrderProsthesisHistory } from './queries'

export type UseOrderProsthesisProps = {
  id?: MaybeRefOrGetter<ID | null>
  listParams?: Ref<OrderProsthesisListParams | undefined>
}

export function useOrderProsthesis(props: UseOrderProsthesisProps = {}) {
  const orderProsthesisId = computed<ID | null>(() => toValue(props.id) ?? null)
  const orderProsthesisIdRef = ref(orderProsthesisId.value ?? 0 as ID) as Ref<ID>

  watch(orderProsthesisId, (newId) => {
    if (newId) orderProsthesisIdRef.value = newId
  }, { immediate: true })

  // Query для одной сущности
  const orderProsthesisQuery = useOrderProsthesisOne(orderProsthesisIdRef)

  // Query для списка (опционально)
  const orderProsthesisListQuery = props.listParams ? useOrderProsthesisList(props.listParams) : null

  // Query для истории статусов
  const orderProsthesisHistoryQuery = useOrderProsthesisHistory(orderProsthesisIdRef)

  // Computed для получения ID из query data
  const currentOrderProsthesisId = computed(() =>
    orderProsthesisQuery.data.value?.id ?? orderProsthesisId.value ?? null
  )

  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createOrderProsthesisMutation = useCreateOrderProsthesis()
  const updateOrderProsthesisMutation = useUpdateOrderProsthesis()
  const deleteOrderProsthesisMutation = useDeleteOrderProsthesis()
  const patchStatusMutation = usePatchOrderProsthesisStatus()
  const assignWorkshopMutation = useAssignWorkshopOrderProsthesis()
  const addFileMutation = useAddFileOrderProsthesis()
  const removeFileMutation = useRemoveFileOrderProsthesis()

  // Общее состояние загрузки (любое обращение к backend)
  // Используем isFetching вместо isLoading для учета background refetch
  const isLoading = computed(() =>
    orderProsthesisQuery.isFetching.value ||
    (orderProsthesisListQuery?.isFetching.value ?? false) ||
    orderProsthesisHistoryQuery.isFetching.value ||
    createOrderProsthesisMutation.isPending.value ||
    updateOrderProsthesisMutation.isPending.value ||
    deleteOrderProsthesisMutation.isPending.value ||
    patchStatusMutation.isPending.value ||
    assignWorkshopMutation.isPending.value ||
    addFileMutation.isPending.value ||
    removeFileMutation.isPending.value
  )

  return {
    // Keys
    keys: orderProsthesisKeys,

    // Query для одной сущности
    query: orderProsthesisQuery,
    orderProsthesis: orderProsthesisQuery.data,

    // Query для списка
    listQuery: orderProsthesisListQuery,
    orderProsthesisList: orderProsthesisListQuery?.data,

    // Query для истории статусов
    historyQuery: orderProsthesisHistoryQuery,
    orderProsthesisHistory: orderProsthesisHistoryQuery.data,

    // Computed IDs
    orderProsthesisId,
    currentOrderProsthesisId,

    // Mutations для OrderProsthesis
    createOrderProsthesisMutation,
    updateOrderProsthesisMutation,
    deleteOrderProsthesisMutation,
    patchStatusMutation,
    assignWorkshopMutation,
    addFileMutation,
    removeFileMutation,

    // Состояния
    isLoading,
  }
}

