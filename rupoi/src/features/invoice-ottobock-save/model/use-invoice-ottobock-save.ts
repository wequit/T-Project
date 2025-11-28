import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { InvoiceOttobockDTO, InvoiceOttobockFormValues } from '@rupoi/entities/invoice-ottobock'
import { useInvoiceOttobock, invoiceOttobockMappers } from '@rupoi/entities/invoice-ottobock'
import { useOrderOttobock } from '@rupoi/entities/order-ottobock'
import type { ID } from '@rupoi/shared/model'

export type UseInvoiceOttobockSaveProps = {
  invoiceOttobockId?: MaybeRefOrGetter<ID | null>
  orderOttobockId?: MaybeRefOrGetter<ID | null>
  onSuccess?: (invoiceOttobockId: ID) => void
}

export function useInvoiceOttobockSave(props: UseInvoiceOttobockSaveProps) {
  const invoiceOttobock = useInvoiceOttobock({ id: props.invoiceOttobockId })
  const isEditMode = computed(() => !!invoiceOttobock.invoiceOttobockId.value)
  
  // В режиме создания загружаем заказ по ID, в режиме редактирования используем order из invoice
  const orderOttobock = useOrderOttobock({ 
    id: computed(() => isEditMode.value ? null : (toValue(props.orderOttobockId) ?? null))
  })

  async function submit(formValues: InvoiceOttobockFormValues): Promise<InvoiceOttobockDTO | null> {
    try {
      let savedInvoiceOttobockId: ID

      // CreateMode: создаем Invoice Ottobock
      if (!isEditMode.value) {
        const currentOrderId = toValue(props.orderOttobockId)
        if (!currentOrderId) {
          throw new Error('orderOttobockId is required for creating invoice ottobock')
        }

        const invoiceData = invoiceOttobockMappers.formValuesToCreateDTO(formValues, Number(currentOrderId))
        const createdInvoice = await invoiceOttobock.createInvoiceOttobockMutation.mutateAsync(invoiceData)
        savedInvoiceOttobockId = createdInvoice.id
        
        props.onSuccess?.(savedInvoiceOttobockId)
        return createdInvoice
      }

      // EditMode: обновляем Invoice Ottobock
      savedInvoiceOttobockId = invoiceOttobock.currentInvoiceOttobockId.value!

      const invoiceData = invoiceOttobockMappers.formValuesToUpdateDTO(formValues)
      const updatedInvoice = await invoiceOttobock.updateInvoiceOttobockMutation.mutateAsync({ 
        id: savedInvoiceOttobockId, 
        data: invoiceData 
      })

      return updatedInvoice
    } catch (error) {
      console.error('Error saving invoice ottobock:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: computed(() => invoiceOttobock.isLoading.value || orderOttobock.isLoading.value),
    invoiceOttobock: invoiceOttobock.invoiceOttobock,
    // В режиме редактирования берем заказ из invoice.order, в режиме создания из отдельного запроса
    orderOttobock: computed(() => {
      if (isEditMode.value) {
        return invoiceOttobock.invoiceOttobock.value?.order ?? null
      }
      return orderOttobock.orderOttobock.value
    }),
    query: invoiceOttobock.query,
    orderQuery: orderOttobock.query,
    submit,
  }
}


