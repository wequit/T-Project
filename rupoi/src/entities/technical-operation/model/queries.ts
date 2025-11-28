import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { technicalOperationService } from '../api/service'
import type { TechnicalOperationDTO, TechnicalOperationListDTO } from './types'
import { technicalOperationKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Technical Operation Queries ===
export function useTechnicalOperationList() {
  return useQuery<TechnicalOperationListDTO>({
    queryKey: technicalOperationKeys.list(),
    queryFn: () => technicalOperationService.getList(),
  })
}

export function useTechnicalOperationOne(id: Ref<ID>) {
  const enabled = computed(() => !!id.value)

  return useQuery<TechnicalOperationDTO>({
    queryKey: technicalOperationKeys.getOneRefId(id),
    queryFn: () => technicalOperationService.getById(id.value),
    enabled,
  })
}
