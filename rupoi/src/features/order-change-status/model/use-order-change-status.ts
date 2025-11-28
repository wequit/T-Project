import { computed, ref } from 'vue'
import type { OrderStatus } from '@rupoi/shared/constant'
import type { OrderChangeStatusProps } from './types'
import { OrderKind as OrderKindEnum } from '../constant'

// Import mutations for each order type
import { usePatchOrderProsthesisStatus } from '@rupoi/entities/order-prosthesis'
import { usePatchOrderShoeStatus } from '@rupoi/entities/order-shoe'
import { usePatchOrderOttobockStatus } from '@rupoi/entities/order-ottobock'
import { usePatchOrderRepairStatus } from '@rupoi/entities/order-repair'
import { usePatchOrderReadyMadeStatus } from '@rupoi/entities/order-ready-made'

/**
 * Composable для одной кнопки изменения статуса
 * Управляет состоянием модалки и API запросом
 */
export function useOrderChangeStatus(props: Pick<OrderChangeStatusProps, 'orderId' | 'orderKind'>) {
  // Состояние модалки и комментария
  const isModalOpen = ref(false)
  const comment = ref('')

  // Мутации для каждого типа заказа
  const prosthesisMutation = usePatchOrderProsthesisStatus()
  const shoeMutation = usePatchOrderShoeStatus()
  const ottobockMutation = usePatchOrderOttobockStatus()
  const repairMutation = usePatchOrderRepairStatus()
  const readyMadeMutation = usePatchOrderReadyMadeStatus()

  /**
   * Получает правильную мутацию в зависимости от типа заказа
   */
  const currentMutation = computed(() => {
    switch (props.orderKind) {
      case OrderKindEnum.PROSTHESIS:
        return prosthesisMutation
      case OrderKindEnum.SHOE:
        return shoeMutation
      case OrderKindEnum.OTTOBOCK:
        return ottobockMutation
      case OrderKindEnum.REPAIR:
        return repairMutation
      case OrderKindEnum.READY_MADE:
        return readyMadeMutation
      default:
        throw new Error(`Unknown order kind: ${props.orderKind}`)
    }
  })

  /**
   * Проверяет, идет ли процесс изменения статуса
   */
  const isLoading = computed(() => {
    return currentMutation.value.isPending.value
  })

  /**
   * Выполняет изменение статуса заказа
   */
async function changeStatus(newStatus: OrderStatus): Promise<boolean> {
    try {
      await currentMutation.value.mutateAsync({
        id: props.orderId,
        data: {
          newStatus,
          comment: comment.value || '',
        },
      })

      // Закрываем модалку и очищаем комментарий после успешного изменения
      isModalOpen.value = false
      comment.value = ''

    return true
    } catch (error) {
      // Ошибка будет обработана в мутации
      console.error('Failed to change order status:', error)
    return false
    }
  }

  return {
    isModalOpen,
    comment,
    isLoading,
    changeStatus,
  }
}
