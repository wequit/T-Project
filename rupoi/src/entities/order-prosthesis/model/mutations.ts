import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { orderProsthesisService } from '../api/service'
import type { OrderProsthesisCreateDTO, OrderProsthesisStatusPatchDTO, OrderProsthesisUpdateDTO, OrderProsthesisAssignWorkshopDTO } from './types'
import type { ID, OrderFileCreateDTO } from '@rupoi/shared/model'
import { orderProsthesisKeys } from './keys'

// === Order Prosthesis Mutations ===
export function useCreateOrderProsthesis() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: OrderProsthesisCreateDTO) => orderProsthesisService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Заказ на протезы успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateOrderProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderProsthesisUpdateDTO }) =>
      orderProsthesisService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на протезы успешно обновлен',
        type: 'primary',
      })
    }
  })
}

export function useDeleteOrderProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => orderProsthesisService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на протезы успешно удален',
        type: 'primary',
      })
    }
  })
}

export function usePatchOrderProsthesisStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderProsthesisStatusPatchDTO }) =>
      orderProsthesisService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      queryClient.invalidateQueries({ queryKey: ['warehouse-orders'] })
      toast.add({
        title: 'Успешно',
        message: 'Статус заказа успешно изменен',
        type: 'primary',
      })
    }
  })
}

export function useAssignWorkshopOrderProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderProsthesisAssignWorkshopDTO }) =>
      orderProsthesisService.assignWorkshop(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Мастерская успешно назначена',
        type: 'primary',
      })
    }
  })
}

export function useAddFileOrderProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: ID; data: OrderFileCreateDTO }) =>
      orderProsthesisService.addFile(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно добавлен',
        type: 'primary',
      })
    },
  })
}

export function useRemoveFileOrderProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ fileId }: { fileId: ID; orderId: ID }) =>
      orderProsthesisService.removeFile(fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно удален',
        type: 'primary',
      })
    },
  })
}
