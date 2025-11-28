import type { Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { WorkshopRegistryListParams } from './types'

export const workshopRegistryKeys = {
  key: () => ['workshop-registry'] as const,

  list: (params?: Ref<WorkshopRegistryListParams | undefined>) => [...workshopRegistryKeys.key(), 'list', params] as const,
  getOneRefId: (id: Ref<ID | null>) => [...workshopRegistryKeys.key(), 'getOne', id] as const,
  getOneId: (id: ID) => [...workshopRegistryKeys.key(), 'getOne', id] as const,
}

