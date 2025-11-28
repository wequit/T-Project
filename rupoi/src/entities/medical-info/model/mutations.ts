import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { medicalInfoService } from '../api/service'
import type { MedicalInfoCreateDTO, MedicalInfoUpdateDTO, MedicalInfoDTO } from './types'
import { personKeys } from '@rupoi/entities/person'

export function useCreateMedicalInfo() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: MedicalInfoCreateDTO) => medicalInfoService.create(data),
    onSuccess: (result: MedicalInfoDTO) => {
      if (result.personId) {
        queryClient.invalidateQueries({ queryKey: personKeys.getOneId(result.personId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Медицинская информация успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateMedicalInfo() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MedicalInfoUpdateDTO }) => 
      medicalInfoService.updateById(id, data),
    onSuccess: (result: MedicalInfoDTO) => {
      if (result.personId) {
        queryClient.invalidateQueries({ queryKey: personKeys.getOneId(result.personId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Медицинская информация успешно обновлена',
        type: 'primary',
      })
    },
  })
}

export function useDeleteMedicalInfo() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id }: { id: number; personId: string }) => 
      medicalInfoService.deleteById(id),
    onSuccess: (_, variables) => {
      if (variables.personId) {
        queryClient.invalidateQueries({ queryKey: personKeys.getOneId(variables.personId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Медицинская информация успешно удалена',
        type: 'primary',
      })
    },
  })
}
