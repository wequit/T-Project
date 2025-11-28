import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAToast } from '@common/shared/ui'
import { invoiceRepairService } from '../api/service'
import type { InvoiceRepairCreateDTO, InvoiceRepairStatusPatchDTO, InvoiceRepairUpdateDTO } from './types'
import type { ID } from '@rupoi/shared/model'
import { invoiceRepairKeys } from './keys'

// === Invoice Repair Mutations ===
export function useCreateInvoiceRepair() {
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (data: InvoiceRepairCreateDTO) => invoiceRepairService.create(data),
    onSuccess: () => {
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно создана',
        type: 'primary',
      })
    },
  })
}

export function useUpdateInvoiceRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceRepairUpdateDTO }) => 
      invoiceRepairService.updateById(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceRepairKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно обновлена',
        type: 'primary',
      })
    }
  })
}

export function useDeleteInvoiceRepair() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: (id: ID) => invoiceRepairService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Накладная успешно удалена',
        type: 'primary',
      })
    }
  })
}

export function usePatchInvoiceRepairStatus() {
  const queryClient = useQueryClient()
  const toast = useAToast()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: ID; data: InvoiceRepairStatusPatchDTO }) => 
      invoiceRepairService.patchStatus(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: invoiceRepairKeys.getOneId(result.id) })
      queryClient.invalidateQueries({ queryKey: invoiceRepairKeys.key() })
      toast.add({
        title: 'Успешно',
        message: 'Статус накладной успешно изменен',
        type: 'primary',
      })
    }
  })
}
