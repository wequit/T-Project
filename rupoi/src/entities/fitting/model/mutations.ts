import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { fittingService } from '../api/service'
import type { FittingCreateDTO, FittingUpdateDTO, FittingDTO } from './types'
import { FittingKind } from '../constant'
import type { ID } from '@rupoi/shared/model'
import { orderProsthesisKeys } from '@rupoi/entities/order-prosthesis'
import { orderOttobockKeys } from '@rupoi/entities/order-ottobock'
import { orderShoeKeys } from '@rupoi/entities/order-shoe'
import { orderReadyMadeKeys } from '@rupoi/entities/order-ready-made'
import { orderRepairKeys } from '@rupoi/entities/order-repair'

// Helper function to extract order ID from fitting result based on kind
function getOrderIdFromFitting(result: FittingDTO, kind: FittingKind): ID | null {
  // Используем динамический доступ для извлечения ID заказа из результата
  const fieldMap: Record<FittingKind, string> = {
    [FittingKind.PROSTHESIS]: 'prosthesisOrderId',
    [FittingKind.OTTOBOCK]: 'ottobockOrderId',
    [FittingKind.READY_MADE]: 'readyPoiOrderId',
    [FittingKind.SHOE]: 'shoeOrderId',
    [FittingKind.REPAIR]: 'repairOrderId',
  }
  
  const field = fieldMap[kind]
  return (result as Record<string, unknown>)[field] as ID ?? null
}

// Helper function to get the appropriate order keys based on kind
function getOrderKeysForKind(kind: FittingKind, orderId: ID) {
  switch (kind) {
    case FittingKind.PROSTHESIS:
      return orderProsthesisKeys.getOneId(orderId)
    case FittingKind.OTTOBOCK:
      return orderOttobockKeys.getOneId(orderId)
    case FittingKind.READY_MADE:
      return orderReadyMadeKeys.getOneId(orderId)
    case FittingKind.SHOE:
      return orderShoeKeys.getOneId(orderId)
    case FittingKind.REPAIR:
      return orderRepairKeys.getOneId(orderId)
    default:
      return null
  }
}

// === Fitting Mutations ===
export function useCreateFitting(kind: FittingKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: FittingCreateDTO) => fittingService.create(kind, data),
    onSuccess: (result) => {
      const orderId = getOrderIdFromFitting(result, kind)
      if (orderId) {
        const queryKey = getOrderKeysForKind(kind, orderId)
        if (queryKey) {
          queryClient.invalidateQueries({ 
            queryKey,
            exact: false 
          })
        }
      }
      toast.add({
        title: 'Успешно',
        message: 'Примерка успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateFitting(kind: FittingKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: FittingUpdateDTO }) => 
      fittingService.updateById(kind, id, data),
    onSuccess: (result) => {
      const orderId = getOrderIdFromFitting(result, kind)
      if (orderId) {
        const queryKey = getOrderKeysForKind(kind, orderId)
        if (queryKey) {
          queryClient.invalidateQueries({ 
            queryKey,
            exact: false 
          })
        }
      }
      toast.add({
        title: 'Успешно',
        message: 'Примерка успешно обновлена',
        type: 'primary',
      })
    },
  })
}

export function useDeleteFitting(kind: FittingKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id }: { id: ID; orderId: ID }) => 
      fittingService.deleteById(kind, id),
    onSuccess: (_, variables) => {
      if (variables.orderId) {
        const queryKey = getOrderKeysForKind(kind, variables.orderId)
        if (queryKey) {
          queryClient.invalidateQueries({ 
            queryKey,
            exact: false 
          })
        }
      }
      toast.add({
        title: 'Успешно',
        message: 'Примерка успешно удалена',
        type: 'primary',
      })
    },
  })
}
