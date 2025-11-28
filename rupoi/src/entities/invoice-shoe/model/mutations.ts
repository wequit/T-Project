import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { invoiceShoeService } from '../api/service'
import type { InvoiceShoeCreateDTO, InvoiceShoeStatusPatchDTO, InvoiceShoeUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { invoiceShoeKeys } from './keys'

// === Invoice Shoe Mutations ===
export function useCreateInvoiceShoe() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: InvoiceShoeCreateDTO) => invoiceShoeService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateInvoiceShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceShoeUpdateDTO }) => 
      invoiceShoeService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceShoeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно обновлена',
        type: 'primary',
      })
    }
  })
}

export function useDeleteInvoiceShoe() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => invoiceShoeService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно удалена',
        type: 'primary',
      })
    }
  })
}

export function usePatchInvoiceShoeStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceShoeStatusPatchDTO }) => 
      invoiceShoeService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceShoeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceShoeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Статус накладной успешно изменен',
        type: 'primary',
      })
    }
  })
}
