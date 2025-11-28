import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { invoiceProsthesisService } from '../api/service'
import type { InvoiceProsthesisCreateDTO, InvoiceProsthesisStatusPatchDTO, InvoiceProsthesisUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { invoiceProsthesisKeys } from './keys'

// === Invoice Prosthesis Mutations ===
export function useCreateInvoiceProsthesis() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: InvoiceProsthesisCreateDTO) => invoiceProsthesisService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateInvoiceProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceProsthesisUpdateDTO }) => 
      invoiceProsthesisService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceProsthesisKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно обновлена',
        type: 'primary',
      })
    }
  })
}

export function useDeleteInvoiceProsthesis() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => invoiceProsthesisService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно удалена',
        type: 'primary',
      })
    }
  })
}

export function usePatchInvoiceProsthesisStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceProsthesisStatusPatchDTO }) => 
      invoiceProsthesisService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceProsthesisKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceProsthesisKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Статус накладной успешно изменен',
        type: 'primary',
      })
    }
  })
}
