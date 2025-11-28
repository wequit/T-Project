import { computed, type Ref } from 'vue'
import type { ID } from '@rupoi/shared/model'
import type { WorkshopRegistryListParams } from './types'
import {
  useWorkshopRegistryList,
  useWorkshopRegistryOne,
} from './queries'
import {
  useCreateWorkshopRegistry,
  useUpdateWorkshopRegistry,
  useDeleteWorkshopRegistry,
} from './mutations'

interface UseWorkshopRegistryOptions {
  listParams?: Ref<WorkshopRegistryListParams | undefined>
  workshopId?: Ref<ID | null>
}

export function useWorkshopRegistry(options: UseWorkshopRegistryOptions = {}) {
  const { listParams, workshopId } = options

  // Queries
  const listQuery = listParams ? useWorkshopRegistryList(listParams) : undefined
  const oneQuery = workshopId ? useWorkshopRegistryOne(workshopId) : undefined

  // Mutations
  const createWorkshopRegistryMutation = useCreateWorkshopRegistry()
  const updateWorkshopRegistryMutation = useUpdateWorkshopRegistry()
  const deleteWorkshopRegistryMutation = useDeleteWorkshopRegistry()

  // Data
  const workshopRegistryList = computed(() => listQuery?.data.value)
  const workshopRegistry = computed(() => oneQuery?.data.value)

  // Loading states
  const isLoadingList = computed(() => listQuery?.isLoading.value ?? false)
  const isLoadingOne = computed(() => oneQuery?.isLoading.value ?? false)
  const isLoading = computed(() => isLoadingList.value || isLoadingOne.value)

  return {
    // Queries
    listQuery,
    oneQuery,

    // Data
    workshopRegistryList,
    workshopRegistry,

    // Loading states
    isLoading,
    isLoadingList,
    isLoadingOne,

    // Mutations
    createWorkshopRegistryMutation,
    updateWorkshopRegistryMutation,
    deleteWorkshopRegistryMutation,
  }
}

