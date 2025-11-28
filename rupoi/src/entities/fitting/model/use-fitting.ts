import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { FittingKind } from '../constant'
import { 
  useCreateFitting, 
  useUpdateFitting, 
  useDeleteFitting 
} from './mutations'

export type UseFittingProps = {
  kind: MaybeRefOrGetter<FittingKind>
  orderProsthesisId: MaybeRefOrGetter<ID | null>
}

/**
 * Composable для работы с примерками (Fitting) OrderProsthesis
 * По аналогии с useMedicalInfo - предоставляет все необходимые мутации
 * Основное отличие: требует обязательный параметр kind для определения endpoint
 */
export function useFitting(props: UseFittingProps) {
  const kind = computed<FittingKind>(() => toValue(props.kind))
  const orderProsthesisId = computed<ID | null>(() => toValue(props.orderProsthesisId) ?? null)
  
  // Mutations - создаем все один раз в setup() с передачей kind
  const createMutation = useCreateFitting(kind.value)
  const updateMutation = useUpdateFitting(kind.value)
  const deleteMutation = useDeleteFitting(kind.value)

  // Состояние загрузки
  const isLoading = computed(() => 
    createMutation.isPending.value ||
    updateMutation.isPending.value ||
    deleteMutation.isPending.value
  )

  return {
    kind,
    orderProsthesisId,
    createMutation,
    updateMutation,
    deleteMutation,
    isLoading,
  }
}

