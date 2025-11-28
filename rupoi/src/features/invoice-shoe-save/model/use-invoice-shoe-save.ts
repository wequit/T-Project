import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { InvoiceShoeDTO, InvoiceShoeFormValues } from '@rupoi/entities/invoice-shoe'
import { useInvoiceShoe, invoiceShoeMappers } from '@rupoi/entities/invoice-shoe'
import { useOrderShoe } from '@rupoi/entities/order-shoe'
import type { ID } from '@rupoi/shared/model'

export type UseInvoiceShoeSaveProps = {
  invoiceShoeId?: MaybeRefOrGetter<ID | null>
  orderShoeId?: MaybeRefOrGetter<ID | null>
  onSuccess?: (invoiceShoeId: ID) => void
}

export function useInvoiceShoeSave(props: UseInvoiceShoeSaveProps) {
  const invoiceShoe = useInvoiceShoe({ id: props.invoiceShoeId })
  const isEditMode = computed(() => !!invoiceShoe.invoiceShoeId.value)
  
  // В режиме создания загружаем заказ по ID, в режиме редактирования используем order из invoice
  const orderShoe = useOrderShoe({ 
    id: computed(() => isEditMode.value ? null : (toValue(props.orderShoeId) ?? null))
  })

  async function submit(formValues: InvoiceShoeFormValues): Promise<InvoiceShoeDTO | null> {
    try {
      let savedInvoiceShoeId: ID

      // CreateMode: создаем Invoice Shoe
      if (!isEditMode.value) {
        const currentOrderId = toValue(props.orderShoeId)
        if (!currentOrderId) {
          throw new Error('orderShoeId is required for creating invoice shoe')
        }

        // Передаем orderId из выбранного заказа
        const invoiceData = invoiceShoeMappers.formValuesToCreateDTO(formValues, Number(currentOrderId))
        const createdInvoice = await invoiceShoe.createInvoiceShoeMutation.mutateAsync(invoiceData)
        savedInvoiceShoeId = createdInvoice.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedInvoiceShoeId)
        return createdInvoice
      }

      // EditMode: обновляем Invoice Shoe
      savedInvoiceShoeId = invoiceShoe.currentInvoiceShoeId.value!

      const invoiceData = invoiceShoeMappers.formValuesToUpdateDTO(formValues)
      const updatedInvoice = await invoiceShoe.updateInvoiceShoeMutation.mutateAsync({ 
        id: savedInvoiceShoeId, 
        data: invoiceData 
      })

      return updatedInvoice
    } catch (error) {
      console.error('Error saving invoice shoe:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: computed(() => invoiceShoe.isLoading.value || orderShoe.isLoading.value),
    invoiceShoe: invoiceShoe.invoiceShoe,
    // В режиме редактирования берем заказ из invoice.order, в режиме создания из отдельного запроса
    orderShoe: computed(() => {
      if (isEditMode.value) {
        return invoiceShoe.invoiceShoe.value?.order ?? null
      }
      return orderShoe.orderShoe.value
    }),
    query: invoiceShoe.query,
    orderQuery: orderShoe.query,
    submit,
  }
}

