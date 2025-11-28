import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { workshopRegistryService } from '../api/service'
import type { WorkshopRegistryListDTO, WorkshopRegistryDTO, WorkshopRegistryListParams } from './types'
import { workshopRegistryKeys } from './keys'
import type { ID } from '@rupoi/shared/model'

// === Workshop Registry Queries ===
export function useWorkshopRegistryList(params?: Ref<WorkshopRegistryListParams | undefined>) {
  return useQuery<WorkshopRegistryListDTO>({
    queryKey: workshopRegistryKeys.list(params),
    queryFn: () => workshopRegistryService.getList(params?.value),
  })
}

export function useWorkshopRegistryOne(id: Ref<ID | null>) {
  const enabled = computed(() => {
    const value = id.value
    if (value === null) return false
    return typeof value === 'number' ? value > 0 : Boolean(value)
  })

  return useQuery<WorkshopRegistryDTO>({
    queryKey: workshopRegistryKeys.getOneRefId(id),
    queryFn: () => {
      if (id.value === null) {
        throw new Error('ID cannot be null')
      }
      return workshopRegistryService.getById(id.value)
    },
    enabled,
  })
}

