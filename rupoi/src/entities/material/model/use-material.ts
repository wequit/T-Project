import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { MaterialKind } from '../constant'
import {
  useCreateMaterial,
  useUpdateMaterial,
  useDeleteMaterial,
} from './mutations'

export type UseMaterialProps = {
  orderId: MaybeRefOrGetter<ID | null>
  kind: MaybeRefOrGetter<MaterialKind>
}

export function useMaterial(props: UseMaterialProps) {
  const orderId = computed<ID | null>(() => toValue(props.orderId) ?? null)
  const kind = computed<MaterialKind>(() => toValue(props.kind))

  // Mutations - создаем все один раз в setup() с передачей kind
  const createMutation = useCreateMaterial(kind.value)
  const updateMutation = useUpdateMaterial(kind.value)
  const deleteMutation = useDeleteMaterial(kind.value)

  const isLoading = computed(() =>
    createMutation.isPending.value ||
    updateMutation.isPending.value ||
    deleteMutation.isPending.value
  )

  return {
    orderId,
    kind,
    createMutation,
    updateMutation,
    deleteMutation,
    isLoading,
  }
}

