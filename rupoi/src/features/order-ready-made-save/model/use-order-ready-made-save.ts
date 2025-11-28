import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { OrderReadyMadeDTO, OrderReadyMadeFormValues } from '@rupoi/entities/order-ready-made'
import { useOrderReadyMade, orderReadyMadeMappers } from '@rupoi/entities/order-ready-made'
import type { ID, UUID } from '@rupoi/shared/model'

export type UseOrderReadyMadeSaveProps = {
  orderReadyMadeId?: MaybeRefOrGetter<ID | null>
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (orderReadyMadeId: ID) => void
}

export function useOrderReadyMadeSave(props: UseOrderReadyMadeSaveProps) {
  const orderReadyMade = useOrderReadyMade({ id: props.orderReadyMadeId })
  const isEditMode = computed(() => !!orderReadyMade.orderReadyMadeId.value)

  async function submit(formValues: OrderReadyMadeFormValues): Promise<OrderReadyMadeDTO | null> {
    try {
      let savedOrderReadyMadeId: ID

      // CreateMode: создаем только OrderReadyMade
      if (!isEditMode.value) {
        const currentPersonId = toValue(props.personId)
        if (!currentPersonId) {
          throw new Error('personId is required for creating order ready-made')
        }

        const orderData = orderReadyMadeMappers.formValuesToCreateDTO(formValues, currentPersonId)
        const createdOrder = await orderReadyMade.createOrderReadyMadeMutation.mutateAsync(orderData)
        savedOrderReadyMadeId = createdOrder.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedOrderReadyMadeId)
        return createdOrder
      }

      // EditMode: обновляем OrderReadyMade
      savedOrderReadyMadeId = orderReadyMade.currentOrderReadyMadeId.value!
      const personId = orderReadyMade.orderReadyMade.value?.person?.id

      if (!personId) {
        throw new Error('personId is required for updating order ready-made')
      }

      const orderData = orderReadyMadeMappers.formValuesToUpdateDTO(formValues, personId)
      const updatedOrder = await orderReadyMade.updateOrderReadyMadeMutation.mutateAsync({ 
        id: savedOrderReadyMadeId, 
        data: orderData 
      })

      return updatedOrder
    } catch (error) {
      console.error('Error saving order ready-made:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: orderReadyMade.isLoading,
    orderReadyMade: orderReadyMade.orderReadyMade,
    query: orderReadyMade.query,
    submit,
  }
}

