import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { componentProsthesisService } from '../api/service'
import type { 
  ComponentProsthesisDTO, 
  ComponentProsthesisListDTO, 
  ComponentProsthesisListParams 
} from './types'
import { componentProsthesisKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Component Prosthesis Queries ===
export function useComponentProsthesisList(params?: Ref<ComponentProsthesisListParams | undefined>) {
  return useQuery<ComponentProsthesisListDTO>({
    queryKey: componentProsthesisKeys.list(params),
    queryFn: () => componentProsthesisService.getList(params?.value),
  })
}

export function useComponentProsthesisOne(id: Ref<ID>) {
  const enabled = computed(() => !!id.value)

  return useQuery<ComponentProsthesisDTO>({
    queryKey: componentProsthesisKeys.getOneRefId(id),
    queryFn: () => componentProsthesisService.getById(id.value),
    enabled,
  })
}
