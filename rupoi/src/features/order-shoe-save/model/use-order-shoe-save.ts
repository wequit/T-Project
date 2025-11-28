import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { OrderShoeDTO, OrderShoeFormValues } from '@rupoi/entities/order-shoe'
import { useOrderShoe, orderShoeMappers } from '@rupoi/entities/order-shoe'
import type { ID, UUID } from '@rupoi/shared/model'

export type UseOrderShoeSaveProps = {
  orderShoeId?: MaybeRefOrGetter<ID | null>
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (orderShoeId: ID) => void
}

export function useOrderShoeSave(props: UseOrderShoeSaveProps) {
  const orderShoe = useOrderShoe({ id: props.orderShoeId })
  const isEditMode = computed(() => !!orderShoe.orderShoeId.value)

  async function submit(formValues: OrderShoeFormValues): Promise<OrderShoeDTO | null> {
    try {
      let savedOrderShoeId: ID

      // CreateMode: создаем только OrderShoe
      if (!isEditMode.value) {
        const currentPersonId = toValue(props.personId)
        if (!currentPersonId) {
          throw new Error('personId is required for creating order shoe')
        }

        const orderData = orderShoeMappers.formValuesToCreateDTO(formValues, currentPersonId)
        const createdOrder = await orderShoe.createOrderShoeMutation.mutateAsync(orderData)
        savedOrderShoeId = createdOrder.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedOrderShoeId)
        return createdOrder
      }

      // EditMode: обновляем OrderShoe
      savedOrderShoeId = orderShoe.currentOrderShoeId.value!
      const personId = orderShoe.orderShoe.value?.person?.id

      if (!personId) {
        throw new Error('personId is required for updating order shoe')
      }

      const orderData = orderShoeMappers.formValuesToUpdateDTO(formValues, personId)
      const updatedOrder = await orderShoe.updateOrderShoeMutation.mutateAsync({ 
        id: savedOrderShoeId, 
        data: orderData 
      })

      return updatedOrder
    } catch (error) {
      console.error('Error saving order shoe:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: orderShoe.isLoading,
    orderShoe: orderShoe.orderShoe,
    query: orderShoe.query,
    submit,
  }
}

