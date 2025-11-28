import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { invoiceOttobockService } from '../api/service'
import type { InvoiceOttobockCreateDTO, InvoiceOttobockStatusPatchDTO, InvoiceOttobockUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { invoiceOttobockKeys } from './keys'

// === Invoice Ottobock Mutations ===
export function useCreateInvoiceOttobock() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: InvoiceOttobockCreateDTO) => invoiceOttobockService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateInvoiceOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceOttobockUpdateDTO }) => 
      invoiceOttobockService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceOttobockKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно обновлена',
        type: 'primary',
      })
    }
  })
}

export function useDeleteInvoiceOttobock() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => invoiceOttobockService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно удалена',
        type: 'primary',
      })
    }
  })
}

export function usePatchInvoiceOttobockStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceOttobockStatusPatchDTO }) => 
      invoiceOttobockService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceOttobockKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceOttobockKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Статус накладной успешно изменен',
        type: 'primary',
      })
    }
  })
}
