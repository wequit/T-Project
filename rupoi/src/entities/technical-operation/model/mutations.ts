import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { technicalOperationService } from '../api/service'
import type { TechnicalOperationCreateDTO, TechnicalOperationUpdateDTO, TechnicalOperationDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { orderShoeKeys } from '@rupoi/entities/order-shoe'

// === Technical Operation Mutations ===
export function useCreateTechnicalOperation() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: TechnicalOperationCreateDTO) => technicalOperationService.create(data),
    onSuccess: (result: TechnicalOperationDTO) => {
      console.log('TechnicalOperation created:', result)
      console.log('shoeOrderId:', result.shoeOrderId)
      if (result.shoeOrderId) {
        const queryKey = orderShoeKeys.getOneId(result.shoeOrderId)
        console.log('Invalidating query with key:', queryKey)
        queryClient.invalidateQueries({ queryKey })
      } else {
        console.warn('No shoeOrderId in result!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Техническая операция успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateTechnicalOperation() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: TechnicalOperationUpdateDTO }) => 
      technicalOperationService.updateById(id, data),
    onSuccess: (result: TechnicalOperationDTO) => {
      console.log('TechnicalOperation updated:', result)
      console.log('shoeOrderId:', result.shoeOrderId)
      if (result.shoeOrderId) {
        const queryKey = orderShoeKeys.getOneId(result.shoeOrderId)
        console.log('Invalidating query with key:', queryKey)
        queryClient.invalidateQueries({ queryKey })
      } else {
        console.warn('No shoeOrderId in result!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Техническая операция успешно обновлена',
        type: 'primary',
      })
    },
  })
}

export function useDeleteTechnicalOperation() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id }: { id: ID; orderShoeId: ID }) => 
      technicalOperationService.deleteById(id),
    onSuccess: (_, variables) => {
      console.log('TechnicalOperation deleted, shoeOrderId:', variables.orderShoeId)
      if (variables.orderShoeId) {
        const queryKey = orderShoeKeys.getOneId(variables.orderShoeId)
        console.log('Invalidating query with key:', queryKey)
        queryClient.invalidateQueries({ queryKey })
      } else {
        console.warn('No shoeOrderId provided for deletion!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Техническая операция успешно удалена',
        type: 'primary',
      })
    },
  })
}
