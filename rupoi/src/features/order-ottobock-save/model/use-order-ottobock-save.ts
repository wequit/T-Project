import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { OrderOttobockDTO, OrderOttobockFormValues } from '@rupoi/entities/order-ottobock'
import { useOrderOttobock, orderOttobockMappers } from '@rupoi/entities/order-ottobock'
import type { ID, UUID } from '@rupoi/shared/model'

export type UseOrderOttobockSaveProps = {
  orderOttobockId?: MaybeRefOrGetter<ID | null>
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (orderOttobockId: ID) => void
}

export function useOrderOttobockSave(props: UseOrderOttobockSaveProps) {
  const orderOttobock = useOrderOttobock({ id: props.orderOttobockId })
  const isEditMode = computed(() => !!orderOttobock.orderOttobockId.value)

  async function submit(formValues: OrderOttobockFormValues): Promise<OrderOttobockDTO | null> {
    try {
      let savedOrderOttobockId: ID

      // CreateMode: создаем только OrderOttobock
      if (!isEditMode.value) {
        const currentPersonId = toValue(props.personId)
        if (!currentPersonId) {
          throw new Error('personId is required for creating order ottobock')
        }

        const orderData = orderOttobockMappers.formValuesToCreateDTO(formValues, currentPersonId)
        const createdOrder = await orderOttobock.createOrderOttobockMutation.mutateAsync(orderData)
        savedOrderOttobockId = createdOrder.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedOrderOttobockId)
        return createdOrder
      }

      // EditMode: обновляем OrderOttobock
      savedOrderOttobockId = orderOttobock.currentOrderOttobockId.value!
      const personId = orderOttobock.orderOttobock.value?.person?.id

      if (!personId) {
        throw new Error('personId is required for updating order ottobock')
      }

      const orderData = orderOttobockMappers.formValuesToUpdateDTO(formValues, personId)
      const updatedOrder = await orderOttobock.updateOrderOttobockMutation.mutateAsync({ 
        id: savedOrderOttobockId, 
        data: orderData 
      })

      return updatedOrder
    } catch (error) {
      console.error('Error saving order ottobock:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: orderOttobock.isLoading,
    orderOttobock: orderOttobock.orderOttobock,
    query: orderOttobock.query,
    submit,
  }
}

