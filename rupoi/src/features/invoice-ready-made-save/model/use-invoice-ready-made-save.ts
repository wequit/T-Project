import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { InvoiceReadyMadeDTO, InvoiceReadyMadeFormValues } from '@rupoi/entities/invoice-ready-made'
import { useInvoiceReadyMade, invoiceReadyMadeMappers } from '@rupoi/entities/invoice-ready-made'
import { useOrderReadyMade } from '@rupoi/entities/order-ready-made'
import type { ID } from '@rupoi/shared/model'

export type UseInvoiceReadyMadeSaveProps = {
  invoiceReadyMadeId?: MaybeRefOrGetter<ID | null>
  orderReadyMadeId?: MaybeRefOrGetter<ID | null>
  onSuccess?: (invoiceReadyMadeId: ID) => void
}

export function useInvoiceReadyMadeSave(props: UseInvoiceReadyMadeSaveProps) {
  const invoiceReadyMade = useInvoiceReadyMade({ id: props.invoiceReadyMadeId })
  const isEditMode = computed(() => !!invoiceReadyMade.invoiceReadyMadeId.value)
  
  // В режиме создания загружаем заказ по ID, в режиме редактирования используем order из invoice
  const orderReadyMade = useOrderReadyMade({ 
    id: computed(() => isEditMode.value ? null : (toValue(props.orderReadyMadeId) ?? null))
  })

  async function submit(formValues: InvoiceReadyMadeFormValues): Promise<InvoiceReadyMadeDTO | null> {
    try {
      let savedInvoiceReadyMadeId: ID

      // CreateMode: создаем Invoice Ready Made
      if (!isEditMode.value) {
        const currentOrderId = toValue(props.orderReadyMadeId)
        if (!currentOrderId) {
          throw new Error('orderReadyMadeId is required for creating invoice ready-made')
        }

        // Передаем orderId из выбранного заказа
        const invoiceData = invoiceReadyMadeMappers.formValuesToCreateDTO(formValues, Number(currentOrderId))
        const createdInvoice = await invoiceReadyMade.createInvoiceReadyMadeMutation.mutateAsync(invoiceData)
        savedInvoiceReadyMadeId = createdInvoice.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedInvoiceReadyMadeId)
        return createdInvoice
      }

      // EditMode: обновляем Invoice Ready Made
      savedInvoiceReadyMadeId = invoiceReadyMade.currentInvoiceReadyMadeId.value!

      const invoiceData = invoiceReadyMadeMappers.formValuesToUpdateDTO(formValues)
      const updatedInvoice = await invoiceReadyMade.updateInvoiceReadyMadeMutation.mutateAsync({ 
        id: savedInvoiceReadyMadeId, 
        data: invoiceData 
      })

      return updatedInvoice
    } catch (error) {
      console.error('Error saving invoice ready-made:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: computed(() => invoiceReadyMade.isLoading.value || orderReadyMade.isLoading.value),
    invoiceReadyMade: invoiceReadyMade.invoiceReadyMade,
    // В режиме редактирования берем заказ из invoice.order, в режиме создания из отдельного запроса
    orderReadyMade: computed(() => {
      if (isEditMode.value) {
        return invoiceReadyMade.invoiceReadyMade.value?.order ?? null
      }
      return orderReadyMade.orderReadyMade.value
    }),
    query: invoiceReadyMade.query,
    orderQuery: orderReadyMade.query,
    submit,
  }
}

