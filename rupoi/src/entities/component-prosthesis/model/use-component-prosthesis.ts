import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import type { ID } from '@rupoi/shared/model'
import { 
  useCreateComponentProsthesis, 
  useUpdateComponentProsthesis, 
  useDeleteComponentProsthesis 
} from './mutations'

export type UseComponentProsthesisProps = {
  orderProsthesisId: MaybeRefOrGetter<ID | null>
}

/**
 * Composable для работы с компонентами протеза OrderProsthesis
 * По аналогии с useMedicalInfo - предоставляет все необходимые мутации
 */
export function useComponentProsthesis(props: UseComponentProsthesisProps) {
  const orderProsthesisId = computed<ID | null>(() => toValue(props.orderProsthesisId) ?? null)
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createMutation = useCreateComponentProsthesis()
  const updateMutation = useUpdateComponentProsthesis()
  const deleteMutation = useDeleteComponentProsthesis()

  // Состояние загрузки
  const isLoading = computed(() => 
    createMutation.isPending.value ||
    updateMutation.isPending.value ||
    deleteMutation.isPending.value
  )

  return {
    orderProsthesisId,
    createMutation,
    updateMutation,
    deleteMutation,
    isLoading,
  }
}

