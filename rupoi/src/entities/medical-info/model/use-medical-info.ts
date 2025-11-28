import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import type { UUID } from '@rupoi/shared/model'
import { 
  useCreateMedicalInfo, 
  useUpdateMedicalInfo, 
  useDeleteMedicalInfo 
} from './mutations'

export type UseMedicalInfoProps = {
  personId: MaybeRefOrGetter<UUID | null>
}

/**
 * Composable для работы с медицинской информацией Person
 * По аналогии с usePerson - предоставляет все необходимые мутации
 */
export function useMedicalInfo(props: UseMedicalInfoProps) {
  const personId = computed<UUID | null>(() => toValue(props.personId) ?? null)
  
  // Mutations - создаем все один раз в setup(), без привязки к ID
  const createMutation = useCreateMedicalInfo()
  const updateMutation = useUpdateMedicalInfo()
  const deleteMutation = useDeleteMedicalInfo()

  // Состояние загрузки
  const isLoading = computed(() => 
    createMutation.isPending.value ||
    updateMutation.isPending.value ||
    deleteMutation.isPending.value
  )

  return {
    personId,
    createMutation,
    updateMutation,
    deleteMutation,
    isLoading,
  }
}

