import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { orderReadyMadeService } from '../api/service'
import type { OrderReadyMadeCreateDTO, OrderReadyMadeStatusPatchDTO, OrderReadyMadeUpdateDTO, OrderReadyMadeAssignWorkshopDTO } from './types'
import type { ID, OrderFileCreateDTO } from '@rupoi/shared/model'
import { orderReadyMadeKeys } from './keys'

// === Order Ready Made Mutations ===
export function useCreateOrderReadyMade() {
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: OrderReadyMadeCreateDTO) => orderReadyMadeService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Заказ успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateOrderReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderReadyMadeUpdateDTO }) =>
      orderReadyMadeService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteOrderReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (id: ID) => orderReadyMadeService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ успешно удален',
        type: 'primary',
      })
    },
  })
}

export function usePatchOrderReadyMadeStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderReadyMadeStatusPatchDTO }) =>
      orderReadyMadeService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      queryClient.invalidateQueries({ queryKey: ['warehouse-orders'] })
      toast.add({
        title: 'Успешно',
        message: 'Статус заказа успешно изменен',
        type: 'primary',
      })
    },
  })
}

export function useAssignWorkshopOrderReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderReadyMadeAssignWorkshopDTO }) =>
      orderReadyMadeService.assignWorkshop(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Мастерская успешно назначена',
        type: 'primary',
      })
    }
  })
}

export function useAddFileOrderReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: ID; data: OrderFileCreateDTO }) =>
      orderReadyMadeService.addFile(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно добавлен',
        type: 'primary',
      })
    },
  })
}

export function useRemoveFileOrderReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ fileId }: { fileId: ID; orderId: ID }) =>
      orderReadyMadeService.removeFile(fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно удален',
        type: 'primary',
      })
    },
  })
}
