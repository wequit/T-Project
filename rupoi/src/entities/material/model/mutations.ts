import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { materialService } from '../api/service'
import type { MaterialCreateDTO, MaterialUpdateDTO, MaterialDTO } from './types'
import { MaterialKind } from '../constant'
import type { ID } from '@rupoi/shared/model'
import { orderOttobockKeys } from '@rupoi/entities/order-ottobock'
import { orderReadyMadeKeys } from '@rupoi/entities/order-ready-made'
import { orderRepairKeys } from '@rupoi/entities/order-repair'

function getOrderIdFromMaterial(result: MaterialDTO, kind: MaterialKind): ID | null {
  const fieldMap: Record<MaterialKind, string> = {
    [MaterialKind.OTTOBOCK]: 'ottobockOrderId',
    [MaterialKind.READY_MADE]: 'readyPoiOrderId',
    [MaterialKind.REPAIR]: 'repairOrderId',
  }
  const field = fieldMap[kind]
  return (result as Record<string, unknown>)[field] as ID ?? null
}

function getOrderKeysForKind(kind: MaterialKind, orderId: ID) {
  switch (kind) {
    case MaterialKind.OTTOBOCK:
      return orderOttobockKeys.getOneId(orderId)
    case MaterialKind.READY_MADE:
      return orderReadyMadeKeys.getOneId(orderId)
    case MaterialKind.REPAIR:
      return orderRepairKeys.getOneId(orderId)
    default:
      return null
  }
}

// === Material Mutations ===
export function useCreateMaterial(kind: MaterialKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: MaterialCreateDTO) => materialService.create(kind, data),
    onSuccess: (result: MaterialDTO) => {
      console.log('Material created:', result, 'kind:', kind)
      const orderId = getOrderIdFromMaterial(result, kind)
      console.log('Extracted orderId:', orderId)
      if (orderId) {
        const queryKey = getOrderKeysForKind(kind, orderId)
        if (queryKey) {
          console.log('Invalidating query with key:', queryKey)
          queryClient.invalidateQueries({ queryKey })
        }
      } else {
        console.warn('No orderId extracted from material result!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Материал успешно создан',
        type: 'primary',
      })
    },
  })
}

export function useUpdateMaterial(kind: MaterialKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: MaterialUpdateDTO }) => 
      materialService.updateById(kind, id, data),
    onSuccess: (result: MaterialDTO) => {
      console.log('Material updated:', result, 'kind:', kind)
      const orderId = getOrderIdFromMaterial(result, kind)
      console.log('Extracted orderId:', orderId)
      if (orderId) {
        const queryKey = getOrderKeysForKind(kind, orderId)
        if (queryKey) {
          console.log('Invalidating query with key:', queryKey)
          queryClient.invalidateQueries({ queryKey })
        }
      } else {
        console.warn('No orderId extracted from material result!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Материал успешно обновлен',
        type: 'primary',
      })
    },
  })
}

export function useDeleteMaterial(kind: MaterialKind) {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id }: { id: ID; orderId: ID }) => 
      materialService.deleteById(kind, id),
    onSuccess: (_, variables) => {
      console.log('Material deleted, kind:', kind, 'orderId:', variables.orderId)
      if (variables.orderId) {
        const queryKey = getOrderKeysForKind(kind, variables.orderId)
        if (queryKey) {
          console.log('Invalidating query with key:', queryKey)
          queryClient.invalidateQueries({ queryKey })
        }
      } else {
        console.warn('No orderId provided for deletion!')
      }
      toast.add({
        title: 'Успешно',
        message: 'Материал успешно удален',
        type: 'primary',
      })
    },
  })
}
