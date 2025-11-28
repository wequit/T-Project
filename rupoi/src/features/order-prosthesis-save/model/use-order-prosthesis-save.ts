import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { OrderProsthesisDTO, OrderProsthesisFormValues } from '@rupoi/entities/order-prosthesis'
import { useOrderProsthesis, orderProsthesisMappers } from '@rupoi/entities/order-prosthesis'
import type { ID, UUID } from '@rupoi/shared/model'

export type UseOrderProsthesisSaveProps = {
  orderProsthesisId?: MaybeRefOrGetter<ID | null>
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (orderProsthesisId: ID) => void
}

export function useOrderProsthesisSave(props: UseOrderProsthesisSaveProps) {
  const orderProsthesis = useOrderProsthesis({ id: props.orderProsthesisId })
  const isEditMode = computed(() => !!orderProsthesis.orderProsthesisId.value)

  async function submit(formValues: OrderProsthesisFormValues): Promise<OrderProsthesisDTO | null> {
    try {
      let savedOrderProsthesisId: ID

      // CreateMode: создаем только OrderProsthesis
      if (!isEditMode.value) {
        const currentPersonId = toValue(props.personId)
        if (!currentPersonId) {
          throw new Error('personId is required for creating order prosthesis')
        }

        const orderData = orderProsthesisMappers.formValuesToCreateDTO(formValues, currentPersonId)
        const createdOrder = await orderProsthesis.createOrderProsthesisMutation.mutateAsync(orderData)
        savedOrderProsthesisId = createdOrder.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedOrderProsthesisId)
        return createdOrder
      }

      // EditMode: обновляем OrderProsthesis
      savedOrderProsthesisId = orderProsthesis.currentOrderProsthesisId.value!
      const personId = orderProsthesis.orderProsthesis.value?.person?.id

      if (!personId) {
        throw new Error('personId is required for updating order prosthesis')
      }

      const orderData = orderProsthesisMappers.formValuesToUpdateDTO(formValues, personId)
      const updatedOrder = await orderProsthesis.updateOrderProsthesisMutation.mutateAsync({ 
        id: savedOrderProsthesisId, 
        data: orderData 
      })

      return updatedOrder
    } catch (error) {
      console.error('Error saving order prosthesis:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: orderProsthesis.isLoading,
    orderProsthesis: orderProsthesis.orderProsthesis,
    query: orderProsthesis.query,
    submit,
  }
}

