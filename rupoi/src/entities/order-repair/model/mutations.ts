import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { orderRepairService } from '../api/service'
import type { OrderRepairCreateDTO, OrderRepairStatusPatchDTO, OrderRepairUpdateDTO, OrderRepairAssignWorkshopDTO } from './types'
import type { ID, OrderFileCreateDTO } from '@rupoi/shared/model'
import { orderRepairKeys } from './keys'

// === Order Repair Mutations ===
export function useCreateOrderRepair() {
  const toast = useAToast()

  return useMutation({
    mutationFn: (data: OrderRepairCreateDTO) => orderRepairService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Заказ на ремонт успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateOrderRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderRepairUpdateDTO }) =>
      orderRepairService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на ремонт успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteOrderRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: (id: ID) => orderRepairService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Заказ на ремонт успешно удален',
        type: 'primary',
      })
    },
  })
}

export function usePatchOrderRepairStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderRepairStatusPatchDTO }) =>
      orderRepairService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      queryClient.invalidateQueries({ queryKey: ['warehouse-orders'] })
      toast.add({
        title: 'Успешно',
        message: 'Статус заказа успешно изменен',
        type: 'primary',
      })
    },
  })
}

export function useAssignWorkshopOrderRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: OrderRepairAssignWorkshopDTO }) =>
      orderRepairService.assignWorkshop(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Мастерская успешно назначена',
        type: 'primary',
      })
    }
  })
}

export function useAddFileOrderRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: ID; data: OrderFileCreateDTO }) =>
      orderRepairService.addFile(orderId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно добавлен',
        type: 'primary',
      })
    },
  })
}

export function useRemoveFileOrderRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()

  return useMutation({
    mutationFn: ({ fileId }: { fileId: ID; orderId: ID }) =>
      orderRepairService.removeFile(fileId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.getOneId(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: orderRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Файл успешно удален',
        type: 'primary',
      })
    },
  })
}
