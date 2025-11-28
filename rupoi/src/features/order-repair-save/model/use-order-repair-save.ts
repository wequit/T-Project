import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { OrderRepairDTO, OrderRepairFormValues } from '@rupoi/entities/order-repair'
import { useOrderRepair, orderRepairMappers } from '@rupoi/entities/order-repair'
import type { ID, UUID } from '@rupoi/shared/model'

export type UseOrderRepairSaveProps = {
  orderRepairId?: MaybeRefOrGetter<ID | null>
  personId?: MaybeRefOrGetter<UUID | null>
  onSuccess?: (orderRepairId: ID) => void
}

export function useOrderRepairSave(props: UseOrderRepairSaveProps) {
  const orderRepair = useOrderRepair({ id: props.orderRepairId })
  const isEditMode = computed(() => !!orderRepair.orderRepairId.value)

  async function submit(formValues: OrderRepairFormValues): Promise<OrderRepairDTO | null> {
    try {
      let savedOrderRepairId: ID

      // CreateMode: создаем только OrderRepair
      if (!isEditMode.value) {
        const currentPersonId = toValue(props.personId)
        if (!currentPersonId) {
          throw new Error('personId is required for creating order repair')
        }

        const orderData = orderRepairMappers.formValuesToCreateDTO(formValues, currentPersonId)
        const createdOrder = await orderRepair.createOrderRepairMutation.mutateAsync(orderData)
        savedOrderRepairId = createdOrder.id
        
        // Вызываем callback для редиректа
        props.onSuccess?.(savedOrderRepairId)
        return createdOrder
      }

      // EditMode: обновляем OrderRepair
      savedOrderRepairId = orderRepair.currentOrderRepairId.value!
      const personId = orderRepair.orderRepair.value?.person?.id

      if (!personId) {
        throw new Error('personId is required for updating order repair')
      }

      const orderData = orderRepairMappers.formValuesToUpdateDTO(formValues, personId)
      const updatedOrder = await orderRepair.updateOrderRepairMutation.mutateAsync({ 
        id: savedOrderRepairId, 
        data: orderData 
      })

      return updatedOrder
    } catch (error) {
      console.error('Error saving order repair:', error)
      throw error
    }
  }

  return {
    isEditMode,
    isLoading: orderRepair.isLoading,
    orderRepair: orderRepair.orderRepair,
    query: orderRepair.query,
    submit,
  }
}

