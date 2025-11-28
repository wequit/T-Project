import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { componentProsthesisService } from '../api/service'
import type { ComponentProsthesisCreateDTO, ComponentProsthesisUpdateDTO, ComponentProsthesisDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { orderProsthesisKeys } from '@rupoi/entities/order-prosthesis'

// === Component Prosthesis Mutations ===
export function useCreateComponentProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: ComponentProsthesisCreateDTO) => componentProsthesisService.create(data),
    onSuccess: (result: ComponentProsthesisDTO) => {
      if (result.prosthesisOrderId) {
        queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(result.prosthesisOrderId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Компонент протеза успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateComponentProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: ComponentProsthesisUpdateDTO }) => 
      componentProsthesisService.updateById(id, data),
    onSuccess: (result: ComponentProsthesisDTO) => {
      if (result.prosthesisOrderId) {
        queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(result.prosthesisOrderId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Компонент протеза успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteComponentProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, orderProsthesisId }: { id: ID; orderProsthesisId: ID }) => 
      componentProsthesisService.deleteById(id),
    onSuccess: (_, variables) => {
      if (variables.orderProsthesisId) {
        queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(variables.orderProsthesisId) })
      }
      toast.add({
        title: 'Успешно',
        message: 'Компонент протеза успешно удален',
        type: 'primary',
      })
    },
  })
}
