import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fittingService } from '../api/service'
import type { FittingListDTO, FittingDTO } from './types'
import { fittingKeys } from './keys'
import type { FittingKind } from '../constant'
import type { ID } from '@rupoi/shared/model'

// === Fitting Queries ===
export function useFittingList(kind: FittingKind) {
  return useQuery<FittingListDTO>({
    queryKey: fittingKeys.list(kind),
    queryFn: () => fittingService.getList(kind),
  })
}

export function useFittingOne(kind: FittingKind, id: Ref<ID>) {
  const enabled = computed(() => !!id.value)

  return useQuery<FittingDTO>({
    queryKey: fittingKeys.getOneRefId(kind, id),
    queryFn: () => fittingService.getById(kind, id.value),
    enabled,
  })
}
