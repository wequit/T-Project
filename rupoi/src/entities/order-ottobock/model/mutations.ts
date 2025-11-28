import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { orderOttobockService } from '../api/service'
import type { OrderOttobockCreateDTO, OrderOttobockStatusPatchDTO, OrderOttobockUpdateDTO, OrderOttobockAssignWorkshopDTO } from './types'
import type { ID, OrderFileCreateDTO } from '@rupoi/shared/model'
import { orderOttobockKeys } from './keys'

// === Order Ottobock Mutations ===
export function useCreateOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: OrderOttobockCreateDTO) => orderOttobockService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ Ottobock успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderOttobockUpdateDTO }) =>
      orderOttobockService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ Ottobock успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => orderOttobockService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ Ottobock успешно удален',
        type: 'primary',
      })
    },
  })
}

export function usePatchOrderOttobockStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderOttobockStatusPatchDTO }) =>
      orderOttobockService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      queryClient.invalidateQueries({ queryKey: ['warehouse-orders'] })
      toast.add({
        title: 'Успешно',
        message: 'Статус заказа успешно изменен',
        type: 'primary',
      })
    },
  })
}

export function useAssignWorkshopOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderOttobockAssignWorkshopDTO }) => 
      orderOttobockService.assignWorkshop(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Мастерская успешно назначена',
        type: 'primary',
      })
    }
  })
}

export function useAddFileOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: ID; data: OrderFileCreateDTO }) =>
      orderOttobockService.addFile(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно добавлен',
        type: 'primary',
      })
    },
  })
}

export function useRemoveFileOrderOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ fileId }: { fileId: ID; orderId: ID }) =>
      orderOttobockService.removeFile(fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно удален',
        type: 'primary',
      })
    },
  })
}
