import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { workshopRegistryService } from '../api/service'
import type { WorkshopRegistryCreateDTO, WorkshopRegistryUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { workshopRegistryKeys } from './keys'

// === Workshop Registry Mutations ===
export function useCreateWorkshopRegistry() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: WorkshopRegistryCreateDTO) => workshopRegistryService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Реестр мастерской успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateWorkshopRegistry() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: WorkshopRegistryUpdateDTO }) =>
      workshopRegistryService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: workshopRegistryKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: workshopRegistryKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Реестр мастерской успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteWorkshopRegistry() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => workshopRegistryService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workshopRegistryKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Реестр мастерской успешно удален',
        type: 'primary',
      })
    },
  })
}
