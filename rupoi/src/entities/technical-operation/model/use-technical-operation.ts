import { computed, type MaybeRefOrGetter, toValue} from 'vue'
import type { ID } from '@rupoi/shared/model'
import { technicalOperationKeys } from './keys'
import {
  useCreateTechnicalOperation,
  useUpdateTechnicalOperation,
  useDeleteTechnicalOperation,
} from './mutations'

export type UseTechnicalOperationProps = {
  id?: MaybeRefOrGetter<ID | null>
  orderShoeId?: MaybeRefOrGetter<ID | null>
}

export function useTechnicalOperation(props: UseTechnicalOperationProps = {}) {
  const orderShoeId = computed<ID | null>(() => toValue(props.orderShoeId) ?? null)
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createMutation = useCreateTechnicalOperation()
  const updateMutation = useUpdateTechnicalOperation()
  const deleteMutation = useDeleteTechnicalOperation()
  
  // Используем isFetching вместо isLoading для учета background refetch
  
  const isSaving = computed(() => 
    createMutation.isPending.value ||
    updateMutation.isPending.value ||
    deleteMutation.isPending.value
  )
  
  // Общее состояние загрузки (для обратной совместимости)
  const isLoading = computed(() => isSaving.value)

  return {
    // Keys
    keys: technicalOperationKeys,
    
    // Computed IDs
    orderShoeId,
    
    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,
    
    // Состояния
    isLoading,
    isSaving,
  }
}
