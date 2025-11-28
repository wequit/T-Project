import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { invoiceReadyMadeService } from '../api/service'
import type { InvoiceReadyMadeCreateDTO, InvoiceReadyMadeStatusPatchDTO, InvoiceReadyMadeUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { invoiceReadyMadeKeys } from './keys'

// === Invoice Ready Made Mutations ===
export function useCreateInvoiceReadyMade() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: InvoiceReadyMadeCreateDTO) => invoiceReadyMadeService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateInvoiceReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceReadyMadeUpdateDTO }) => 
      invoiceReadyMadeService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceReadyMadeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно обновлена',
        type: 'primary',
      })
    }
  })
}

export function useDeleteInvoiceReadyMade() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => invoiceReadyMadeService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно удалена',
        type: 'primary',
      })
    }
  })
}

export function usePatchInvoiceReadyMadeStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceReadyMadeStatusPatchDTO }) => 
      invoiceReadyMadeService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceReadyMadeKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceReadyMadeKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Статус накладной успешно изменен',
        type: 'primary',
      })
    }
  })
}
