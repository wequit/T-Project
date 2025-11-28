import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { InvoiceRepairDTO, InvoiceRepairFormValues } from '@rupoi/entities/invoice-repair'
import { useInvoiceRepair, invoiceRepairMappers } from '@rupoi/entities/invoice-repair'
import { useOrderRepair } from '@rupoi/entities/order-repair'
import type { ID } from '@rupoi/shared/model'

export type UseInvoiceRepairSaveProps = {
  invoiceRepairId?: MaybeRefOrGetter<ID | null>
  orderRepairId?: MaybeRefOrGetter<ID | null>
  onSuccess?: (invoiceRepairId: ID) => void
}

export function useInvoiceRepairSave(props: UseInvoiceRepairSaveProps) {
  const invoiceRepair = useInvoiceRepair({ id: props.invoiceRepairId })
  const isEditMode = computed(() => !!invoiceRepair.invoiceRepairId.value)
  
  // В режиме создания загружаем заказ по ID, в режиме редактирования используем order из invoice
  const orderRepair = useOrderRepair({ 
    id: computed(() => isEditMode.value ? null : (toValue(props.orderRepairId) ?? null))
  })

  async function submit(formValues: InvoiceRepairFormValues): Promise<InvoiceRepairDTO | null> {
    try {
      let savedInvoiceRepairId: ID

      // CreateMode: создаем Invoice Repair
      if (!isEditMode.value) {
        const currentOrderId = toValue(props.orderRepairId)
        if (!currentOrderId) {
          throw new Error('orderRepairId is required for creating invoice repair')
        }

        // Передаем orderId из выбранного заказа
        const invoiceData = invoiceRepairMappers.formValuesToCreateDTO(formValues, Number(currentOrderId))
        const createdInvoice = await invoiceRepair.createInvoiceRepairMutation.mutateAsync(invoiceData)
        savedInvoiceRepairId = createdInvoice.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedInvoiceRepairId)
        return createdInvoice
      }

      // EditMode: обновляем Invoice Repair
      savedInvoiceRepairId = invoiceRepair.currentInvoiceRepairId.value!

      const invoiceData = invoiceRepairMappers.formValuesToUpdateDTO(formValues)
      const updatedInvoice = await invoiceRepair.updateInvoiceRepairMutation.mutateAsync({ 
        id: savedInvoiceRepairId, 
        data: invoiceData 
      })

      return updatedInvoice
    } catch (error) {
      console.error('Error saving invoice repair:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: computed(() => invoiceRepair.isLoading.value || orderRepair.isLoading.value),
    invoiceRepair: invoiceRepair.invoiceRepair,
    // В режиме редактирования берем заказ из invoice.order, в режиме создания из отдельного запроса
    orderRepair: computed(() => {
      if (isEditMode.value) {
        return invoiceRepair.invoiceRepair.value?.order ?? null
      }
      return orderRepair.orderRepair.value
    }),
    query: invoiceRepair.query,
    orderQuery: orderRepair.query,
    submit,
  }
}

