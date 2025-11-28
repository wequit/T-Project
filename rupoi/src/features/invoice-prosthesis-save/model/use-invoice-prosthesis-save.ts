import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { InvoiceProsthesisDTO, InvoiceProsthesisFormValues } from '@rupoi/entities/invoice-prosthesis'
import { useInvoiceProsthesis, invoiceProsthesisMappers } from '@rupoi/entities/invoice-prosthesis'
import { useOrderProsthesis } from '@rupoi/entities/order-prosthesis'
import type { ID } from '@rupoi/shared/model'

export type UseInvoiceProsthesisSaveProps = {
  invoiceProsthesisId?: MaybeRefOrGetter<ID | null>
  orderProsthesisId?: MaybeRefOrGetter<ID | null>
  onSuccess?: (invoiceProsthesisId: ID) => void
}

export function useInvoiceProsthesisSave(props: UseInvoiceProsthesisSaveProps) {
  const invoiceProsthesis = useInvoiceProsthesis({ id: props.invoiceProsthesisId })
  const isEditMode = computed(() => !!invoiceProsthesis.invoiceProsthesisId.value)
  
  // В режиме создания загружаем заказ по ID, в режиме редактирования используем order из invoice
  const orderProsthesis = useOrderProsthesis({ 
    id: computed(() => isEditMode.value ? null : (toValue(props.orderProsthesisId) ?? null))
  })

  async function submit(formValues: InvoiceProsthesisFormValues): Promise<InvoiceProsthesisDTO | null> {
    try {
      let savedInvoiceProsthesisId: ID

      // CreateMode: создаем Invoice Prosthesis
      if (!isEditMode.value) {
        const currentOrderId = toValue(props.orderProsthesisId)
        if (!currentOrderId) {
          throw new Error('orderProsthesisId is required for creating invoice prosthesis')
        }

        // Передаем orderId из выбранного заказа
        const invoiceData = invoiceProsthesisMappers.formValuesToCreateDTO(formValues, Number(currentOrderId))
        const createdInvoice = await invoiceProsthesis.createInvoiceProsthesisMutation.mutateAsync(invoiceData)
        savedInvoiceProsthesisId = createdInvoice.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedInvoiceProsthesisId)
        return createdInvoice
      }

      // EditMode: обновляем Invoice Prosthesis
      savedInvoiceProsthesisId = invoiceProsthesis.currentInvoiceProsthesisId.value!

      const invoiceData = invoiceProsthesisMappers.formValuesToUpdateDTO(formValues)
      const updatedInvoice = await invoiceProsthesis.updateInvoiceProsthesisMutation.mutateAsync({ 
        id: savedInvoiceProsthesisId, 
        data: invoiceData 
      })

      return updatedInvoice
    } catch (error) {
      console.error('Error saving invoice prosthesis:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: computed(() => invoiceProsthesis.isLoading.value || orderProsthesis.isLoading.value),
    invoiceProsthesis: invoiceProsthesis.invoiceProsthesis,
    // В режиме редактирования берем заказ из invoice.order, в режиме создания из отдельного запроса
    orderProsthesis: computed(() => {
      if (isEditMode.value) {
        return invoiceProsthesis.invoiceProsthesis.value?.order ?? null
      }
      return orderProsthesis.orderProsthesis.value
    }),
    query: invoiceProsthesis.query,
    orderQuery: orderProsthesis.query,
    submit,
  }
}

