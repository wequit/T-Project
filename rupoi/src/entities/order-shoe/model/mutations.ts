import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { orderShoeService } from '../api/service'
import type { OrderShoeCreateDTO, OrderShoeStatusPatchDTO, OrderShoeUpdateDTO, OrderShoeAssignWorkshopDTO } from './types'
import type { ID, OrderFileCreateDTO } from '@rupoi/shared/model'
import { orderShoeKeys } from './keys'

// === Order Shoe Mutations ===
export function useCreateOrderShoe() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: OrderShoeCreateDTO) => orderShoeService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Заказ на обувь успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateOrderShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderShoeUpdateDTO }) => 
      orderShoeService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на обувь успешно обновлен',
        type: 'primary',
      })
    }
  })
}

export function useDeleteOrderShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => orderShoeService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на обувь успешно удален',
        type: 'primary',
      })
    }
  })
}

export function usePatchOrderShoeStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderShoeStatusPatchDTO }) => 
      orderShoeService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      queryClient.invalidateQueries({ queryKey: ['warehouse-orders'] })
      toast.add({
        title: 'Успешно',
        message: 'Статус заказа успешно изменен',
        type: 'primary',
      })
    }
  })
}

export function useAssignWorkshopOrderShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderShoeAssignWorkshopDTO }) => 
      orderShoeService.assignWorkshop(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Мастерская успешно назначена',
        type: 'primary',
      })
    }
  })
}

export function useAddFileOrderShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: ID; data: OrderFileCreateDTO }) =>
      orderShoeService.addFile(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно добавлен',
        type: 'primary',
      })
    },
  })
}

export function useRemoveFileOrderShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ fileId }: { fileId: ID; orderId: ID }) =>
      orderShoeService.removeFile(fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно удален',
        type: 'primary',
      })
    },
  })
}
